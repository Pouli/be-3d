define(['three', 'colladaLoader', 'orbitControls'], function(three, colladaLoader, orbitControls) {
	var scene, camera, renderer;
	
	function init(daeFile) {
		scene = new THREE.Scene();

		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize(WIDTH, HEIGHT);

		document.body.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
		camera.position.set(50,150,100);
		scene.add(camera);

		window.addEventListener('resize', function() {
			var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
		});

		putLights();

		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load(daeFile, function ( collada ) {
			var dae = collada.scene;
			var skin = collada.skins[ 0 ];
			dae.position.set(43,15,35);
			dae.scale.set(10,10,10);
			scene.add(dae);
		});

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.minDistance = 15;
		controls.maxDistance = 50;
		controls.minPolarAngle = 0;
		controls.maxPolarAngle = Math.PI / 3;
		controls.zoomSpeed = 0.5;
	}

	function animate() {
		requestAnimationFrame(animate);
		camera.position.set(0, 45, 1);
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
		controls.update();
	}

	function putLights() {
		var light = new THREE.PointLight(0xfffff3, 0.8);
		light.position.set(-100, 200, 100);
		scene.add(light);

		var sphereSize = 1;
		var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
		scene.add(pointLightHelper);

		var light2 = new THREE.PointLight(0xd7f0ff, 0.2);
		light2.position.set(200, 200, 100);
		scene.add(light2);

		var sphereSize = 1;
		var pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
		scene.add(pointLightHelper2);

		var light3 = new THREE.PointLight(0xFFFFFF, 0.5);
		light3.position.set(150, 200, -100);
		scene.add(light3);

		var sphereSize = 1;
		var pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize);
		scene.add(pointLightHelper3);
	}
	
	return {
		show: function(daeFile) {
			init(daeFile);
			animate();
		}
	};
});