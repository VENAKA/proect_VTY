let apiKey = 'd986205facmsh3428e368904d746p19887djsn4c329f17be1f'; 
let apiHost = 'opencritic-api.p.rapidapi.com'; 
let rawgApiKey = '51c7a66d5729445abeeb8ecb21fa43af'; 

function showLoader() {
  let loader = document.getElementById('loader');
  loader.style.display = 'block'; 
}


function hideLoader() {
  let loader = document.getElementById('loader');
  loader.style.display = 'none'; 
}


function searchGame() {
  let gameName = document.getElementById('game-name').value.trim();
  if (!gameName) {
    alert('Please enter a game name.');
    return;
  }

  showLoader(); 

  
  let url = `https://${apiHost}/game/search?criteria=${encodeURIComponent(gameName)}`;
  let options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };
  
  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      let resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = ''; 

      if (result.length > 0) {
        
        result.forEach(game => {
          fetchGameDetailsFromRawg(game.name, game);
        });
      } else {
        resultsContainer.innerHTML = '<p>No games found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      
      setTimeout(hideLoader, 770);
    });
}

function fetchGameDetailsFromRawg(gameName, openCriticGame) {
  let rawgUrl = `https://api.rawg.io/api/games?key=${rawgApiKey}&page_size=1&search=${encodeURIComponent(gameName)}`;
  
  fetch(rawgUrl)
    .then(response => response.json())
    .then(result => {
      if (result.results && result.results.length > 0) {
        let gameDetails = result.results[0];     
        
        
        let gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
          <img src="${gameDetails.background_image}" alt="${openCriticGame.name}" />
          <h3>${openCriticGame.name}</h3>
          <p>Release Date: ${openCriticGame.releaseDate || gameDetails.released}</p>
        `;
        
        gameDiv.addEventListener('click', () => {
          
          showModal(openCriticGame, gameDetails);
        });
        
        document.getElementById('results-container').appendChild(gameDiv);
      } else {
        console.error('No additional details found for the game.');
      }
    })
    .catch(error => {
      console.error('Error fetching details from RAWG:', error);
    });
}

function showModal(openCriticGame, gameDetails) {
  let modal = document.getElementById('game-modal');
  let closeBtn = document.getElementById('close-btn');
  
 
  document.getElementById('modal-game-title').textContent = openCriticGame.name;
  document.getElementById('modal-game-release').textContent = `Release Date: ${gameDetails.released || openCriticGame.releaseDate}`;
  document.getElementById('modal-game-image').src = gameDetails.background_image; 

  
  modal.style.display = 'block';
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }
}

document.getElementById('search-button').addEventListener('click', searchGame);


function fetchData(url, options, label) {
  fetch(url, options)
    .then(response => response.text())
    .then(result => {
      console.log(`${label} result:`, result);
    })
    .catch(error => {
      console.error(`Error fetching ${label}:`, error);
    });
}

let options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost
  }
};


fetchData('https://opencritic-api.p.rapidapi.com/game/hall-of-fame', options, 'Hall of Fame');
fetchData('https://opencritic-api.p.rapidapi.com/game/hall-of-fame/2020', options, 'Hall of Fame 2020');
fetchData('https://opencritic-api.p.rapidapi.com/game/upcoming', options, 'Upcoming games');
fetchData('https://opencritic-api.p.rapidapi.com/game/popular', options, 'Popular games');
fetchData('https://opencritic-api.p.rapidapi.com/game/reviewed-today', options, 'Reviewed Today');
fetchData('https://opencritic-api.p.rapidapi.com/game/recently-released', options, 'Recently Released');
fetchData('https://opencritic-api.p.rapidapi.com/game/reviewed-this-week', options, 'Reviewed This Week');
fetchData('https://opencritic-api.p.rapidapi.com/game/463', options, 'Game 463');
fetchData('https://opencritic-api.p.rapidapi.com/game?platforms=ps4%2Cps5&sort=score&order=asc&skip=20', options, 'PS4 and PS5 sorted by score');
// feedbacke

function loadFeedback() {
  let feedbackItems = JSON.parse(localStorage.getItem('feedbackITems')) || [];
  let feedbackList = document.getElementById('feedback-items');
  feedbackList.innerHTML = ''; 

  feedbackItems.forEach((item) => {
    let li = document.createElement('li');
    li.textContent = `${item.name}: ${item.feedback}`; 
    feedbackList.appendChild(li); 
  });
}


document.getElementById('feedback-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  let nameInput = document.getElementById('name');
  let feedbackInput = document.getElementById('feedback');
  let name = nameInput.value.trim();
  let feedbackText = feedbackInput.value.trim();

  if (name && feedbackText) {
    
    let feedbackItems = JSON.parse(localStorage.getItem('feedbackTtems')) || [];
    feedbackItems.push({ name: name, feedback: feedbackText }); 

    
    localStorage.setItem('feedbackITems', JSON.stringify(feedbackItems));

    nameInput.value = '';
    feedbackInput.value = '';

    loadFeedback();
  }
});
window.onload = loadFeedback;
