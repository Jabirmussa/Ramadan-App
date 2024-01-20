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
    var calendarDiv = document.querySelector('.calendar');
    var hammer = new Hammer(calendarDiv);

    var isOpen = false;
    var screenHeight = window.innerHeight;

    hammer.on('swipeup', function() {
        if (!isOpen) {
            openCalendar();
        }
    });

    hammer.on('swipedown', function() {
        if (isOpen) {
            closeCalendar();
        }
    });

    function openCalendar() {
        calendarDiv.style.height = '70%';
        isOpen = true;
    }

    function closeCalendar() {
        calendarDiv.style.height = '50px';
        isOpen = false;
    }
});

