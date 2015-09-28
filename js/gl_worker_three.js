
// Canno.js is Z-UP

var camera = null;
var renderer = null;
var scene = null;
var bInit = false;
var visuals = [];
var N;

onmessage = function(evt) {
	var window = self;

	if ( !bInit && evt.data.canvas ) {

		console.log( 'import script... ' );        
		importScripts("../lib/three.js");
		importScripts("../lib/cannon.min.js");

		// Init three.js render world.
		var canvas = evt.data.canvas;
		N = evt.data.ballNums;

		renderer = new THREE.WebGLRenderer( { canvas: canvas } );
		renderer.setClearColor( 0x000000, 1.0 );
		renderer.autoClear = false;
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 30, canvas.width / canvas.height, 0.5, 10000 );
		
		// lights
		var light, materials;
		scene.add( new THREE.AmbientLight( 0x222222 ) );

		light = new THREE.DirectionalLight( 0xffffff, 0.8 );
		var d = 50;

		light.position.set( d, d, d );
		light.castShadow = true;
		//light.shadowCameraVisible = true;
		light.shadowCameraLeft = -d;
		light.shadowCameraRight = d;
		light.shadowCameraTop = d;
		light.shadowCameraBottom = -d;
		light.shadowCameraFar = 3*d;
		light.shadowCameraNear = d;
		light.shadowDarkness = 0.5;

		var SHADOW_MAP_WIDTH = 512;
		var SHADOW_MAP_HEIGHT = 512;

		light.shadowMapBias = 0.0039;
		light.shadowMapDarkness = 0.5;
		light.shadowMapWidth = SHADOW_MAP_WIDTH;
		light.shadowMapHeight = SHADOW_MAP_HEIGHT;

		light.shadowMapBias = 0.0039;
		light.shadowMapDarkness = 0.5;
		light.shadowMapWidth = SHADOW_MAP_WIDTH;
		light.shadowMapHeight = SHADOW_MAP_HEIGHT;

		scene.add(light);

		// Add meshes
		var materialColor = 0x55ff55;
		var solidMaterial = new THREE.MeshLambertMaterial( { color: materialColor } );
		
		// ground plane
		var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
		var ground = new THREE.Mesh( geometry, solidMaterial );
		ground.scale.set(10, 10, 10);
		ground.position.set(0, -20, 0);
		ground.quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0), -Math.PI/2);
		ground.castShadow = true;
		ground.receiveShadow = true;
		scene.add( ground );
		var bShowBoundary = evt.data.bShowBoundary;

		if (bShowBoundary) {
			//plane -x
			var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
			var mesh = new THREE.Object3D();
			var ground = new THREE.Mesh( geometry, solidMaterial );
			ground.scale.set(10, 10, 10);
			ground.quaternion.setFromAxisAngle( new THREE.Vector3(0,1,0), Math.PI/2 );
			ground.position.set(-30, 0, 0);
			scene.add(ground);

			// plane +x
			var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
			var ground = new THREE.Mesh( geometry, solidMaterial );
			ground.scale.set(10, 10, 10);
			ground.quaternion.setFromAxisAngle( new THREE.Vector3(0,1,0), -Math.PI/2 );
			ground.position.set(30, 0, 0);
			ground.castShadow = true;
			ground.receiveShadow = true;
			scene.add( ground );

			// Plane +y
			var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
			var ground = new THREE.Mesh( geometry, solidMaterial );
			ground.scale.set(10, 10, 10);
			ground.quaternion.setFromAxisAngle( new THREE.Vector3(1,0,0), Math.PI/2 );
			ground.position.set(0, 40, 0);
			ground.castShadow = true;
			ground.receiveShadow = true;
			scene.add( ground );
		}

		// Plane -z
		var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
		var ground = new THREE.Mesh( geometry, solidMaterial );
		ground.scale.set(10, 10, 10);
		ground.position.set(0, 0, -20);
		ground.castShadow = true;
		ground.receiveShadow = true;
		scene.add( ground );

		// Sphere
		var radius = 1;
		var size = radius;
		var height = 5;

		generateBalls();

		window.addEventListener( 'resize', onWindowResize, false );
		
		// Send camera to main thread
		postMessage( "Send script to main script: Finish initialization." );
		bInit = true;

		return;
	}

	// Get bufffers that are sent from main thread.
	var cameraState = evt.data.cameraState;
	var positions = evt.data.positions;
	var quaternions = evt.data.quaternions;

	if ( !cameraState || !positions || !quaternions )
		return;

	camera.position.set( cameraState[0], cameraState[1], cameraState[2] );
	camera.quaternion.set( cameraState[3], cameraState[4], cameraState[5], cameraState[6] );


	for ( var i = 0; i < visuals.length; i++ ) {
		visuals[i].position.set( positions[3 * i + 0],
								positions[3 * i + 1],
								positions[3 * i + 2] );

		visuals[i].quaternion.set( quaternions[4 * i + 0],
								quaternions[4 * i + 1],
								quaternions[4 * i + 2],
								quaternions[4 * i + 3] );
	}

	workerAnimation();
}

function generateBalls() {

	var materialColor = 0xdddddd;
	var solidMaterial = new THREE.MeshLambertMaterial( { color: materialColor } );
	var radius = 1;
	var size = radius;

	for ( var i = 0; i < N; ++i ) {

		var sphere_geometry = new THREE.SphereGeometry( radius, 8, 8 );
		mesh = new THREE.Mesh( sphere_geometry, solidMaterial );
		//mesh.position.set( (Math.random() - 0.5) * 20, (Math.random() - 0.5) * size, Math.random() * 20 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;

		scene.add( mesh );
		visuals.push( mesh );
	}
}

function workerAnimation() {
	render();	
}

function render() {
	renderer.render( scene, camera );	
	renderer.context.commit();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

