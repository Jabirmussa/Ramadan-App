const hadth = document.querySelector("#hadth");
const narrator = document.querySelector(".narrator");
const apiUrl = 'https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$TpJ5rZxZ3slRbOo94E29Qmnkjc8jUX7i3147SEybbTT0lt2HyA6';
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    const total = data.hadiths.data.length
    const randomHadiths = Math.floor(Math.random()*total)
    var ditos = data.hadiths.data[randomHadiths].hadithEnglish
    var nara = data.hadiths.data[randomHadiths].englishNarrator
    hadth.innerText = ditos
    narrator.innerText = nara
})
.catch(error => {
    console.log(error);
})


const observ = new IntersectionObserver ((entries)=>{
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
})
const elements = document.querySelectorAll(".animation");
elements.forEach(element => observ.observe(element));

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

function showInstallButton() {
  const installButton = document.getElementById('install-button');
  installButton.style.display = 'flex';

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar a PWA');
      } else {
        console.log('Usuário recusou instalar a PWA');
      }
      deferredPrompt = null;
    });
    installButton.style.display = 'none';
  });
}



if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      console.log("Permissão para notificações concedida!");
    }
  });
}
function enviarNotificacao() {
  if (Notification.permission === "granted") {
    var notificacao = new Notification("Alarm", {
      body: "vai receber uma notificacao",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        enviarNotificacao();
      }
    });
  }
}

function dark(){
  const bg = document.querySelector('.bg');
  const text = document.querySelector('p');
  const span = document.querySelector('span');
  const image = document.querySelector('.image');
  bg.style.backgroundColor = '#222527';
  text.style.color = '#fff';
  ReportBody.span.style.color = '#fff';
  toggle.src = './light-mode.svg';
}

// var toggle = document.querySelector('#toggle');

// toggle.addEventListener('click', dark)
/*
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
*/

document.getElementById('sehriCard').addEventListener('click', function () {
  var timeString = document.querySelector('#sehriCard p').innerText;
  
  var time = new Date('1970-01-01T' + timeString + 'Z');
  var timeDifference = time.getTime() - new Date().getTime();
  setTimeout(function () {
      var sound = new Howl({
          src: ['alarm.wav'],
          volume: 1.0
      });
      sound.play();

      swal("Alarme Acionado", "Alarme foi acionado!", "success");

      setTimeout(function () {
          swal.close();
      }, 2000);
  }, timeDifference);
});

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

var isExpanded = false;

image.addEventListener('click', function () {
  const findDiv = document.getElementById('findDiv');
  const text = document.getElementById('text');

  if (!isExpanded) {
    findDiv.style.width = '180px';
    findDiv.style.borderRadius = '30px';
    findDiv.style.display = 'flex';
    findDiv.style.gap = '10px';
    text.style.display = 'block';
  } else {
    findDiv.style.width = '50px';
    findDiv.style.borderRadius = '50%';
    findDiv.style.display = 'flex';
    findDiv.style.justifyContent = 'center';
    text.style.display = 'none';
  }

  isExpanded = !isExpanded;
});


  function abrirMaps(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://www.google.com/maps/search/?api=1&request=${latitude},${longitude}`;
        window.open(url, 'mesquita central');
  
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


const fs = require('fs');

function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function updateQuote() {
  const jsonData = readJsonFile('quotes.json');
  const quote = jsonData.quote;

  // Seleciona a tag h1 com um ID específico (substitua 'suaH1Id' pelo ID desejado)
  const h1Element = document.getElementById('h1');

  // Atualiza a tag h1 com a citação
  if (h1Element) {
    h1Element.textContent = quote;
  }

  // Chama a função novamente após 1 minuto (60.000 milissegundos)
  setTimeout(updateQuote, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para a primeira atualização
  updateQuote();
});

