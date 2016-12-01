var bistriJsApi = {
    isLoaded  : false,
    isReady   : false,
    callbacks : []
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

        bistriJsApi.callbacks.forEach ( function ( fn )
        {
            fn ( bc );
        } );

        triggerBistriEvent ( 'onBistriJsApiReady' );
    }
};

/************************************************************/

function lazyLoad ()
{
    if ( !bistriJsApi.isLoaded )
    {
        console.log ( "-------------> LazyJSLoader" )

        new LazyJSLoader ( 'https://api.bistri.com/bistri.conference.min.js', function ()
        {
            bistriJsApi.isLoaded = true;

            console.log ( "-------------> onBistriJsApiLoaded" )

            triggerBistriEvent ( 'onBistriJsApiLoaded' );
        } );
    }
};

document.addEventListener ( 'online', lazyLoad, false );
document.addEventListener ( 'deviceReady', function ()
{ 
    lazyLoad ();
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
                bistriJsApi.callbacks.push ( fn );

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