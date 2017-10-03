console.log("checking in.....HEY HEY");


let trackInput = document.getElementById("trackInput");
let submitButton = document.getElementById("submitButton");
submitButton.onclick = searchTracks;
trackInput.focus();

document.body.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
      searchTracks();
    }
});

function searchTracks() {
  let searchResults = trackInput.value;
    fetch('https://api.soundcloud.com/tracks/?client_id=3f4f6e443227c34b2391dcf6a71ba46a&q=' + searchResults + '&limit=8').then(function(response) {
        if (response.status != 200) {
            console.log('Looks like there was a problem. Status Code' + response.status);
            return;
        }
        response.json().then(function(data){
      console.log("here is the data:")
      console.log(data);
      console.log(searchResults);
          newData = data;

          function renderRequest() {
            let clientId = "/?client_id=3f4f6e443227c34b2391dcf6a71ba46a"
            return `
            <div class="bottom-box">
                <div class= "clearBox">
                  <h3>Search Results:</h3>
                </div>
            </div>
              <div class="container">
              ${newData.map( element =>
                `
                <div class="results-box">
                  <button class= "audioTrigger"><img src="${element.artwork_url}" id="${element.stream_url}${clientId}"></button>
                    <div class="title-element">
                      ${element.title}
                    </div>
                </div>`).join('')
              }
              </div>

            `
          }

          let markup =`${renderRequest()}`
          document.getElementById("results-box").innerHTML = markup;
            var parent = document.getElementById('results-box').addEventListener('click', function (event) {
              var triggers = document.getElementsByClassName('audioTrigger');
              event.target = triggers;
              let playTrack = `<audio src="${event.target.id}" id="audio" controls="controls" autoplay></audio>`
                  return document.getElementById('audioWrap').innerHTML = playTrack;
          });
        });

    }
  );
}
