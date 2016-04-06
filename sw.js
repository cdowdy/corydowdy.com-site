/**
 * Created by Cory on 3/28/2016.
 */
'use strict';

// cache versioning
const VERSION = 'v1.0.10::';
// Static Cache Name -> for static assets
const STATIC_CACHE_NAME = VERSION + 'static';
// URLS/Pages Cache
const URL_CACHE_NAME = VERSION + 'page';
// Cache For Images
const IMG_CACHE_NAME = VERSION + 'img';

// set a maximum number of pages and images we will allow in our service worker cache
const MAXPAGES  = 30;
const MAXIMG    = 30;

// our URL Cache
const URLCACHE = [
  '/',
  '/blog'
  // 'theme/CoryDowdy/css/app.02-18-2016.min.css'
];

// our static cache
const STATIC_CACHE = [
  'theme/CoryDowdy/css/app.02-18-2016.min.css',
  'theme/CoryDowdy/css/icons/icons.data.svg.01182016.css',
  'theme/CoryDowdy/js/navigation-9a37b5a40f.js'
];

// update our static cache on install
function updateStatic() {
  return caches.open(STATIC_CACHE_NAME)
    .then(cache => {
      // using current cookie based critical css approach and storing hte homepage on intial
      // install causes no CSS to be served because there is no CSS for some strange reason on mobile haha
      // so remove this for now
      cache.addAll(URLCACHE);
      return cache.addAll(STATIC_CACHE);
    });
}


// put items into our cache
function putInCache( cacheName, request, response) {
  caches.open(cacheName)
    .then( cache => cache.put(request, response) );
}

// limit the items in a particular cache
function trimCache( cacheName, max ) {
  caches.open(cacheName)
    .then( cache => {
      cache.keys()
        .then(keys => {
          if ( keys.length > max  ){
            cache.delete(keys[0])
              .then(trimCache(cacheName, max));
          }
        });
    });
}

// function to remove old caches that don't match the current cache version
function removeOldCache() {
  return caches.keys()
    .then( keys => {
      return Promise.all(keys
        .filter(key => key.indexOf(VERSION) !== 0 )
        .map(key => caches.delete(key) )
      );
    });
}

// install the service worker
self.addEventListener( 'install', event => {
  event.waitUntil(
    updateStatic()
      .then( () => self.skipWaiting() )
  );
});

// remove old data and caches
self.addEventListener('activate', event => {
  // use removeOldCache function
  event.waitUntil(
    removeOldCache()
      .then( () => self.clients.claim() )
  );
});

// receive a message from the global js ( navigation js in this instance )
// once that message is received we can trim the caches to the maximum amount allowed.
// this also keeps async loaded types from blowing past the cache maximum number allowed like imgs
self.addEventListener('message', event => {
  if (event.data.command === 'trimCaches') {
    removeOldCache(URL_CACHE_NAME, MAXPAGES);
    removeOldCache(IMG_CACHE_NAME, MAXIMG);
  }
});


self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests to my own server
  if (url.origin !== location.origin) {
    return;
  }

  // Ignore requests to some directories
  if (request.url.indexOf('/bolt') !== -1 || request.url.indexOf('/info') !== -1) {
    return;
  }

  // For non-GET requests, try the network first, fall back to the offline page
  if (request.method !== 'GET') {
    event.respondWith(
      fetch(request)
        .catch( () => caches.match('/offline') )
    );
    return;
  }

  //  look in the cache first, fall back to the network
  event.respondWith(
    caches.match(request)
      .then(response => {
        // CACHE
        return response || fetch(request)
            .then( response => {
              // NETWORK
              // If the request is for an image, stash a copy of this image in the images cache
              if (request.headers.get('Accept').indexOf('image') !== -1) {
                let copy = response.clone();
                putInCache(IMG_CACHE_NAME, request, copy);
              }
              if(request.headers.get('Accept').indexOf('text/html') !==1 ) {
                if (request.mode != 'navigate') {
                  request = new Request(url, {
                    method: 'GET',
                    headers: request.headers,
                    mode: request.mode,
                    credentials: request.credentials,
                    redirect: request.redirect
                  });
                }
                let copy = response.clone();
                putInCache(URL_CACHE_NAME, request, copy);
              }
              return response;
            })
            .catch( () => {
              // OFFLINE
              // If the request is for an image, show an offline placeholder
              if (request.headers.get('Accept').indexOf('image') !== -1) {
                return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
              }
              if(request.headers.get('Accept').indexOf('text/html') !==1 ) {
                return caches.match(request)
                  .then( response => response || caches.match('/offline') );
              }
            });
      })
  );
});
