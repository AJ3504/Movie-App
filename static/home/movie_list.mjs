/**
 * GLOBAL VARIABLES
 * 전역 변수 모음
 */
const POPULAR_MOVIES = [];  // 인기 영화 불러와서 저장하는 배열 생성
const TMDB_MOVIE_GENRES = {}; // 영화 불러 올 때 장르 저장하는 객체 생성
let player; // 동영상 플레이어 변수 선언
export default POPULAR_MOVIES; // 영화 목록 내보내기

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

// 기본 TMDB 구성 불러오기
fetch('https://api.themoviedb.org/3/configuration', options)
    .then(response => response.json())
    .then(response => {
        console.log('------------- configuration')
        console.log(response)
        console.log('------------- configuration')
    })
    .catch(err => console.error(err));




// 영화 장르 리스트 가져오기
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
            // 영화 연도만 따로 추출하기 위해 String.slice() 메소드 사용 - 0번째에서 4번째까지만 따오기 "2023"
            const movie_year = movie.release_date.slice(0, 4)
            //
            // 전역 변수에 저장
            POPULAR_MOVIES.push({
                'id': movie_id,
                'title': movie_title,
                'year': movie_year,
                'poster': movie_poster,
                'overview': movie_overview,
                'genre': movie_genres,
                'rate': movie.vote_average,
                'popularity': movie.popularity,
                'release date': movie.release_date
            })

            // 카드만들기

            // 부모 요소 가져오기
            var parentElement = document.getElementById("trending-cards-container");

            // 카드 생성하기
            var cardContainer = document.createElement("div");
            cardContainer.classList.add("movie-card-small", "card-1", "trending-movie");
            cardContainer.setAttribute("_id", movie_id) // 카드 div에 _id라는 attribute를 만들어 고유 id 입력하기
            cardContainer.attributes.setNamedItem
            cardContainer.style.backgroundImage = `url('${movie_poster}')` // 포스터를 카드의 배경화면으로 지정
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
            genre.textContent = movie_genres[0];    // 영화 장르 배열의 첫 번째 요소만 가져오기
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
// page 2
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    .then(response => {
        if (!response.ok) {
            throw new Error('MOVIE FETCH FAILURE')
        } return response.json()
    })
    .then(data => {
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
                'rate': movie.vote_average,
                'popularity': movie.popularity,
                'release date': movie.release_date
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
            cardContainer.classList.add("movie-card-small", "card-1", "trending-movie");
            cardContainer.setAttribute("_id", movie_id)
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


// 동영상 가져오기
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
            rel: 0
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
            e.preventDefault()  // 마우스 올려서 영상 조작등을 방지
        })
        event.target.mute(); // 영상을 음소거 처리합니다.
        event.target.playVideo(); // 영상을 재생합니다.
        let i = 0; // i를 변수로 둬 스위치 작용하기
        document.getElementById('main-mute').addEventListener('click', (e) => {
            if (i) { // i가 1이면 음소거하기
                event.target.mute();
                i--
                e.target.id = "main-mute"
            } else { // i가 0이면 소리 나오게하기
                event.target.unMute()
                i++
                e.target.id = "main-mute1"
            }
        })
    }
      }
}


let currentVideoKey = []; // 현재 재생 중인 영상 키를 저장하는 변수
let currentVideoKeyVAR = -1; //currentVideoKeyVAR++ 를 하기 때문에 초기에 -1로 잡고 index 0 부터 시작하게끔 설정
const usedNumbers = []; // 랜덤 숫자 결과를 담는 그릇

/**
 * 랜덤 영화 재생하기 함수
 * @returns playYouTubeVideo(TRAILER_KEY)
 */
function playRandomMovie() {
    if (POPULAR_MOVIES.length === 0) { // 데이터 로딩이 완료되지 않은 경우
        setTimeout(playRandomMovie, 100); // 0.1초 후에 다시 호출
        return;
      }
    let tempResult; // 임시 랜덤 숫자 저장소 생성
    /**
     * 숫자 0과 POPULAR_MOVIES에 불러와진 영화의 숫자 사이의 랜덤 숫자를 산출
     * @returns random number
     */
    function makeRandomNumber() {
        const tempNum = (Math.random() * POPULAR_MOVIES.length).toFixed(0);
        const random_movies_INDEX = parseInt(tempNum);
        
        // 랜덤으로 나왔던 숫자들을 저장한 배열에 새로나온 랜덤 수를 비교하여
        // 이미 나왔던 숫자는 생략하고 새로운 숫자를 뽑게하는 함수
        if (usedNumbers.includes(random_movies_INDEX)) {
          return makeRandomNumber(); // 이미 사용된 숫자면 재귀 호출로 다시 생성
        } else {
          usedNumbers.push(random_movies_INDEX); // 사용된 숫자 기록
          return random_movies_INDEX;   // 새로 나온 랜덤 숫자를 리턴
        }
      }
    tempResult = makeRandomNumber(); // tempResult는 새로 나온 랜덤 숫자

    
    // 추가: POPULAR_MOVIES 배열에 데이터를 할당
    const random_movie = POPULAR_MOVIES[tempResult];
    currentVideoKey.push(random_movie.id); // 현재 비디오 키를 currentVideoKey 배열에 추가
    currentVideoKeyVAR++ // currentVideoKeyVAR를 1 올림 (0번째 영상, 1번째 영상 등...)
    // 영상이 시작되고 500ms 이후에 업데이트된 영화 제목과 정보들을 새로 업데이트한다.
    setTimeout(() => {
        const mainMovieTitleBox = document.getElementById('section1-movie-title');
        mainMovieTitleBox.innerText = movie_title;
        mainMovieInfo.querySelector('.movie-basic-info-year').innerText = movie_year;
        mainMovieInfo.querySelector('.movie-basic-info-genre').innerText = movie_genre;
    }, 500);
    const movie_title = random_movie.title;
    const movie_year = random_movie.year;
    const movie_genre = random_movie.genre[0];
    const mainMovieInfo = document.getElementById('main_video_info');
    // 바뀐 영화의 키를 randomID로 설정
    let randomID = currentVideoKey[currentVideoKeyVAR];
    // TMDM 서버에서 해당 유튜브 키를 갖고 검색 요청
    fetch(`https://api.themoviedb.org/3/movie/${randomID}/videos`, options)
      .then(res => res.json())
      .then(res => {
        // 나온 데이터들이 거의 다 마지막 부분이 공식 트레일러인것을 확인했고,
        // 최종 영화 상영키를 마지막 키로 지정
        const index = res.results.length;
        const TRAILER_KEY = res.results[index - 1].key;
        // 영화 시작 함수
        playYouTubeVideo(TRAILER_KEY);
      });
  }
  
// 웹사이트 처음 로딩시에 랜덤 영화 틀기 함수 시작
window.addEventListener('load', () => {
    playRandomMovie()
})


/**
* 메인에 화살표를 클릭하면 새로운 영상이 틀어지는 함수
*/
const arrows_main = document.querySelectorAll('.arrow-main');
const section1 = document.getElementById('section1');
const section1_Width_main = section1.offsetWidth;

arrows_main.forEach(arrow => {
    const movie_title = document.getElementById('section1-movie-title');
    const movie_year = document.querySelector('.movie-basic-info-year');
    const movie_genre = document.querySelector('.movie-basic-info-genre');
    const movie_button = document.querySelector('#Button-watch');
    const movie_favorite = document.querySelector('#Button-main-favorite');
    const movie_mute_icon = document.querySelector('#main-mute');
    const movie_mute_icon1 = document.querySelector('#main-mute1');
    const header = document.querySelector('header');
    arrow.addEventListener('click', (e) => {
        // next arrow를 클릭하면 //
        if (arrow.classList.contains('next')) {
            // next 버튼 클릭하면 랜덤 영화 틀기
            // 현재 영화키 배열의 길이가 n번째(currentVideoKeyVAR) 영화보다 작을 때
            // 즉, 현재 틀어진 영화가 이미 나왔던 영화가 아니면,
            if (currentVideoKey.length-1 <= currentVideoKeyVAR) {
                const player = e.target.parentNode.parentNode.querySelector('#player')
                player.style.opacity = 0;
                movie_title.style.opacity = 0;
                movie_year.style.opacity = 0;
                movie_genre.style.opacity = 0;
                movie_button.style.opacity = 0;
                movie_favorite.style.opacity = 0;
                if (movie_mute_icon) {
                    movie_mute_icon.style.opacity = 0;
                } else {
                    movie_mute_icon1.style.opacity = 0;
                }
                header.style.opacity = 0;
                //모든 화면을 어둡게 하는 효과를 준 후 500ms 이후에 랜덤 영화틀기 함수를 호출한다.
                setTimeout(() => {
                    playRandomMovie()
                }, 500);
                // 아래는 애니메이션 구현용, n ms 뒤에 영화제목 등 정보들 자연스럽게 나오게 하기
                setTimeout(() => {
                    player.style.opacity = 1;
                    if (movie_mute_icon) {
                        movie_mute_icon.style.opacity = 0.8;
                    } else {
                        movie_mute_icon1.style.opacity = 0.8;
                    }
                }, 1000);
                setTimeout(() => {
                    movie_title.style.opacity = 1;
                    if (movie_mute_icon) {
                        movie_mute_icon.style.opacity = 0.4;
                    } else {
                        movie_mute_icon1.style.opacity = 0.4;
                    }
                }, 4000);
                setTimeout(() => {
                    movie_year.style.opacity = 1;
                }, 4500);
                setTimeout(() => {
                    movie_genre.style.opacity = 1;
                }, 4500);
                setTimeout(() => {
                    movie_button.style.opacity = 1;
                }, 5000);
                setTimeout(() => {
                    movie_favorite.style.opacity = 1;
                }, 5200);
                setTimeout(() => {
                    header.style.opacity = 1;
                }, 6500);
                
            // 이미 틀었던 영화에서 다시 왼쪽으로 갔다가 오른쪽으로 가는거면 다시 랜덤 영화를 틀지 않고
            // 기존에 틀어놨던거 그대로 틀기
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


// 메인 화면 정지함수 => 밑의 카드들 클릭하면
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie-card-small')) {
        player.pauseVideo() // 메인 영상을 멈추고
        document.getElementById('player').style.opacity = '0' // 메인 플레이어의 투명도를 0으로 한다.
    }})
// 모달 창이 닫히면 다시 메인 영화를 시작한다. 300ms 후에 투명도를 1로 높혀 자연스럽게 영화가 시작되도록 유도한다.
document.getElementById('modal-close').addEventListener('click', (e) => {
    player.playVideo()
    setTimeout(() => {
        document.getElementById('player').style.opacity = '1'
    }, 350);
})

// SEARCH RESULT LIST CLICK => MAIN PLAYER STOPS
// 검색버튼에 리스트를 클릭해도 메인 영상은 멈춘다.
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('search-result-inner-container')) {
        player.pauseVideo()
        document.getElementById('player').style.opacity = '0'
    }})





// 더 많은 데이터 가져오기
export function fetchMovies(page) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('MOVIE FETCH FAILURE');
        }
        return response.json();
      })
      .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
          // Movie 정보 처리
          const movie_id = movie.id;
          const movie_title = movie.original_title;
          const movie_poster = `${TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}`;
          const movie_overview = movie.overview;
          const movie_genre = movie.genre_ids; // Array of genre codes
          const movie_genres = [];
          const movie_year = movie.release_date.slice(0, 4);
          
          movie_genre.forEach(genreCode => {
            movie_genres.push(TMDB_MOVIE_GENRES[genreCode]);
          });
          
          
          
          // Global 변수에 추가
          POPULAR_MOVIES.push({
            'id': movie_id,
            'title': movie_title,
            'year': movie_year,
            'poster': movie_poster,
            'overview': movie_overview,
            'genre': movie_genres,
            'rate': movie.vote_average,
            'popularity': movie.popularity,
            'release date': movie.release_date
          });
        });
      })
      .catch(err => {
        console.log('movie fetch error caught');
        console.error(err);
      });
  }
  
  // 여러 페이지에 대해 fetch 요청 수행

// 웹페이지 로드 후 5초 후에 데이터 더 받기
const pages = [];
setTimeout(() => {
    for (let i = 3; i < 50; i++) {
        pages.push(i)
    }
    pages.forEach(page => {
        fetchMovies(page)
    })
}, 5000);
