var staticCacheName = "pwa-v1";

// Função para abrir o banco de dados
function openDatabase() {
  return new Promise(function(resolve, reject) {
    var request = indexedDB.open('pwa-database', 1);

    request.onerror = function(event) {
      reject('Erro ao abrir o banco de dados: ' + event.target.errorCode);
    };

    request.onsuccess = function(event) {
      resolve(request.result);
    };

    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore('data', { keyPath: 'id' });
      objectStore.createIndex('name', 'name', { unique: false });
      console.log('Banco de dados criado com sucesso.');
    };
  });
}

self.addEventListener("install", function(event) {
  event.waitUntil(
    openDatabase() // Abre o banco de dados ao instalar o Service Worker
      .then(function(db) {
        // Adicione os recursos ao cache
        return caches.open(staticCacheName).then(function(cache) {
          return cache.addAll([
            '/',
            '/index.html',
            '/main.html',
            '/styles.css',
            '/js/app.js',
            // Adicione outros recursos que você deseja armazenar em cache aqui
          ]);
        });
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
