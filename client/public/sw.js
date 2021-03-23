// var appCache = "appCache";
// var requestCache = "requestCache";

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(appCache).then((cache) => {
//       cache.addAll(["/index.html", "js/", "css/", "img/"]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request, { ignoreVary: true }).then((response) => {
//       if (response) {
//         return response;
//       }
//       var requestC = event.request.clone();
//       return fetch(requestC).then((response) => {
//         if (!response || response.status !== 200) {
//           return response;
//         }
//         var responseC = response.clone();
//         caches.open(requestCache).then((cache) => {
//           if (/^(http|https)/.test(requestC.url)) {
//             cache.put(requestC, responseC);
//           }
//         });
//         return response;
//       });
//     })
//   );
// });
