console.log('Start it up!');

self.addEventListener('install', function (e) {
  self.skipWaiting();
  console.log('Test Notifier installed', e);
});

self.addEventListener('activate', function (e) {
  console.log('Test Notifier activated', e);
});

self.addEventListener('push', function (e) {
  console.log('Test Notifier received', e);
  e.waitUntil(self.registration.showNotification('foobar', {
    body: 'this is poop',
    tag: 'a tag'
  }));
});
