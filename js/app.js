const observ = new IntersectionObserver ((entries)=>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
})
const elements = document.querySelectorAll(".animation");
elements.forEach(element => observ.observe(element));
var image = document.getElementById('image');

// image.addEventListener('click', function () {
//   const findDiv = document.getElementById('findDiv');
//   const text = document.getElementById('text');

//   findDiv.style.width = '180px';
//   findDiv.style.borderRadius = '30px';
//   findDiv.style.padding = '20px';

//   findDiv.style.justifyContent = 'space-between';
//   text.style.display ='block';
//   image.style.width = '20px';
//   image.style.height = '20px';
// });

let isExpanded = false;

image.addEventListener('click', function () {
  const findDiv = document.getElementById('findDiv');
  const text = document.getElementById('text');

  // Verifica o estado atual e altera as propriedades da div
  if (!isExpanded) {
    // Estado normal
    findDiv.style.width = '180px';
    findDiv.style.borderRadius = '30px';
    findDiv.style.display = 'flex';
    findDiv.style.justifyContent = 'space-between';
    text.style.display = 'block';
  } else {
    // Estado inicial
    findDiv.style.width = '50px';
    findDiv.style.borderRadius = '50%';
    findDiv.style.display = 'flex';
    findDiv.style.justifyContent = 'center';
    text.style.display = 'none';
  }

  // Inverte o estado
  isExpanded = !isExpanded;
});

function abrirMaps(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const url = `https://www.google.com/maps/search/?api=1&request=${latitude},${longitude}`;
      window.open(url, '_blank');

    }, function(error){
      console.error('Ophaaa deu um erro ao obter a location:', error.message);
    });
  }
  else{
    console.error('Baixa-la bom Navegador! esse nao suporta.');
  }
}


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

  const interativaDiv = document.getElementById('interativa');

  let startY;
  
  document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });
  
  document.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;
  
    if (deltaY > 50) {
      interativaDiv.style.display = 'block';
      interativaDiv.classList.remove('hidden');
    }
  });
  
  document.addEventListener('touchend', () => {
    interativaDiv.classList.add('hidden');
  });
//popup
document.getElementById('icon').addEventListener('click', function() {
    //document.getElementById('overlay').style.display = 'flex';
    const calendar = document.querySelector('.calendar');
    calendar.style.height = '560px';

});

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
}


// Get a reference to an element
var card = document.querySelectorAll('.card');

// Create a manager to manager the element
var manager = new Hammer.Manager(card);

// Create a recognizer
var Swipe = new Hammer.Swipe();

// Add the recognizer to the manager
manager.add(Swipe);

// Declare global variables to swiped correct distance
var deltaX = 0;
var deltaY = 0;

// Subscribe to a desired event
manager.on('swipe', function(e) {
  deltaX = deltaX + e.deltaX;
  var direction = e.offsetDirection;
  var translate3d = 'translate3d(' + deltaX + 'px, 0, 0)';
  
  if (direction === 4 || direction === 2) {
    e.target.innerText = deltaX;
    e.target.style.transform = translate3d;
  }
});

