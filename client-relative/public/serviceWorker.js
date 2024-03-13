let CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/logo512.png',
    '/logo192.png',
    '/favicon.ico',
    '/images/Approved.svg',
    '/images/Disapproved.svg',
    '/images/EnvelopeIcon.svg',
    '/images/Envelope.svg',
    '/images/ExampleLetter.png',
    '/images/LittleManIcon.svg',
    '/images/LittleManWithoutCircle.svg',
    '/images/Logo1.svg',
    '/images/MessageSentLittleMonster.svg',
    '/images/NewBackground.png',
    '/images/PencilIcon.svg',
    '/images/RecordingSymbol.svg',
    '/images/RotateScreen.gif',
    '/images/TrashIcon.svg',
    '/images/TryAgainMonster.svg',
    '/images/TryAgain.svg',
    '/gif/animation.gif'

];
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
    self.skipWaiting();
});