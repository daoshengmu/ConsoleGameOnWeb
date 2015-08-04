
var Renderer = function() {

    this.context = null;
    this.camera = null;
}

var Cube = function() {

    this.vertices = null;
    this.indices = null;

    this.vertexBuffer = null;
    this.indexBuffer = null;

    this.worldMatrix = mat4.create();
}

var Camera = function() {

    this.worldMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.projMatrix = mat4.create();
}

var renderer;

onmessage = function(evt) {

    importScripts("../lib/gl-matrix.js");

    var canvas = evt.data.canvas;
    renderer = new Renderer();

    var context = canvas.getContext('webgl');    // get context, same as normal webgl
    // You can submit draw call here!!
    context.clearColor( 1.0, 0.0, 0.0, 1.0 );   // Just need to set once.
    context.viewport( 0, 0, canvas.innerWidth, canvas.innerHeight );

    // Render
    context.clear( context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT );

    // context.drawArray(...);

    // The draw is over, submit it to screen
    context.commit();
    // End of render

    renderer.context = context;
    renderer.camera = new Camera();

    // console.log( "mtx: " + renderer.camera.worldMatrix[1] );

   // console.log('onMessage get ' + evt.data[0]);
    //console.log('Posting message back to main script ' + evt.data.test );
    postMessage('Send message to main script');
}

setInterval( workerAnimation, 16 );

function workerAnimation() {
    
    postMessage("Calling back at : " + new Date().getTime());
    //console.log( "worker animation loop..." );

    var context = renderer.context;

    context.clearColor( 0.0, 0.5, 0.0, 1.0 );

    // // Render 
    context.clear( context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT );

    context.commit();
}
