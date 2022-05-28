if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

var recognition = new webkitSpeechRecognition();

recognition.onresult = function(event) {
  if (event.results.length > 0) {
    q.value = event.results[0][0].transcript;
    //q.form.submit();
  }
}

function getNumAleatorio(){
  return Math.floor(Math.random() * 150 + 1)
}

function mostrarSpritePokemon() {
  let numero = getNumAleatorio();
  let url = "https://pokeapi.co/api/v2/pokemon/";
  fetch(url + numero)
      .then(result => result.json())
      .then(pokemon => {
          console.log(pokemon);
          const front_default = pokemon.sprites.front_default;
          const img = `<img src="${front_default}" alt="${pokemon.name}">`;
          const nome = pokemon.name;
          document.body.insertAdjacentHTML('afterbegin', img);
          document.body.insertAdjacentHTML('afterbegin', nome);
      });
}
