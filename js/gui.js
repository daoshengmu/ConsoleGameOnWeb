/**
 * @author Daosheng Mu / http://dsmu.me/
 */

var Sponza_Params = {
    "render mode" : 0,
    "enable SSAO" : false,
    "show RT" : 0,
    "enable profiler" : true
};

function initSponzaGUI( config ) {
     
    var gui = new dat.GUI();
    
    gui.add( Sponza_Params, "render mode", { general: 0, VREffect: 1, VRDevice: 2 } ).onChange( function(value) {
        
        config.change( "render mode", value );        
    } ).listen();

    gui.add( Sponza_Params, "enable SSAO" ).onChange( function(value) {
        
        config.change( "enable SSAO", value );
    } );
    
    gui.add( Sponza_Params, "show RT", { frameBuffer: 0, SSAO: 1 } ).onChange( function(value) {
        
        config.change( "show RT", value );        
    } ).listen();
    
    gui.add( Sponza_Params, "enable profiler" ).onChange( function(value) {
        
        config.change( "enable profiler", value );
    } );
}

var Panorama_Params = {
    "render mode" : 0
};

function initPanoramaGUI( config ) {
     
    var gui = new dat.GUI();
    
    gui.add( Panorama_Params, "render mode", { general: 0, VREffect: 1, VRDevice: 2 } ).onChange( function(value) {
        
        config.change( "render mode", value );        
    } ).listen();
}

var Worker_Params = {
    "render mode" : 0,
    "balls" : 500
};

function initWorkerGUI( config ) {
     
    var gui = new dat.GUI();
    
    gui.add( Worker_Params, "render mode", { general: 0, VRDevice: 1 } ).onChange( function(value) {
        
        config.change( "render mode", value );        
    } ).listen();

    gui.add( Worker_Params, 'balls', 0, 1500 ).step(100).onChange( function(value) {
       
        config.change( "balls", value );
    } );
}
