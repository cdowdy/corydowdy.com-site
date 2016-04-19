/**
 * Created by Cory on 4/18/2016.
 */

(function(window) {
  "use strict";

  var loadCSS = require('./loadCSS-04-01-2016');
  var preload = require('fg-loadcss/src/cssrelpreload.js');
  var getMeta = require('fg-getmeta/getmeta');
  var cookie = require('fg-cookie/cookie');
  // var grunticon = require('./grunti');

  // expose these globally
  var enhance = window.enhance = {};

  enhance.loadCSS = loadCSS;
  enhance.getMeta = getMeta;
  enhance.cookie = cookie;

  var doc = window.document,
    docEl = doc.documentElement,
    fullCSSKey = "fullcss",
    grunticonKey = "grunticon",
    grunticonSVGKey = "gsvg",
    grunticonDataPNGKey = "gdpng",
    grunticonPNGKey = "gpng",
    htmlClasses = [ "enhanced" ];


  var fullCSS = getMeta(fullCSSKey);

  if( fullCSS && !cookie(fullCSSKey)) {
    loadCSS(fullCSS);
    cookie(fullCSSKey, "true", 7);
  }

  docEl.className += " " + htmlClasses.join(" ");

  var grunticon = function (css) {

  var svgSupport = !! window.document.createElementNS && !!window.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!window.document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(window.opera && navigator.userAgent.indexOf('Chrome') === -1), load = function (data) {
    var cssURL = css[data && svgSupport ? 0 : data ? 1 : 2 ];
    enhance.loadCSS(cssURL);
    enhance.cookie( grunticonKey, cssURL, 7 );
  };
  // Thanks Modernizr
  var  img = new window.Image();

  img.onerror = function(){
    load( false );
  };

  img.onload = function(){
    load( img.width === 1 && img.height === 1 );
  };

  img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  };

  // grunticon cookie/key and loading logic
  if (!cookie(grunticonKey)) {
    grunticon([getMeta(grunticonSVGKey), getMeta(grunticonPNGKey), getMeta(grunticonDataPNGKey)]);
  }


  var supports = !!document.querySelector;
  if (!supports) {
    return;
  }

}( typeof global !== "undefined" ? global : this ));
