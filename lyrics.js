function findLyrics(artist, song){
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}

//Pegar o que fou digitado no formulario; cancelar o carregamento da pagina
const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', element => {
  element.preventDefault();
  doSubmit();
});

//Pegar o que fou digitado no formulario
function doSubmit(){
  const lyrics_element = document.querySelector('#lyrics');
  const artist = document.querySelector('#artist');
  const song = document.querySelector('#song');

  lyrics_element.innerHTML = '<div class="spinner-grow" role="status"><span class=""sr-only>Carregando...</span></div>';

  //Buscando os dados com o "then"
  findLyrics(artist.value, song.value)
    .then(response => response.json())
    .then(data => {
      if(data.lyrics){
        lyrics_element.innerHTML = data.lyrics;
      } else {
        lyrics_element.innerHTML = data.error;
      }
    })
    .catch(err => {
      lyrics_element.innerHTML = `Oops! ${err}`;
    })
}