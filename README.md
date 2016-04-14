### cordova-plugin-bistri

Use Bistri WebRTC JS library in your hybrid applications.
This plugin is Android / iOS compatible.

### Install

```
$ cordova plugin add https://github.com/bistri/cordova-plugin-bistri.git
```

### Dependencies

To bring WebRTC support to webviews cordova-plugin-bistri use:

* [cordova-plugin-crosswalk-webview plugin on Android platform](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview/blob/master/README.md)
* [cordova-plugin-iosrtc plugin on iOS platform](https://github.com/eface2face/cordova-plugin-iosrtc)

### iOS Requirements

* Xcode >= 7.2.1
* iOS >= 9 (run on lower versions at your own risk, but don't open issues)
* cordova-ios 4.X
* No bitcode (built-in libwebrtc does not contain bitcode so you need to disable it in your Xcode project settings)

### Build cordova-plugin-iosrtc plugin
Building instructions can be found [here](https://github.com/eface2face/cordova-plugin-iosrtc/blob/master/docs/Building.md)


### Usage

```javascript
    document.addEventListener ( 'onBistriJsApiReady', function ( event )
    {
        // Bistri JS library is ready to use
    } );
```

```javascript
    bistriJSApi.ready ( function ()
    {
        bc.init ( {
            appId    : 'xxxxxxxxxxxxx',
            appKey   : 'xxxxxxxxxxxxx',
            debug    : true
        } );

        bc.signaling.bind ( 'onConnected', function ()
        {
            console.log ( 'Connected !' );
        } );

        bc.connect ();
    } );
```

visit http://developers.bistri.com/webrtc-sdk/js-library-reference for complete JS library reference