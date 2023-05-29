/**
 * GLOBAL VARIABLES
 */
const POPULAR_MOVIES = [];



/**
 * TMDB 기본 키와 URL 작업
 */
const TMDB_KEY = 'ed2e755eb2e0b2604c9dc3e4a248e1ed';
const TMDB_API_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDJlNzU1ZWIyZTBiMjYwNGM5ZGMzZTRhMjQ4ZTFlZCIsInN1YiI6IjY0MDQwNGI4ZTYxZTZkMDBjNjU4MThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqn-AW0hg003HruAB1mhPIGh2W2-dX1buHHUDiN6TNs'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
// 
// Query the API configuration details.

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
    }
};






// TV GENRE FETCH
const TMDB_MOVIE_GENRES = {};
fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options)
  .then(response => response.json())
  .then(response => {
    response.genres.forEach(genre => {
        TMDB_MOVIE_GENRES[`${genre.id}`] = genre.name
    })
})
  .catch(err => console.error(err));

//

const TV_FETCH_INFRO = [];
fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(tv => {
            // Movie Poster
            const tv_id = tv.id;
            const tv_title = tv.name;
            const tv_overview = tv.overview;
            const tv_poster_url = tv.poster_path;
            const tv_year = tv.first_air_date.slice(0, 4);
            const tv_genre = tv.genre_ids
            const tv_genres = [];
            tv_genre.forEach(genreCode => {
                tv_genres.push(TMDB_MOVIE_GENRES[genreCode])
            })
            TV_FETCH_INFRO.push({
                'id': tv_id,
                'title': tv_title,
                'overview': tv_overview,
                'poster': tv_poster_url,
                'year': tv_year,
                'genre': tv_genres
            })
            var parentElement = document.getElementById("trending-tv-cards-container");

            // example card 1
            var cardContainer = document.createElement("div");
            cardContainer.classList.add("movie-card-small", "card-1");
            cardContainer.style.backgroundImage = `url('${TMDB_IMAGE_BASE_URL}/w500${tv_poster_url}')`
            cardContainer.style.zIndex = '1'

            var button = document.createElement("button");
            button.classList.add("Button-add-to-favorite", "small_card");
            cardContainer.appendChild(button);

            var infoContainer = document.createElement("div");
            infoContainer.classList.add("movie-card-info", "small_card");
            cardContainer.appendChild(infoContainer);

            var title = document.createElement("h1");
            title.classList.add("movie-title", "small_card");
            title.textContent = tv_title;
            infoContainer.appendChild(title);

            var basicInfoContainer = document.createElement("div");
            basicInfoContainer.classList.add("movie-basic-info", "small_card");
            infoContainer.appendChild(basicInfoContainer);

            var year = document.createElement("p");
            year.classList.add("movie-basic-info-year", "small_card");
            year.textContent = tv_year;
            basicInfoContainer.appendChild(year);

            var genre = document.createElement("p");
            genre.classList.add("movie-basic-info-genre", "small_card");
            genre.textContent = tv_genres[0];
            basicInfoContainer.appendChild(genre);

            // 부모 요소에 추가
            parentElement.appendChild(cardContainer);

            const small_cards = document.querySelectorAll('.movie-card-small.card-1')
            small_cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.querySelector('.movie-card-info').style.opacity = '1'
                    card.querySelector('.Button-add-to-favorite.small_card').style.opacity = '1'
                })
                card.addEventListener('mouseleave', () => {
                    card.querySelector('.movie-card-info').style.opacity = '0'
                    card.querySelector('.Button-add-to-favorite.small_card').style.opacity = '0'
                })
            });
        })
    })
    .catch(err => console.log(err));