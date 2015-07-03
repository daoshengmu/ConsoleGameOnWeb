
LeapMotionControl = function( camera ) {
    

};

// Leap motion initialize at local runtime
LeapMotionControl.prototype.init= function( camera ) {

    this.control  = null;
    this.connected = false;
    var self = this;

    var cl = this.control = new Leap.Controller({enableGestures: false});

    Leap.loop( function( frame ) {

        var hand = frame.hands[0]; // Just use the first hand.

        if ( typeof( hand ) === 'undefined' ) {

            console.log( 'undefined hand' );
        } else {

            console.log( 'I have a hand.' );
        }
    });
};

// Leap motion listen WebSocket message via WebSocket server.
LeapMotionControl.prototype.listen = function( camera ) {

    var ws; // websocket
    var camera = camera;
    var speed = 2.3;
    var orientBound = 0.5;

    // Support both the WebSocket and MozWebSocket objects
    if ( ( typeof( WebSocket ) == 'undefined' ) 
        && ( typeof( MozWebSocket ) != 'undefined') ) {
        WebSocket = MozWebSocket;
    }

    // Create the socket via event hander
    function connectToWebSocket() {

        // Create and open the socket
        //ws = new WebSocket("ws://localhost:6437/v6.json");
        ws = new WebSocket("ws://192.168.43.107:6437/v6.json"); // Remote connection

        // On successful connection
        ws.onopen = function( event ) {

            var enableMessage = JSON.stringify( { enableGestures: false } );
            ws.send( enableMessage ); // Enable gestures
            ws.send( JSON.stringify( { focused: true } ) );
            //ws.send( JSON.stringify( { optimizeHMD: true } ) );
            //var backgroundMessage = JSON.stringify({background: true});
            //ws.send(backgroundMessage); // Get frames in background
            console.log("open");
        }

        // On message received
        ws.onmessage = function( event ) {
            var obj = JSON.parse( event.data );

            if(obj.id){
                var hands = obj["hands"];

                if ( !hands )
                    return;

                var hand = hands[0];

                if ( typeof( hand ) === 'undefined' ) {

                } else {
                   camera.translateZ( hand.palmNormal[2] * speed );
                }

            } else {
                console.log( "message " + event.data );
            }
        }

        // On socket close
        ws.onclose = function( event ) {
            ws = null;
            console.log( "close" );
        }

        // On socket error
        ws.onerror = function(event) {
            console.log( "error" );
        };
    }

    connectToWebSocket();

};


