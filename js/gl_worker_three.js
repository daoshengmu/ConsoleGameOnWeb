
// Canno.js is Z-UP

var camera = null;
var controls = null;
var renderer = null;
var scene = null;
var bInit = false;
var meshes = [];

onmessage = function(evt) {

    console.log( 'onmessage test .....' );
	var window = self;
    console.log( 'data: ' + evt.data.canvas );
    console.log( 'bInit: ' + bInit );

    if ( !bInit && evt.data.canvas ) {

        console.log( 'import script... ' );        
        // Import script
        importScripts("../lib/three.js");
        importScripts("../lib/cannon.min.js");
        // importScripts("lib/cannon.demo.js");
//        importScripts("../lib/dat.gui.min.js");
        importScripts("../lib/threejs/TrackballControls.js");
//        importScripts("../lib/Detector.js");
        // importScripts("../lib/Stats.js");
        // importScripts("../lib/smoothie.js");

        console.log( 'done of import script... ' );
       // rendererModule = new RendererModule();
        // Init three.js render world.
        var canvas = evt.data.canvas;

        // _gl = canvas.getContext("experimental-webgl")
        //           || canvas.getContext('webgl');
        // _gl.viewportWidth = canvas.width;
        // _gl.viewportHeight = canvas.height;
        // _gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
        // _gl.enable(_gl.DEPTH_TEST);

        renderer = new THREE.WebGLRenderer( { canvas: canvas } );
        renderer.setClearColor( 0x000000, 1.0 );
        console.log( 'renderer script... ' );

        renderer.setSize( canvas.width, canvas.height, false );
        // renderer.shadowMapEnabled = true;
        // renderer.shadowMapSoft = true;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 30, canvas.width / canvas.height, 0.5, 10000 );
        //camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
        camera.target = new THREE.Vector3(0, 0, 0);
        //camera.up.set( 0, 0, 1 );
        camera.position.set( 0, 10, 50 );

        controls = new THREE.TrackballControls( camera, canvas );
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        //controls.keys = [ 65, 83, 68 ];
        
        console.log( 'control object import script... ' );

        // // if ( !controls )
        // //     console.log( 'null controls' );
        // // else
        // //     console.log( 'not null controls' );
        // // lights
        var light, materials;
        scene.add( new THREE.AmbientLight( 0x111111 ) );

        light = new THREE.DirectionalLight( 0xffffff, 0.8 );
        var d = 20;

        light.position.set( d, d, d );

        light.castShadow = true;
        //light.shadowCameraVisible = true;

        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

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

        scene.add( light );

        // Add meshes
        // ground plane
        var materialColor = 0xdddddd;
        var solidMaterial = new THREE.MeshLambertMaterial( { color: materialColor } );
        
        var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
        mesh = new THREE.Object3D();
        //var submesh = new THREE.Object3D();
        var ground = new THREE.Mesh( geometry, solidMaterial );
        ground.scale.set(1, 1, 1);
      //  submesh.add(ground);

        // ground.castShadow = true;
        // ground.receiveShadow = true;
        mesh.add(ground);
        mesh.position.set(0, 0, 0);
        mesh.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        //mesh.rotation.y = 0.3;

        scene.add( mesh );

       //  //plane -x
       //  var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
       //  var mesh = new THREE.Object3D();
       //  //var submesh = new THREE.Object3D();
       //  var ground = new THREE.Mesh( geometry, solidMaterial );
       //  ground.scale.set(10, 10, 10);
       //  //submesh.add(ground);

       //  // ground.castShadow = true;
       //  // ground.receiveShadow = true;
       //  mesh.add( ground );
       //  mesh.quaternion.setFromAxisAngle( new CANNON.Vec3(0,1,0),Math.PI/2 );
       //  mesh.position.set( -10, 0, 0 );

       //  scene.add( mesh );

       //  // plane +x
       //  var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );
       //  mesh = new THREE.Object3D();
       // // var submesh = new THREE.Object3D();
       //  var ground = new THREE.Mesh( geometry, solidMaterial );
       //  ground.scale.set(10, 10, 10);
       // // submesh.add(ground);

       //  // ground.castShadow = true;
       //  // ground.receiveShadow = true;
       //  mesh.add( ground );
       //  mesh.quaternion.setFromAxisAngle( new CANNON.Vec3(0,1,0), -Math.PI/2 );
       //  mesh.position.set( 10, 0, 0 );

       //  scene.add( mesh );

        // // plane -y
        // var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );
        // mesh = new THREE.Object3D();
        // var submesh = new THREE.Object3D();
        // var ground = new THREE.Mesh( geometry, solidMaterial );
        // ground.scale.set(100, 100, 100);
        // submesh.add(ground);

        // ground.castShadow = true;
        // ground.receiveShadow = true;
        // mesh.add( submesh );
        // mesh.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0),-Math.PI/2 );
        // mesh.position.set( 0, -10, 0 );

        // scene.add( mesh );

        // // plane +y
        // var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );
        // mesh = new THREE.Object3D();
        // var submesh = new THREE.Object3D();
        // var ground = new THREE.Mesh( geometry, solidMaterial );
        // ground.scale.set(100, 100, 100);
        // submesh.add(ground);

        // // ground.castShadow = true;
        // // ground.receiveShadow = true;
        // mesh.add( submesh );
        // mesh.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0),Math.PI/2 );
        // mesh.position.set( 0, 10, 0 );

        // scene.add( mesh );

        // plane +z
        var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );
        mesh = new THREE.Object3D();
        var submesh = new THREE.Object3D();
        var ground = new THREE.Mesh( geometry, solidMaterial );
        ground.scale.set(100, 100, 100);
       // submesh.add(ground);

        // ground.castShadow = true;
        // ground.receiveShadow = true;
        mesh.add( ground );
        mesh.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0),Math.PI/2 );
        mesh.position.set( 0, 0, 20 );

       // scene.add( mesh );

        // Sphere
        var radius = 1;
        var size = radius;
        var height = 5;

        var sphere_geometry = new THREE.SphereGeometry( radius, 8, 8) ;
        mesh = new THREE.Mesh( sphere_geometry, solidMaterial );
        mesh.position.set( 3 * size, size, height );

        scene.add( mesh );

        // Sphere
        var sphere_geometry = new THREE.SphereGeometry( radius, 8, 8 );
        mesh = new THREE.Mesh( sphere_geometry, solidMaterial );
        mesh.position.set( 0, size, height );

        scene.add( mesh );

        // Sphere
        var sphere_geometry = new THREE.SphereGeometry( radius, 8, 8 );
        mesh = new THREE.Mesh( sphere_geometry, solidMaterial );
        mesh.position.set( -3 * size, size, height );

        scene.add( mesh );

        generateBalls();

        window.addEventListener( 'resize', onWindowResize, false );
        bInit = true;

        return;
    }

    var positions = evt.data.positions;
    var quaternions = evt.data.quaternions;

    if ( !positions || !quaternions )
        return;

    for ( var i = 0; i < meshes.length; i++ ) {
        meshes[i].position.set( positions[3 * i + 0],
                                positions[3 * i + 1],
                                positions[3 * i + 2] );

        // console.log("Worker thread Positions are " + positions[3 * i + 0] +
        //             ", " + positions[3 * i + 1] + ", " + positions[3 * i + 2] );
        meshes[i].quaternion.set( quaternions[4 * i + 0],
                                quaternions[4 * i + 1],
                                quaternions[4 * i + 2],
                                quaternions[4 * i + 3] );
    }



 //    // Get position data from the physics world.

	// var canvas = evt.data.canvas;
	// var scene = new THREE.Scene();
	// // camera
 //    var camera = new THREE.PerspectiveCamera( 30, canvas.width / canvas.height, 0.5, 10000 );
 //    camera.position.set(Math.cos( Math.PI/5 ) * 30,
 //                        5,
 //                        Math.sin( Math.PI/5 ) * 30);
 //    scene.add( camera );

 //     // Trackball controls
 //    controls = new THREE.TrackballControls( camera, renderer.domElement );
 //    controls.rotateSpeed = 1.0;
 //    controls.zoomSpeed = 1.2;
 //    controls.panSpeed = 0.2;
 //    controls.noZoom = false;
 //    controls.noPan = false;
 //    controls.staticMoving = false;
 //    controls.dynamicDampingFactor = 0.3;
 //    var radius = 100;
 //    controls.minDistance = 0.0;
 //    controls.maxDistance = radius * 1000;
 //    //controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]
 //    controls.screen.width = canvas.width;
 //    controls.screen.height = canvas.height;

 //     // lights
 //    var light, materials;
 //    scene.add( new THREE.AmbientLight( 0x666666 ) );

 //    light = new THREE.DirectionalLight( 0xffffff, 1.75 );
 //    var d = 20;

 //    light.position.set( d, d, d );

 //    light.castShadow = true;
 //    //light.shadowCameraVisible = true;

 //    light.shadowMapWidth = 1024;
 //    light.shadowMapHeight = 1024;

 //    light.shadowCameraLeft = -d;
 //    light.shadowCameraRight = d;
 //    light.shadowCameraTop = d;
 //    light.shadowCameraBottom = -d;

 //    light.shadowCameraFar = 3*d;
 //    light.shadowCameraNear = d;
 //    light.shadowDarkness = 0.5;

 //    scene.add( light );

 //    // Create meshes

	// // Create renderer
	// renderer = new THREE.WebGLRenderer( { antialias: true } );
 //    renderer.setSize( window.innerWidth, window.innerHeight );
 //    renderer.setClearColor( scene.fog.color );

 //    container.appendChild( renderer.domElement );

 //    renderer.gammaInput = true;
 //    renderer.gammaOutput = true;
 //    renderer.shadowMapEnabled = true;

    workerAnimation();
	postMessage( "Send script to main script" );
}

function generateBalls() {

    var counts = 400;
    var materialColor = 0xdddddd;
    var solidMaterial = new THREE.MeshLambertMaterial( { color: materialColor } );
    var radius = 1;
    var size = radius;

    for ( var i = 0; i < counts; ++i ) {

        var sphere_geometry = new THREE.SphereGeometry( radius, 8, 8 );
        mesh = new THREE.Mesh( sphere_geometry, solidMaterial );
        mesh.position.set( (Math.random() - 0.5) * 20, (Math.random() - 0.5) * size, Math.random() * 20 );

        meshes.push( mesh );
        scene.add( mesh );
    }
}

//setInterval( workerAnimation, 16 );

function workerAnimation() {
	// postMessage("Calling back at : " + new Date().getTime());
    controls.update();
	render();	
}

function render() {
	renderer.render( scene, camera );	
    renderer.context.commit();
}

function onWindowResize() {
 	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //controls.handleResize();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

