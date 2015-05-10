
 var Gamepad = function() {

 	var self = this;
	var gamepadType = "";
	var gamepads = null;
	var gamepadList = {
		"Xbox 360": {
			"button" : {
				'dPadUp' : 0,
				'dPadDown' : 1,
				'dPadLeft' : 2,
				'dPadRight' : 3,
				'backRight' : 4,
				'backLeft' : 5,
				'leftStick' : 6,
				'rightStick' : 7,
				'leftBumper' : 8,
				'rightBumper' : 9,
				'xbox' : 10,
				'A' : 11,
				'B' : 12,
				'X' : 13,
				'Y' : 14
			},

			"axis" : {
				'leftStickRight' : 0,
				'leftStickLeft' : 1,
				'leftStickDown' : 2,
				'leftStickUp' : 3,
				'leftTriggerPress' : 4,
				'leftTriggerRelease' : 5,
				'rightStickRight' : 6,
				'rightStickLeft' : 7,
				'rightStickDown' : 8,
				'rightStickUp' : 9,
				'rightTriggerPress' : 10,
				'rightTriggerRelease' : 11
			}
		}
	};

	this.params = { 
		'button': {},
		'axis': {}	
	};

	this.onConnected = null;
	this.onDisconnected = null;
	this.keyFunc = null;

	window.addEventListener( "gamepadconnected",
		function( e ) {
			onConnectedEvent( e );
		}, false);

	window.addEventListener( "gamepaddisconnected",
		function( e ) {
			if ( onDisconnected )
				onDisconnected( e );
		}
	);

	window.addEventListener("keydown", onKeydown, false);

	function onKeydown( e ) {

		var key = e.keyCode || e.which;

		console.log("key press:" + key);

		if ( self.keyFunc )
			self.keyFunc();
	}

	function onConnectedEvent( e ) {

		for( var type in gamepadList ) {

			if ( e.gamepad.id.indexOf(type) >= 0 ) {
				gamepadType = type;
				gamepads = navigator.getGamepads 
				? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
			
				if ( self.onConnected )
					self.onConnected( e );
			}
		}

	}

	function onDisconnected( e ) {

	}

	this.getGamepadType = function() {

		return gamepadType;
	}

	this.update = function() {
		var btnFunc = this.params['button'];
		var axisFunc = this.params['axis'];
		var gamepad = gamepadList[gamepadType];
		if ( !gamepad )
			return;

		var gamepadBtn = gamepad['button'];
		var gamepadAxis = gamepad['axis'];
                
		if ( gamepads && gamepads.length ) {
			var gp = gamepads[0];

			for ( var i = 0; i < gp.buttons.length; ++i ) {

                //onButtonPressed(gp.buttons[i], i);
				if ( typeof(btn) == "object ") {

					if ( btn.pressed || btn.value ) {
                        
						var btnId;
						for ( var btnId in gamepadBtn ) {
							if ( gamepadBtn[btnId] == idx )
								break;
						}

						btnFunc[btnId]();
					}
                    
                }
            }

			for ( var i = 0; i < gp.axes.length; ++i ) {

				var axis = gp.axes[i];
				var idx;

				if (axis == 1) {

					idx = i * 2;
				} else if (axis == -1) {

					idx = i * 2 + 1;
				} else {

					continue;
				}

				var axisId;
				for ( var axisId in gamepadAxis ) {
					if ( gamepadAxis[axisId] == idx )
						break;
				}

				if ( axisFunc[axisId] )
					axisFunc[axisId]();
			}
		}
	}

}