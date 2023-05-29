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
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
// 
// Query the API configuration details.

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
    }
  };


fetch('https://api.themoviedb.org/3/configuration', options)
    .then(response => response.json())
    .then(response => {
        console.log('------------- configuration')
        console.log(response)
        console.log('------------- configuration')
    })
    .catch(err => console.error(err));




// 영화 장르 리스트 가져오기

const TMDB_MOVIE_GENRES = {};
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(response => response.json())
  .then(response => {
    response.genres.forEach(genre => {
        TMDB_MOVIE_GENRES[`${genre.id}`] = genre.name
    })
  })
  .catch(err => console.error(err));


/**
 * fetch "POPULAR" movie lists
 */
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(movie => {
            // Movie Poster
            const movie_id = movie.id
            const movie_title = movie.original_title
            const movie_poster = `${TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}`
            const movie_overview = movie.overview
            const movie_genre = movie.genre_ids // Array of genre codes
            const movie_genres = [];
            movie_genre.forEach(genreCode => {
                movie_genres.push(TMDB_MOVIE_GENRES[genreCode])
            })
            const movie_year = movie.release_date.slice(0, 4)
            //
            // Global Variable 에 넣기
            POPULAR_MOVIES.push({
                'id': movie_id,
                'title': movie_title,
                'year': movie_year,
                'poster': movie_poster,
                'overview': movie_overview,
                'genre': movie_genres,
            })

            //
            //


            // 카드만들기
            //
            //
            // 부모 요소 가져오기
            var parentElement = document.getElementById("trending-cards-container");

            // example card 1
            var cardContainer = document.createElement("div");
            cardContainer.classList.add("movie-card-small", "card-1");
            cardContainer.style.backgroundImage = `url('${movie_poster}')`
            cardContainer.style.zIndex = '1'

            var button = document.createElement("button");
            button.classList.add("Button-add-to-favorite", "small_card");
            cardContainer.appendChild(button);

            var infoContainer = document.createElement("div");
            infoContainer.classList.add("movie-card-info", "small_card");
            cardContainer.appendChild(infoContainer);

            var title = document.createElement("h1");
            title.classList.add("movie-title", "small_card");
            title.textContent = movie_title;
            infoContainer.appendChild(title);

            var basicInfoContainer = document.createElement("div");
            basicInfoContainer.classList.add("movie-basic-info", "small_card");
            infoContainer.appendChild(basicInfoContainer);

            var year = document.createElement("p");
            year.classList.add("movie-basic-info-year", "small_card");
            year.textContent = movie_year;
            basicInfoContainer.appendChild(year);

            var genre = document.createElement("p");
            genre.classList.add("movie-basic-info-genre", "small_card");
            genre.textContent = movie_genres[0];
            basicInfoContainer.appendChild(genre);

            // 부모 요소에 추가
            parentElement.appendChild(cardContainer);

        })
    })
    .catch(err => console.error(err));

// /vZloFAK7NmvMGKE7VkF5UHaz0I.jpg
// 이미지 BASE URL "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"

// 동영상 가져오기 해보기



let player;
function playYouTubeVideo(videoKey) {
    if (player) {
        // 이전 플레이어가 있으면 영상을 변경합니다.
        player.loadVideoById(videoKey);
      } else {
        // 영상이 재생될 요소를 선택합니다.
    var section1Div = document.getElementById("section1");

    // 영상을 재생할 iframe 요소를 생성합니다.
    var playerDiv = document.createElement("div");
    playerDiv.id = "player";
    section1Div.insertBefore(playerDiv, section1Div.firstChild);

    // 영상 재생 설정을 정의합니다.
    var playerOptions = {
        height: "100%",
        width: "100%",
        videoId: videoKey,
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: videoKey,
            mute: 1,
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
            fs: 1,
            cc_load_policy: 0,
            disablekb: 1,
        },
        events: {
            onReady: onPlayerReady,
        },
    };

    // 플레이어를 생성합니다.
    player = new YT.Player("player", playerOptions);

    // 플레이어가 준비되었을 때 호출되는 함수입니다.
    function onPlayerReady(event) {
        document.getElementById('player').addEventListener('mousedown', (e) => {
            e.preventDefault()
        })
        event.target.mute(); // 영상을 음소거 처리합니다.
        event.target.playVideo(); // 영상을 재생합니다.
        let i = 0;
        document.getElementById('main-mute').addEventListener('click', (e) => {
            if (i) {
                event.target.mute();
                i--
                e.target.id = "main-mute"
            } else {
                event.target.unMute()
                i++
                e.target.id = "main-mute1"
            }
            // player.setVolume(100); // 음량 설정 (0-100)
        })
    }

      }
    
    
}

// 유튜브 API를 초기화합니다.
function onYouTubeIframeAPIReady() {
    // API 초기화 코드는 여기에 넣을 필요가 없습니다.
    // 필요한 경우 다른 위치에 넣지 마세요.
}
let currentVideoKey = []; // 현재 재생 중인 영상 키를 저장하는 변수
let currentVideoKeyVAR = -1;
function playRandomMovie() {
    const random_movies_INDEX = (Math.random()*(POPULAR_MOVIES.length)).toFixed(0);
    const random_movie_ID = POPULAR_MOVIES[random_movies_INDEX].id;
    currentVideoKey.push(random_movie_ID);
    currentVideoKeyVAR++
    console.log(currentVideoKey)
    console.log(currentVideoKeyVAR)
    const movie_title = POPULAR_MOVIES[random_movies_INDEX].title;
    const movie_year = POPULAR_MOVIES[random_movies_INDEX].year;
    const movie_genre = POPULAR_MOVIES[random_movies_INDEX].genre[0];
    
    const mainMovieInfo = document.getElementById('main_video_info');
    const mainMovieTitleBox = document.getElementById('section1-movie-title')
    mainMovieTitleBox.innerText = movie_title
    mainMovieInfo.querySelector('.movie-basic-info-year').innerText = movie_year;
    mainMovieInfo.querySelector('.movie-basic-info-genre').innerText = movie_genre;
    let randomID = currentVideoKey[currentVideoKeyVAR]

    fetch(`https://api.themoviedb.org/3/movie/${randomID}/videos`, options)
        .then(res => res.json())
        .then(res => {
            const index = res.results.length;
            // 유튜브 영상 키
            const TRAILER_KEY = res.results[index-1].key
            // youtube api
            playYouTubeVideo(TRAILER_KEY);
})
}

window.addEventListener('load', () => {
    playRandomMovie()
})


/**
* 화살표를 클릭하면 콘텐츠가 더 나오는 함수 SECTION 2
*/
const arrows_main = document.querySelectorAll('.arrow-main');
const section1 = document.getElementById('section1');
const section1_Width_main = section1.offsetWidth;

arrows_main.forEach(arrow => {
    arrow.addEventListener('click', () => {
        // next arrow를 클릭하면 //
        if (arrow.classList.contains('next')) {
            if (currentVideoKey.length-1 <= currentVideoKeyVAR) {
                playRandomMovie()
            } else {
                currentVideoKeyVAR++
                const nextMovieID = currentVideoKey[currentVideoKeyVAR]
                let movie_title;
                let movie_year;
                let movie_genre;
                POPULAR_MOVIES.forEach(nextMovie => {
                    if (nextMovie.id === nextMovieID) {
                        movie_title = nextMovie.title;
                        movie_year = nextMovie.year;
                        movie_genre = nextMovie.genre[0]
                    }
                })
                console.log(movie_title, movie_year, movie_genre)
                console.log(currentVideoKey)
                const mainMovieInfo = document.getElementById('main_video_info');
                const mainMovieTitleBox = document.getElementById('section1-movie-title')
                mainMovieTitleBox.innerText = movie_title
                mainMovieInfo.querySelector('.movie-basic-info-year').innerText = movie_year;
                mainMovieInfo.querySelector('.movie-basic-info-genre').innerText = movie_genre;

                fetch(`https://api.themoviedb.org/3/movie/${nextMovieID}/videos`, options)
                    .then(res => res.json())
                    .then(res => {
                        const index = res.results.length;
                        // 유튜브 영상 키
                        const TRAILER_KEY = res.results[index-1].key
                        // youtube api
                        playYouTubeVideo(TRAILER_KEY);
            })

            }
        } else {
                currentVideoKeyVAR--
                const previousMovieID = currentVideoKey[currentVideoKeyVAR]
                let movie_title;
                let movie_year;
                let movie_genre;
                POPULAR_MOVIES.forEach(prevMovie => {
                    if (prevMovie.id === previousMovieID) {
                        movie_title = prevMovie.title;
                        movie_year = prevMovie.year;
                        movie_genre = prevMovie.genre[0]
                    }
                })
                console.log(movie_title, movie_year, movie_genre)
                console.log(currentVideoKey)
               
                const mainMovieInfo = document.getElementById('main_video_info');
                const mainMovieTitleBox = document.getElementById('section1-movie-title')
                mainMovieTitleBox.innerText = movie_title
                mainMovieInfo.querySelector('.movie-basic-info-year').innerText = movie_year;
                mainMovieInfo.querySelector('.movie-basic-info-genre').innerText = movie_genre;
            
                fetch(`https://api.themoviedb.org/3/movie/${previousMovieID}/videos`, options)
                    .then(res => res.json())
                    .then(res => {
                        const index = res.results.length;
                        // 유튜브 영상 키
                        const TRAILER_KEY = res.results[index-1].key
                        // youtube api
                        playYouTubeVideo(TRAILER_KEY);
            })
        }
    })
})