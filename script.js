async function buscar() {
  let url = "https://dragonball-api.com/api/characters?limit=58";
  let allCharacters = [];

  let race = document.querySelector("#race");
  let raceFilter = "";

  let genderSelected = document.querySelector('input[name="g"]:checked').value;
  let genderFilter = "";

  if (genderSelected !== "") {
    genderFilter = "&gender=" + genderSelected;
  }

  if (race.value !== "") {
    raceFilter = "&race=" + race.value;
  }

  url = url + raceFilter + genderFilter;

  let container = document.querySelector(".allUsers");
  container.innerHTML = "<p style='color: var(--db-yellow); font-family: Bangers; font-size: 1.5rem; letter-spacing: 2px;'>Rastreando KI...</p>";

  try {
    let resposta = await fetch(url);
    let dados = await resposta.json();

    if (dados.items) {
      allCharacters = dados.items;
    } else {
      allCharacters = dados;
    }

    container.innerHTML = "";

    if (allCharacters.length === 0) {
      container.innerHTML = "<p style='color: var(--db-orange); font-family: Bangers; font-size: 1.5rem;'>Nenhum nível de poder detectado.</p>";
      return;
    }

    allCharacters.forEach((character, index) => {
      let divUser = document.createElement("div");
      divUser.classList.add("user");

      divUser.innerHTML = `
          <div class="avatar">
            <img src="${character.image}" alt="${character.name}" onerror="this.src='https://placehold.co/120x170/161b22/ff5e00?text=Sem+Ki'" />
          </div>
          <div class="data">
            <p>${character.name}</p>
            <p>
              <span>${character.race} - ${character.gender}</span>
            </p>
            <p>
              <span>Base KI:</span> <br />
              <span>${character.ki}</span>
            </p>
            <p>
              <span>Total KI:</span> <br />
              <span>${character.maxKi}</span>
            </p>
          </div>`;

      container.appendChild(divUser);

      setTimeout(() => {
        divUser.classList.add("aparecer");
      }, index * 80); 
    });
    
  } catch (error) {
    container.innerHTML = "<p style='color: red; font-family: Bangers;'>Erro de comunicação.</p>";
    console.error("Erro na requisição:", error);
  }
}

let player;
let tocando = false;

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',  
    videoId: 'ac4redj6jnc',
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'ac4redj6jnc'
    }
  });
}

const btnMusica = document.getElementById('btn-musica');

btnMusica.addEventListener('click', () => {
  if (!player || typeof player.playVideo !== 'function') return;

  if (tocando) {
    player.pauseVideo();
    btnMusica.innerHTML = 'Solta o som DJ'; 
    btnMusica.classList.remove('tocando');
  } else {
    player.playVideo();
    btnMusica.innerHTML = 'Pausar Música';
    btnMusica.classList.add('tocando');
  }
  
  tocando = !tocando;
});

window.onload = buscar;