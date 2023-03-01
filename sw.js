self.addEventListener("install", function (event) { 
    event.waitUntil(preLoad()); });
    var filesToCache = [ '/index.html',
    '/image2.png', '/icon_image.png', ];
    var preLoad = function () {
    return caches.open("offline").then(function (cache) { // caching index and important routes
    return cache.addAll(filesToCache);
    });
    };
    self.addEventListener("fetch", function (event) { 
    event.respondWith(checkResponse(event.request).catch(function () { return 
    returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));
    });
    var checkResponse = function (request) { return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) { if (response.status !== 404) { fulfill(response);
    } else { reject(); }
    }, reject); });
    };
    var addToCache = function (request) {
    return caches.open("offline").then(function (cache) { return fetch(request).then(function 
    (response) {
    return cache.put(request, response); });
    });
    };
    var returnFromCache = function (request) {
    return caches.open("offline").then(function (cache) { return 
    cache.match(request).then(function (matching) {
    if (!matching || matching.status == 404) { return cache.match("offline.html"); } else {
    return matching;
    }
    }); }); };

    self.addEventListener('install', function(event) {
        console.log('service worker has been installed');
        });
        self.addEventListener('activate', function(event) {
        console.log('service worker has been activated');
        });
        self.addEventListener('fetch', function(event) {
        console.log('fetch successfull');
        });
        /*self.addEventListener('push', function (event) {
        var data = "hello";
        if (data.method == "pushMessage") { console.log("Push notification sent");
        event.waitUntil(self.registration.showNotification("Omkar Sweets Corner", 
        { body: "hi"
        }))
        }
        })
        */
        self.addEventListener('push', (event) => {
        const options = {
        body: 'This notification was generated from a push!',
        icon: '',
        data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
        },
        actions: [
        {
        action: 'explore', title: 'Explore this new world',
        icon: ''
        },
        {
        action: 'close', title: 'Close',
        icon: ''
        },
        ]
        };
        event.waitUntil(
        self.registration.showNotification('Title', options)
        )
        });  
    