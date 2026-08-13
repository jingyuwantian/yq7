const CACHE_NAME = "yq8-pwa-v3";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
    "./images/0276-iny3m5y.gif",
    "./images/0ff951ebf2004d93549cdb29b33bfb2dd270b34e2b6b36f2d2b4337e7c7a5f1d.jpg",
    "./images/1364-cuKYxhu.gif",
    "./images/1422-D9qe7CM.gif",
    "./images/1460-IZVHb27.gif",
    "./images/3013-u0cNiij.gif",
    "./images/3636-ealLwvX.gif",
    "./images/3b19af0d00a2ce740a7a06340c36bcd5e8da65136fe4864f8e5ec5dc7858d294.jpg",
    "./images/3d6c7c9b7b30427e76b4288b60759f97ec0532e0e775dd600fd1574f4761e573.jpg",
    "./images/5153b78551336651c1882ec634c5954f6373811103c1fe82039e582dd70047d7.jpg",
    "./images/6c9ba7d3719e7c02ca71c4082b1f04d56dc3825f74d3b646cc6ac97847ab69d5.jpg",
    "./images/904add17d326203605a441598bba5c0e6015b57af74eef4fb9c75ef58ec2389b.jpg",
    "./images/Bodyweight_Squat_0.jpg",
    "./images/Bodyweight_Squat_1.jpg",
    "./images/Bodyweight_Walking_Lunge_0.jpg",
    "./images/Bodyweight_Walking_Lunge_1.jpg",
    "./images/Butt_Lift_Bridge_0.jpg",
    "./images/Butt_Lift_Bridge_1.jpg",
    "./images/Cat_Stretch_0.jpg",
    "./images/Cat_Stretch_1.jpg",
    "./images/Dead_Bug_0.jpg",
    "./images/Dead_Bug_1.jpg",
    "./images/ebdddb52e81004b9704e34eb19bc67336a6aa0890814c4e5eac6da7c908252dc.jpg",
    "./images/Jogging_Treadmill_0.jpg",
    "./images/Jogging_Treadmill_1.jpg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (c) { return c.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith((function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok && e.request.url.indexOf(self.location.origin) === 0) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function () {
        if (e.request.mode === "navigate") return caches.match("./index.html");
        throw new Error("offline");
      });
    });
  })());
});
