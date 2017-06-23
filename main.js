// get rid of highlight around links in corner
// center content in results-box
//
const searchButton = document.getElementById("search");

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


// need an onclick for the image grabs the stream_url for the track and

// // // 2. Create your `onSubmit` event for getting the user's search term

//
//       // move text from search bar to search  url (dont know how)
//
//
//     })
// //   // on submit need to push to sound cloud and return song info to player and
// //   // artwork and text to grid (the false at the end was something from stack that
// // // said it was useful 95% of cases.  need to look that up)
// // }, false);
//
// ///////////////////////////////////////////////////
// ////   to search the api for tracks  i would want a few things//////////////////////
// ///////////////////////////////////////////////////
// // Below!!!! the q:"", is the search
//
// // // 3. Create your `fetch` request that is called after a submission
// //
//
// // 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play
