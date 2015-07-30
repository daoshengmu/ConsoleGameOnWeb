onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}

setInterval( workerAnimation, 1600 );

function workerAnimation() {
    postMessage("Calling back at : " + new Date().getTime());
    console.log( "worker animation loop..." );
}