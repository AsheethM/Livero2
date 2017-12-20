cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-facebook.CordovaFacebook",
    "file": "plugins/cordova-plugin-facebook/www/CordovaFacebook.js",
    "pluginId": "cordova-plugin-facebook",
    "clobbers": [
      "CordovaFacebook"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-facebook": "0.2.2",
  "cordova-plugin-geolocation": "3.0.0",
  "cordova-plugin-inappbrowser": "1.7.2",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});