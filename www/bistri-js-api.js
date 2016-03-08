var bistriJsApi = {
    isReady  : false,
    callback : function (){}
};

function LazyJSLoader ( source, callback )
{
    this._loaded   = 0,
    this._source   = source instanceof Array ? source : [ source ],
    this._callback = callback;
    this._load ();
};

LazyJSLoader.prototype._load = function ()
{
    this._source.forEach ( function ( src )
    {
        var _script = document.createElement ( 'script' );

        window.document.body.appendChild ( _script );

        if ( typeof this._callback == 'function' )
        {
            _script.addEventListener ( 'load', function ()
            {
                if ( ++this._loaded == this._source.length )
                {
                    this._callback ();
                }
            }.bind ( this ) );
        }
        _script.src = src;
    }.bind ( this ) );
};

/************************************************************/

function triggerBistriEvent ( name )
{
    var apiReadyEvent = document.createEvent ( 'CustomEvent' );

    apiReadyEvent.initCustomEvent ( name, true, false, 'cordova-plugin-bistri event' )
    document.dispatchEvent( apiReadyEvent );
}

/************************************************************/

window.onBistriConferenceReady = function ()
{
    if ( !bistriJsApi.isReady )
    {
        bistriJsApi.isReady = true;
        if ( typeof bistriJsApi.callback === 'function' )
        {
            bistriJsApi.callback ( window.bc );
        }

        triggerBistriEvent ( 'onBistriJsApiReady' );
    }
};

/************************************************************/

new LazyJSLoader ( 'https://api.bistri.com/bistri.conference.min.js', function ()
{
    console.log ( "bistri.conference.min.js loaded" );
} );

module.exports = {

    ready: function ( fn )
    {
        if ( typeof fn === 'function' )
        {
            if ( bistriJsApi.isReady )
            {
                fn ( window.bc );
            }
            else
            {
                bistriJsApi.callback = fn;

                if ( typeof window.bc != 'undefined' )
                {
                    window.onBistriConferenceReady ();
                }
            }
        }
        else
        {
            throw new Error ( "bad method argument: receive %s, expect 'function'", typeof fn );
        }
    }
};