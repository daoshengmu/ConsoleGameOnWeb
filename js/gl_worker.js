
var rotateAngle = 0;

var RendererModule = function() {
	this.renderer = null;
	this.worldMtx = null;
	this.cube = null;
}

var rendererModule = null;

onmessage = function(evt) {
	var window = self;

	importScripts("../lib/gl-matrix.js");
	importScripts("../lib/maximus.js");

	var canvas = evt.data.canvas;
	var vs = evt.data.vertexShader;
	var ps = evt.data.pixelShader;
	rendererModule = new RendererModule();

	var renderer = new Maximus.WebGLRenderer(); 
	renderer.initGL(canvas);

	renderer.setClearColor( 1,1,0,1 );
	renderer.initShaders( vs, ps );
	rendererModule.renderer = renderer;
	rendererModule.worldMtx = mat4.create();

	var dir = vec3.fromValues( 0.0, 0.0, -1.0 );
	rendererModule.directionalLight = new Maximus.DirectionalLight( [1.0,1.0,1.0], 1.0, dir );
	var redLambertMtr = new Maximus.LambertMaterial( [1.0, 0.0, 0.0, 1.0] );
	var cube = new Maximus.Cube();
	cube.init( renderer, redLambertMtr );
	rendererModule.cube = cube;

	window.addEventListener( 'resize', onWindowResize, false );

	postMessage( "Send script to main script" );
}

setInterval( workerAnimation, 16 );

function workerAnimation() {
	
	// postMessage("Calling back at : " + new Date().getTime());

	render();	
}

function render() {

	var renderer = rendererModule.renderer;
	var mtx = rendererModule.worldMtx;
	mat4.identity( mtx );
	mat4.translate( mtx, mtx, [0.0, 0.0, -7.0] );

	rotateAngle += 5;         
	mat4.rotateY( mtx, mtx, Maximus.Math.degToRad( rotateAngle ) );
 
	renderer.setLight( rendererModule.directionalLight );
	renderer.drawScene( mtx, rendererModule.cube );
	renderer.getContext().commit();
}

function onWindowResize() {

	console.log('resize');
	var renderer = rendererModule.renderer;
	renderer.setSize( window.innerWidth, window.innerHeight );
}

