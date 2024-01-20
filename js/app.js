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

//popup
document.getElementById('icon').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex';
});

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function() {
    var contentDiv = document.querySelector('.calendar');

    // Configurando o Hammer.js
    var hammer = new Hammer(contentDiv);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

    // Configurando o ScrollMagic
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
        triggerElement: contentDiv,
        triggerHook: 0.8,
        reverse: false
    })
    .setClassToggle(contentDiv, 'slide-in')
    .addTo(controller);

    // Adicionando o evento de swipe usando Hammer.js
    hammer.on('swipeup', function() {
        document.documentElement.scrollTop = 0;
    });
});
