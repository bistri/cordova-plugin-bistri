( function ()
{
    function LazyJSLoader ( source, callback )
    {
        this._loaded   = 0,
        this._source  = source instanceof Array ? source : [ source ],
        this._callback = callback;
        this._load ();
    };

    LazyJSLoader.prototype.load = function ()
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

    window.onBistriConferenceReady = function ()
    {
        console.log ( "bc", bc );
    };

    var loader = new LazyJSLoader ();

    loader.load ( 'https://api.bistri.com/bistri.conference.min.js', function ()
    {
        console.log ( "bistri.conference.min.js loaded" );
    } );

} ) ();