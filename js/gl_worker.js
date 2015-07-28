onmessage = function(evt) {

    var canvas = evt.data.canvas;
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

   // console.log('onMessage get ' + evt.data[0]);
    console.log('Posting message back to main script ' + evt.data.test );
    postMessage('Send message to main script');
}