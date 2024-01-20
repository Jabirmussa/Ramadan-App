/*pwa*/
async function registerSW() {
    if ('serviceworker' in navigator){
        try{
            await navigator
                .serviceWorker
                .register('serviceworker.js');
        }
        catch(e){
            console.log('SW registation failed');
        }
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  }

const observ = new IntersectionObserver ((entries)=>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
})
const elements = document.querySelectorAll(".animation");
elements.forEach(element => observ.observe(element));