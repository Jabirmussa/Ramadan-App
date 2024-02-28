var staticCacheName = "pwa-v1";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.html',
        '/sobre.html',
        '/css/styles.css',
        'app.js',
        // Adicione outros recursos que você deseja armazenar em cache aqui
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Verifica se a resposta está no cache
      if (response) {
        return response; // Retorna a resposta do cache
      }

      // Caso contrário, faz a solicitação à rede
      return fetch(event.request).then(function(response) {
        // Verifica se a resposta é válida e se é necessário armazenar em cache
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response; // Retorna a resposta normal da rede
        }

        // Clona a resposta para que ela possa ser consumida pela requisição e pelo cache
        var responseToCache = response.clone();

        // Abre o cache e armazena a resposta clonada
        caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response; // Retorna a resposta normal da rede
      });
    })
  );
});
