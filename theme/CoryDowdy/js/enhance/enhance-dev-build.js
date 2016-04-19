(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./loadCSS-04-01-2016":2,"fg-cookie/cookie":3,"fg-getmeta/getmeta":4,"fg-loadcss/src/cssrelpreload.js":5}],2:[function(require,module,exports){
(function (global){
/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
  "use strict";
  /* exported loadCSS */
  var loadCSS = function( href, before, media ){
    // Arguments explained:
    // `href` [REQUIRED] is the URL for your CSS file.
    // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
    // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
    // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
    var doc = w.document;
    var ss = doc.createElement( "link" );
    var ref;
    if( before ){
      ref = before;
    }
    else {
      var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
      ref = refs[ refs.length - 1];
    }

    var sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
    ss.media = "only x";

    // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
    function ready( cb ){
      if( doc.body ){
        return cb();
      }
      setTimeout(function(){
        ready( cb );
      });
    }
    // Inject link
    // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
    // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    ready( function(){
      ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
    });
    // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
    var onloadcssdefined = function( cb ){
      var resolvedHref = ss.href;
      var i = sheets.length;
      while( i-- ){
        if( sheets[ i ].href === resolvedHref ){
          return cb();
        }
      }
      setTimeout(function() {
        onloadcssdefined( cb );
      });
    };

    function loadCB(){
      if( ss.addEventListener ){
        ss.removeEventListener( "load", loadCB );
      }
      ss.media = media || "all";
    }

    // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
    if( ss.addEventListener ){
      ss.addEventListener( "load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined( loadCB );
    return ss;
  };
	// commonjs
  if( typeof module !== "undefined" ){
    module.exports = loadCSS;
  }
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
/*! cookie function. get, set, or forget a cookie. [c]2014 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	var cookie = function( name, value, days ){
		// if value is undefined, get the cookie value
		if( value === undefined ){
			var cookiestring = "; " + w.document.cookie;
			var cookies = cookiestring.split( "; " + name + "=" );
			if ( cookies.length === 2 ){
				return cookies.pop().split( ";" ).shift();
			}
			return null;
		}
		else {
			// if value is a false boolean, we'll treat that as a delete
			if( value === false ){
				days = -1;
			}
			var expires = "";
			if ( days ) {
				var date = new Date();
				date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
				expires = "; expires="+date.toGMTString();
			}
			w.document.cookie = name + "=" + value + expires + "; path=/";
		}
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = cookie;
	}
	else {
		w.cookie = cookie;
	}
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
// getMeta function: get a meta tag's content attr by its name
(function( w ){
  var getMeta = function( metaname ){
  	var metas = w.document.getElementsByTagName( "meta" );
  	var meta;
  	for( var i = 0; i < metas.length; i ++ ){
  		if( metas[ i ].name && metas[ i ].name === metaname ){
  			meta = metas[ i ];
  			break;
  		}
  	}
  	return meta && meta.content;
  };
  
  // commonjs
  if( typeof module !== "undefined" ){
  	module.exports = getMeta;
  }
  else {
    w.getMeta = getMeta
  }
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function( w ){
  // rel=preload support test
  if( !w.loadCSS ){
    return;
  }
  var rp = loadCSS.relpreload = {};
  rp.support = function(){
    try {
      return w.document.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {
      return false;
    }
  };

  // loop preload links and fetch using loadCSS
  rp.poly = function(){
    var links = w.document.getElementsByTagName( "link" );
    for( var i = 0; i < links.length; i++ ){
      var link = links[ i ];
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
        w.loadCSS( link.href, link );
        link.rel = null;
      }
    }
  };

  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if( !rp.support() ){
    rp.poly();
    var run = w.setInterval( rp.poly, 300 );
    if( w.addEventListener ){
      w.addEventListener( "load", function(){
        w.clearInterval( run );
      } );
    }
    if( w.attachEvent ){
      w.attachEvent( "onload", function(){
        w.clearInterval( run );
      } )
    }
  }
}( this ));

},{}]},{},[1]);
