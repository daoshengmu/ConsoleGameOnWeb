/**
 * @author Daosheng Mu / http://dsmu.me/
 */

function SponzaConfig( renderer, effect ) {
    var _renderer = renderer;
    var _funcList = [];
    var _isEnableSSAO = false;
    var _isEnableProfiler = true;
    var _effect = effect; 
    var _renderMode = SponzaConfig.GENERAL_MODE;
    
    this.enableSSAO = function( bEnable ) {
        
        _isEnableSSAO = bEnable;
        
    };
    
    this.isEnableSSAO = function() {
        
        return _isEnableSSAO;
    };
    
    this.enableProfiler = function( bEnable ) {
        
        _isEnableProfiler = bEnable;
        
    };
    
    this.isEnableProfiler = function() {
        
        return _isEnableProfiler;
    };
    
    this.switchRenderMode = function( value ) {
        
        if ( value <= SponzaConfig.VRDEVICE_MODE ) {
            
            _renderMode = value;
        } else {
            
            console.error( "Not define switchRenderMode type: " + value );
        }
    };

    this.getRenderMode = function() {

        return _renderMode;
    };

    this.switchFrameBuffer = function( value ) {
        
        if ( value === '0' ) {
            
            _effect.ssao_uniforms[ 'onlyAO' ].value = false;
        } else if ( value === '1' ) {
            
            _effect.ssao_uniforms[ 'onlyAO' ].value = true;
        } else {
            
            console.error( "Not define swithFrameBuffer type: " + value );
        }
    };
    
    this.change = function( key, value ) {
        
        _funcList[ key ](value);
    };
    
    // register function ptr
    _funcList["enable SSAO"] = this.enableSSAO;
    _funcList["show RT"] = this.switchFrameBuffer;
    _funcList["render mode"] = this.switchRenderMode;
    _funcList["enable profiler"] = this.enableProfiler;
}

SponzaConfig.GENERAL_MODE = 0;
SponzaConfig.VREFFECT_MODE = 1;
SponzaConfig.VRDEVICE_MODE = 2;



