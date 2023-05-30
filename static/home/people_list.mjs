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

// PEOPLE FETCH
// GLOBAL VARIABLE
const PEOPLE_INFO = [];
const known_for_TEMP = [];
fetch('https://api.themoviedb.org/3/trending/person/week?language=en-US', options)
    .then(res => res.json())
    .then(data => {
        data.results.forEach(person => {
            const id = person.id;
            const name = person.name;
            const profile = TMDB_IMAGE_BASE_URL + '/h632' + person.profile_path
            PEOPLE_INFO.push({
                'id': id,
                'name': name,
                'gender': person.gender,
                'department': person.known_for_department,
                'profile': profile,
                'known_for' : []
            })
            person.known_for.forEach(el => {
                // 아래 정보는 people 클릭하면 나오는 부가 정보로 띄우기
                const movie_title = el.title
                const movie_poster = TMDB_IMAGE_BASE_URL + '/w500' + el.poster_path
                const movie_release_date = el.release_date
                const movie_overview = el.overview
                known_for_TEMP.push({
                    'id': id,
                    'name': name,
                    'title': movie_title,
                    'poster': movie_poster,
                    'date': movie_release_date,
                    'overview': movie_overview
                })
            })
            
        var parentElement = document.getElementById("trending-people-cards-container");

            // example card 1
            var cardContainer = document.createElement("div");
            cardContainer.classList.add("movie-card-small", "card-1");
            cardContainer.setAttribute("_id", id)
            cardContainer.style.backgroundImage = `url('${TMDB_IMAGE_BASE_URL}/h632${person.profile_path}')`
            cardContainer.style.zIndex = '1'

            var button = document.createElement("button");
            button.classList.add("Button-add-to-favorite", "small_card");
            cardContainer.appendChild(button);

            var infoContainer = document.createElement("div");
            infoContainer.classList.add("movie-card-info", "small_card");
            cardContainer.appendChild(infoContainer);

            var title = document.createElement("h1");
            title.classList.add("movie-title", "small_card");
            title.textContent = person.name;
            infoContainer.appendChild(title);

            var basicInfoContainer = document.createElement("div");
            basicInfoContainer.classList.add("movie-basic-info", "small_card");
            infoContainer.appendChild(basicInfoContainer);

            var year = document.createElement("p");
            year.classList.add("movie-basic-info-year", "small_card");
            year.textContent = `${person.known_for_department === 'Acting' ? 'Actor' : ''}`;
            basicInfoContainer.appendChild(year);

            // var genre = document.createElement("p");
            // genre.classList.add("movie-basic-info-genre", "small_card");
            // genre.textContent = tv_genres[0];
            // basicInfoContainer.appendChild(genre);

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

        });
    })