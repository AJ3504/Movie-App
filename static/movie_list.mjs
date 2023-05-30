/**
 * GLOBAL VARIABLES
 */
const POPULAR_MOVIES = [];
let FETCH_RESULT;

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
    .then(response => {
        if (!response.ok) {
            throw new Error('MOVIE FETCH FAILURE')
        } return response.json()
    })
    .then(data => {
        FETCH_RESULT = data.results
        data.results.forEach(movie => {
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
            
            // 카드 호버 이펙트
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
    .catch(err => {
        console.log('movie fetch error caught')
        console.error(err)
    });

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
// random_movies_INDEX 나온 것들 담는 Array
let tempRandomNumber = [];
const usedNumbers = [];

function playRandomMovie() {
    if (POPULAR_MOVIES.length === 0) {
        // 데이터 로딩이 완료되지 않은 경우
        setTimeout(playRandomMovie, 100); // 1초 후에 다시 호출
        return;
      }
    let tempResult;
    function makeRandomNumber() {
        const tempNum = (Math.random() * POPULAR_MOVIES.length).toFixed(0);
        const random_movies_INDEX = parseInt(tempNum);
        
        if (usedNumbers.includes(random_movies_INDEX)) {
          return makeRandomNumber(); // 이미 사용된 숫자면 재귀 호출로 다시 생성
        } else {
          usedNumbers.push(random_movies_INDEX); // 사용된 숫자 기록
          return random_movies_INDEX;
        }
      }
    tempResult = makeRandomNumber();
    // tempRandomNumber.push(tempResult);
    
    // 추가: POPULAR_MOVIES 배열에 데이터를 할당
    const random_movie = POPULAR_MOVIES[tempResult];
    currentVideoKey.push(random_movie.id);
    currentVideoKeyVAR++
  
    const movie_title = random_movie.title;
    const movie_year = random_movie.year;
    const movie_genre = random_movie.genre[0];
    const mainMovieInfo = document.getElementById('main_video_info');
    const mainMovieTitleBox = document.getElementById('section1-movie-title');
    mainMovieTitleBox.innerText = movie_title;
    mainMovieInfo.querySelector('.movie-basic-info-year').innerText = movie_year;
    mainMovieInfo.querySelector('.movie-basic-info-genre').innerText = movie_genre;
    let randomID = currentVideoKey[currentVideoKeyVAR];
  
    fetch(`https://api.themoviedb.org/3/movie/${randomID}/videos`, options)
      .then(res => res.json())
      .then(res => {
        const index = res.results.length;
        const TRAILER_KEY = res.results[index - 1].key;
        playYouTubeVideo(TRAILER_KEY);
      });
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
            // next 버튼 클릭하면 랜덤 영화 틀기
            if (currentVideoKey.length-1 <= currentVideoKeyVAR) {
                playRandomMovie()

            // previous 버튼 눌렀다가 next 버튼 누른거면 랜덤 영화가 아니라 전에 틀었던거 다시 보여주기
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
        // 처음 영화에서 previous 버튼 누르면 작동 안되게 하기
        } else if (currentVideoKeyVAR <= 0) {
            return

        // previous 버튼 눌렀을 때 전에 보여줬던 영화 다시 틀기
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
            // previous button on main
    })
})