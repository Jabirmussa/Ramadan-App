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
    hadth.innerText = ditos;
    narrator.innerText = nara;
    
})
.catch(error => {
    console.log(error);
})



var dataAtual = new Date();

  var diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  var diaSemanaAtual = diasSemana[dataAtual.getDay()];
  var diaAtual = dataAtual.getDate();
  var mesAtual = meses[dataAtual.getMonth()];

  document.getElementById('diaSemana').textContent = diaSemanaAtual + ",";
  document.getElementById('dia').textContent = diaAtual;
  document.getElementById('mes').textContent = mesAtual;

var dataActual = new Date();

  var dataIslâmica = calcularDataIslâmica(dataActual);
  document.getElementById('dataIslamic').textContent = dataIslâmica;

  function calcularDataIslâmica(dataGregoriana) {
    var anoIslâmico = calcularAnoIslâmico(dataGregoriana.getFullYear(), dataGregoriana.getMonth() + 1, dataGregoriana.getDate());
    var dataIslâmicaFormatada = dataGregoriana.getDate() + ' ' + obterNomeMêsIslâmico(dataGregoriana.getMonth() + 1) + ' ' + anoIslâmico + ' AH';

    return dataIslâmicaFormatada;
  }

  function calcularAnoIslâmico(ano, mês, dia) {
    if (mês < 4 || (mês === 4 && dia < 21)) {
      return ano - 622;
    } else {
      return ano - 621;
    }
  }

  function obterNomeMêsIslâmico(mês) {
    var nomesMesesIslâmicos = ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadam', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
    return nomesMesesIslâmicos[mês - 1];
  }

Notification.requestPermission()
.then( permission => {
  new Notification('Salam Bay!');
})

const modeIcon = document.querySelector('#mode-icon');
const color = document.querySelector('.color');
const span = document.querySelector('#dataIslamic');
isDarkMode = false;
function toggleMode(){
  if(isDarkMode){
    isDarkMode = false;
    modeIcon.src = '/light.svg';
    document.body.style.backgroundColor = '#fcfcfc';
    color.style.color = '#002b3e';
    dataIslamic.style.color = '#002b3e'
  } else{
    isDarkMode = true;
    modeIcon.src = '/lua.svg';
    document.body.style.backgroundColor = '#202020';
    color.style.color = '#fff';
    dataIslamic.style.color = '#fff'
  }
}
modeIcon.addEventListener('click', toggleMode);



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
// document.getElementById('icon').addEventListener('click', function() {
//     //document.getElementById('overlay').style.display = 'flex';
//     const calendar = document.querySelector('.calendar');
//     calendar.style.height = '560px';

// });

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
}


