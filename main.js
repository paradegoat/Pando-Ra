
let searchButton = document.getElementById("search");

searchButton.addEventListener("click", function(event) {
  let searchField = document.getElementById("searchField").value;
  let url = 'https://api.soundcloud.com/tracks/?client_id=3f4f6e443227c34b2391dcf6a71ba46a&q=' + (searchField) + '&limit=6';
  console.log(searchField);
  var searchBar = document.getElementById("search-bar");

  console.log(searchButton);
  fetch(url).then(
    function(response) {
      if (response.status !==200) {
        console.log(response.status);
        alert("this page is broke");
        return;
      }

      response.json().then(function(data){
        console.log("here is the data:")
        console.log(data);
        console.log(searchField);
        newData = data;
        function renderRequest() {
          let clientId = "/?client_id=3f4f6e443227c34b2391dcf6a71ba46a"
          return `

            ${newData.map( element => `
              <div class="results-box">
              <button class= "audioTrigger"><img src="${element.artwork_url}" id="${element.stream_url}${clientId}"></button>
              <ul>
                <li>${element.title}</li>
                <li >${element.user.username}</li>
              </ul>
              </div>

              `).join('')}`;
        }

        let markup =`

        ${renderRequest(data)}

        `
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
})
