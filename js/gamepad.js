
 var Gamepad = function() {

	var self = this;
	var bActivate = false;
	var OSType = "Unknown OS";
	var gamepadType = "";
	var gamepads = null;
	var gamepadList = {
		"MacOS": {
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
		}, 

		"Windows": {
			"xinput": {
				"button" : {
					'A' : 0,
					'B' : 1,
					'X' : 2,
					'Y' : 3,
					'leftBumper' : 4,
					'rightBumper' : 5,
					'leftTrigger' : 6,
					'rightTrigger' : 7,
					'backRight' : 8,
					'backLeft' : 9,
					'leftStick' : 10,
					'rightStick' : 11,
					'dPadUp' : 12,
					'dPadDown' : 13,
					'dPadLeft' : 14,
					'dPadRight' : 15,
					'xbox' : 16
				},

				"axis" : {
					'leftStickRight' : 0,
					'leftStickLeft' : 1,
					'leftStickDown' : 2,
					'leftStickUp' : 3,
					'rightStickRight' : 4,
					'rightStickLeft' : 5,
					'rightStickDown' : 6,
					'rightStickUp' : 7
				}
			}
		}
	};

	this.params = { 
		'button': {},
		'axis': {}	
	};

	this.onConnected = null;
	this.onDisconnected = null;

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

	function detectOSType() {

		if ( navigator.appVersion.indexOf("Win") != -1 ) {
			OSType = "Windows";
		} else if ( navigator.appVersion.indexOf("Mac") != -1 ) {
			OSType = "MacOS";
		} else if ( navigator.appVersion.indexOf("X11") != -1 ) {
			OSType = "UNIX";
		} else if ( navigator.appVersion.indexOf("Linux") != -1 ) {
			OSType = "Linux";
		} else {
			alert("Unknown OS type.");
		}
	}

	function onConnectedEvent( e ) {

		detectOSType();
		bActivate = true;
		
		var osGamepad = gamepadList[OSType];

		for( var type in osGamepad ) {

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

		bActivate = false;

		if ( self.onDisconnected ) {
			self.onDisconnected( e );
		}
	}

	this.getOSType = function() {

		return OSType;
	}

	this.getActivate = function() {

		return bActivate;
	}

	this.getGamepadType = function() {

		return gamepadType;
	}

	this.update = function() {
		var btnFunc = this.params['button'];
		var axisFunc = this.params['axis'];
		var osGamepad = gamepadList[OSType];
		var gamepad;

		if ( osGamepad ) {
			gamepad = osGamepad[gamepadType];		

			if ( !gamepad )
				return;	
		}

		var gamepadBtn = gamepad['button'];
		var gamepadAxis = gamepad['axis'];
                
		if ( gamepads && gamepads.length ) {
			var gp = gamepads[0];

			for ( var i = 0; i < gp.buttons.length; ++i ) {
				
				var btn = gp.buttons[i];
				if ( btn.pressed || btn.value ) {
                    
                    console.log("You press buttion " + i);
					var btnId;
					for ( btnId in gamepadBtn ) {
						if ( gamepadBtn[btnId] == i )
							break;
					}

					if ( btnFunc[btnId] )
						btnFunc[btnId]();
				}
            }

			for ( var i = 0; i < gp.axes.length; ++i ) {

				var axis = gp.axes[i];
				var idx;

				if ( Math.round( axis ) == 1 ) {

					idx = i * 2;
				} else if ( Math.round( axis ) == -1 ) {

					idx = i * 2 + 1;
				} else {

					continue;
				}

				var axisId;
				for ( axisId in gamepadAxis ) {
					if ( gamepadAxis[axisId] == idx )
						break;
				}

				if ( axisFunc[axisId] )
					axisFunc[axisId]();
			}
		}
	}

}