// modal and search related functions
import POPULAR_MOVIES from './movie_list.mjs'
import { POPULAR_TVS } from './tv_list.mjs'
import PEOPLE_INFO from './people_list.mjs'
// Global Variable
let YOUTUBE_TEMP_KEY = [];
let j = 0; // 검색창이 안 나와있으면 0, 나와있으면 1
const NAMES_OF_MOVIES_TVS = [];
const searchInput = document.getElementById('search-area'); // 검색창 input
const search_icon = document.getElementById('search-icon'); // 헤더 검색 아이콘

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


// 동영상 가져오기
let player;
function playYouTubeVideo(videoKey) {
    if (player) {
        // 이전 플레이어가 있으면 영상을 변경합니다.
        player.loadVideoById(videoKey);
      } else {
        // 영상이 재생될 요소를 선택합니다.
    var modal_player_div = document.getElementById("modal-player-div");

    // 영상을 재생할 iframe 요소를 생성합니다.
    var playerDiv = document.createElement("div");
    playerDiv.id = "modal-player";
    modal_player_div.insertBefore(playerDiv, modal_player_div.firstChild);

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
            onError: onYouTubePlayerError
        },
    };

    // 플레이어를 생성합니다.
    player = new YT.Player("modal-player", playerOptions);
    // 플레이어가 준비되었을 때 호출되는 함수입니다.
    function onPlayerReady(event) {
        // 유튜브 영상이 제대로 작동한다면 저장해두었던 영상 temp 키 배열을 비워준다.
        document.getElementById('modal-player').addEventListener('mousedown', (e) => {
            e.preventDefault()
        })
        // event.target.mute();
        event.target.playVideo(); // 영상을 재생합니다.
        let i = 0;
        document.getElementById('modal-mute').addEventListener('click', (e) => {
            if (i) {
                event.target.mute();
                i--
                e.target.id = "modal-mute"
            } else {
                event.target.unMute()
                i++
                e.target.id = "modal-mute1"
            }
            
        })
    }
    }
}
/**
 * 유튜브 에러 나면 ?
 * 영상을 다른걸로 틀기
*/ 
export function onYouTubePlayerError(event) {
    let length;
    // 기존의 영상 키들이 있는 배열에서 마지막요소를 재생한다고 movie_list.mjs에서 설명한 바 있다.
    // 이 배열에서 pop 메소드를 사용하여 마지막 요소 즉, 재생이 안되는 요소를 없애버리고 다시 그 다음 마지막 영상을 재생하게 한다. 이렇게 함으로써 리스트의 새로운 마지막 요소를 재생할 수 있게 된다.
    YOUTUBE_TEMP_KEY.pop();
    length = YOUTUBE_TEMP_KEY.length
    const TRAILER_KEY = YOUTUBE_TEMP_KEY[length-1]
    playYouTubeVideo(TRAILER_KEY);
}
  
/**
 * 카드 클릭시 화면 나오게 하기
 *  TRENDING MOVIE
 */ 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("trending-movie")) {
        document.querySelector('#MOTHER').style.opacity = '0.2'
        const MODAL = document.getElementById('movie-info-container');
        MODAL.style.opacity = 1;
        MODAL.style.zIndex = 10;
        const target_id = e.target.getAttribute('_id')
        let MATCHED_MOVIE_ID;
        let selectedMovie;
        for (let i = 0; i < POPULAR_MOVIES.length; i++) {
            const movie = POPULAR_MOVIES[i]
            if (target_id == movie.id) {
                MATCHED_MOVIE_ID = movie.id
                selectedMovie = movie
                break;
            }}
        document.getElementById('modal-movie-title').innerText = selectedMovie.title
        document.getElementById('modal-movie-year').innerText = selectedMovie.year
        document.getElementById('modal-movie-genre').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
        document.getElementById('modal-movie-info').innerText = selectedMovie.overview
        const progressBar = document.querySelector('.progress')
        document.getElementById('release-date').innerText = selectedMovie['release date']
        document.getElementById('modal-genres').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
        if (!document.getElementById('modal-genres').innerText) {
            document.getElementById('modal-genres').innerText = ''
        }

        // 현재 인기도를 상태바로 만들어 눈으로 보기쉽게 표현한다.
        if (selectedMovie.popularity < 500) {
            progressBar.style.width = '15%'
        } else if (selectedMovie.popularity < 900) {
            progressBar.style.width = '25%'
        } else if (selectedMovie.popularity < 1000) {
            progressBar.style.width = '35%'
        } else if (selectedMovie.popularity < 1300) {
            progressBar.style.width = '45%'
        } else if (selectedMovie.popularity < 1500) {
            progressBar.style.width = '55%'
        } else if (selectedMovie.popularity < 1800) {
            progressBar.style.width = '65%'
        } else if (selectedMovie.popularity < 2000) {
            progressBar.style.width = '75%'
        } else if (selectedMovie.popularity < 2500) {
            progressBar.style.width = '80%'
        } else if (selectedMovie.popularity < 2800) {
            progressBar.style.width = '90%'
        } else if (selectedMovie.popularity < 3000) {
            progressBar.style.width = '95%'
        } else if (selectedMovie.popularity >= 3500) {
            progressBar.style.width = '100%'
        }

        // 데이터베이스에서 받은 평점은 10점 만점으로 나옴으로 나누기 2를 해서 별 다섯 개가 만점인 기준으로 표현한다.
        // 5점 만점에 n점인지에 따라 별점 아이콘이 어떤것이 될지 결정한다.
        const rate = selectedMovie.rate/2
        const rate_1 = document.getElementById('modal-rate-1')
        const rate_2 = document.getElementById('modal-rate-2')
        const rate_3 = document.getElementById('modal-rate-3')
        const rate_4 = document.getElementById('modal-rate-4')
        const rate_5 = document.getElementById('modal-rate-5')
        
        if (rate < 0.3) {
            rate_1.src = 'static/imgs/null.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 0.7) {
            rate_1.src = 'static/imgs/rate_half.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate_half.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate_half.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate_half.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate_half.png'
        } else if (rate >= 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate.png'
        } 
        //
        
        // 영화 틀기
        fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos`, options)
                .then(res => res.json())
                .then(res => {
                    const index = res.results.length;
                    res.results.forEach(element => {
                        YOUTUBE_TEMP_KEY.push(element.key)
                    });
                    // 유튜브 영상 키
                    // const TRAILER_KEY = res.results[index-1].key
                    const TRAILER_KEY = YOUTUBE_TEMP_KEY[index-1]
                    playYouTubeVideo(TRAILER_KEY);
                }); 
    }
});

/**
 * 카드 클릭시 화면 나오게 하기
 *  TRENDING TV
 */ 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("trending-tv")) {
        document.querySelector('#MOTHER').style.opacity = '0.2'
        const MODAL = document.getElementById('movie-info-container');
        MODAL.style.opacity = 1;
        MODAL.style.zIndex = 10;
        const target_id = e.target.getAttribute('_id')
        let MATCHED_MOVIE_ID;
        let selectedMovie;
        for (let i = 0; i < POPULAR_TVS.length; i++) {
            const movie = POPULAR_TVS[i]
            if (target_id == movie.id) {
                MATCHED_MOVIE_ID = movie.id
                selectedMovie = movie
                break;
            }}
        document.getElementById('modal-movie-title').innerText = selectedMovie.title
        document.getElementById('modal-movie-year').innerText = selectedMovie.year
        document.getElementById('modal-movie-genre').innerText = `${selectedMovie.genre[0]}`
        document.getElementById('modal-movie-info').innerText = selectedMovie.overview
        const progressBar = document.querySelector('.progress')
        document.getElementById('release-date-h3').innerText = 'First Air Date'
        document.getElementById('release-date').innerText = selectedMovie['first_air_date']
        document.getElementById('modal-genres').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
        if (!document.getElementById('modal-genres').innerText) {
            document.getElementById('modal-genres').innerText = ''
        }


        if (selectedMovie.popularity < 500) {
            progressBar.style.width = '15%'
        } else if (selectedMovie.popularity < 900) {
            progressBar.style.width = '25%'
        } else if (selectedMovie.popularity < 1000) {
            progressBar.style.width = '35%'
        } else if (selectedMovie.popularity < 1300) {
            progressBar.style.width = '45%'
        } else if (selectedMovie.popularity < 1500) {
            progressBar.style.width = '55%'
        } else if (selectedMovie.popularity < 1800) {
            progressBar.style.width = '65%'
        } else if (selectedMovie.popularity < 2000) {
            progressBar.style.width = '75%'
        } else if (selectedMovie.popularity < 2500) {
            progressBar.style.width = '80%'
        } else if (selectedMovie.popularity < 2800) {
            progressBar.style.width = '90%'
        } else if (selectedMovie.popularity < 3000) {
            progressBar.style.width = '95%'
        } else if (selectedMovie.popularity >= 3500) {
            progressBar.style.width = '100%'
        }




        // rate
        const rate = selectedMovie.vote_average/2
        const rate_1 = document.getElementById('modal-rate-1')
        const rate_2 = document.getElementById('modal-rate-2')
        const rate_3 = document.getElementById('modal-rate-3')
        const rate_4 = document.getElementById('modal-rate-4')
        const rate_5 = document.getElementById('modal-rate-5')
        
        if (rate < 0.3) {
            rate_1.src = 'static/imgs/null.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 0.7) {
            rate_1.src = 'static/imgs/rate_half.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate_half.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate_half.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate_half.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate_half.png'
        } else if (rate >= 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate.png'
        } 
        //
        // player.pauseVideo()
        document.getElementById('player').style.opacity = '0'
        // 영화 틀기
        fetch(`https://api.themoviedb.org/3/tv/${selectedMovie.id}/videos`, options)
                .then(res => res.json())
                .then(res => {
                    const index = res.results.length;
                    res.results.forEach(element => {
                        YOUTUBE_TEMP_KEY.push(element.key)
                    });
                    // 유튜브 영상 키
                    // const TRAILER_KEY = res.results[index-1].key
                    const TRAILER_KEY = YOUTUBE_TEMP_KEY[index-1]
                    playYouTubeVideo(TRAILER_KEY);
                }); 
    }
});


/** 
 * 모달 닫기 버튼 누르면 동작
*/
document.getElementById('modal-close').addEventListener('click', (e) => {
    e.target.parentNode.parentNode.style.opacity = '0'
    e.target.parentNode.parentNode.style.zIndex = '-10'
    document.querySelector('#MOTHER').style.opacity = '1'
    player.pauseVideo()
    // YOUTUBE_TEMP_KEY키 비우기
    YOUTUBE_TEMP_KEY.length = 0;
})



document.addEventListener('click', (e) => {
    if (e.target.classList.contains("trending-people")) {
        console.log(PEOPLE_INFO)
    }})



// 모달창 기능은 이제 끝
// // // // // // // // // // // // // // // // // // // // // // // //
// 밑에서 부터 검색 화면 기능 


/**
 * 
 * 검색 화면 기능 
 */
// NAMES_OF_MOVIES_TVS는 검색 바탕이 될 객체로 fetch한 영화와 tv정보들이 들어있다.
function searchOn() {
    if (!NAMES_OF_MOVIES_TVS.length) { // NAMES_OF_MOVIES_TVS가 비어있으면, 채우기 함수
        // movie_list.mjs에서 불러온 POPULAR_MOVIES를 NAMES_OF_MOVIES_TVS에 채우기
        // 맨위의 import POPULAR_MOVIES from './movie_list.mjs'
        POPULAR_MOVIES.forEach(el => {  
            NAMES_OF_MOVIES_TVS.push({
                'type': 'movie',
                'id': el.id,
                'title': el.title,
                'title_arr': el.title.toUpperCase().split(' '),
                'poster': el.poster,
                'year': el.year,
                'genre': el.genre[0]
            })
        })
        // tv_list.mjs에서 불러온 POPULAR_MOVIES를 NAMES_OF_MOVIES_TVS에 채우기
        // 맨위의 import { POPULAR_TVS } from './tv_list.mjs'
        POPULAR_TVS.forEach(el => {
            NAMES_OF_MOVIES_TVS.push({
                'type': 'tv',
                'id': el.id,
                'title': el.title,
                'title_arr': el.title.toUpperCase().split(' '),
                'poster': el.poster,
                'year': el.year,
                'genre': el.genre[0]
            })
        })
    }
    if (j === 0) { // 검색창이 안 나와있으면
        searchInput.focus(); // input에 포커스 준 상태로 나오게하기
        document.querySelector('#search-container').style.opacity = 1
        document.querySelector('#search-container').style.zIndex = 11
        j += 1 // 검색창 전역 변수 j 를 1로 설정 (1: 나왔다. 0: 들어갔다.)
    } else if (j === 1) {
        document.querySelector('#search-container').style.opacity = 0
        document.querySelector('#search-container').style.zIndex = 0
        j -= 1
        document.getElementById('search-area').value = '' // 들어갈 때 input을 초기화
        deleteSearchResult(); // 검색 결과를 초기화
    }
}
document.addEventListener('keydown', function(event) {
    if (event.altKey) { // option + s(윈도우는 alt + s)를 누르면 검색창이 나오게 설정
      if (String.fromCharCode(event.which).toLowerCase() === 's') {
        event.preventDefault(); // 이 부분은 선택적입니다. 기존에 존재하는 다른 기능과 충돌이 생길 수 있기 때문입니다.
        // 원하는 동작을 수행합니다.
        if (j) {
            document.querySelector('#search-container').style.opacity = 0
            document.querySelector('#search-container').style.zIndex = -1
            j = 0
        } else if (!j) {
            searchOn();
            searchInput.focus();
            document.querySelector('#search-container').style.opacity = 1
            document.querySelector('#search-container').style.zIndex = 11
            j += 1
        }
        
      }
    }
  });


// 검색 결과창 초기화 함수
// 반복문으로 해당 영역을 다 삭제하기
function deleteSearchResult() {
    while (document.getElementById('search-result').firstChild) {
        document.getElementById('search-result').removeChild(document.getElementById('search-result').firstChild);
    }
    document.getElementById('search-result').style.opacity = 0;
    document.getElementById('search-result').style.zIndex = -1;
}
// 홈페이지 헤더에 돋보기 아이콘 클릭하면 검색 함수 실행
document.querySelector('#search-home').addEventListener('click', () => {
    searchOn();
})



// 검색 결과
searchInput.addEventListener("keydown", function(event) {
    // 검색창이 비어있으면, 검색창 배경색을 기본값으로 설정
    if (searchInput.value) {
        document.getElementById('search-container').style.background = '#eeeeeedd'
    // 검색창에 아무거나 써져있으면 검색창 배경색을 바꿈
    } else if (!searchInput.value) {
        document.getElementById('search-container').style.background = '#c0c0c0ee'
    }
    // 엔터를 누르면 돋보기 아이콘 무빙 주기
    // 엔터 누르면 검색창의 값과 타이틀의 값을 비교해서 일치하는 값 표출하기
    if (event.key === "Enter") {
        search_icon.src = 'static/imgs/search-animated.gif'
        const TYPED_WORDS = searchInput.value.toUpperCase(); // 대소문자 구분을 없애기 위해 검색값을 모두 대문자로 바꾸기
        // 영화와 TV 목록들과 <---> 검색값을 비교하기 
        for (let i = 0; i < NAMES_OF_MOVIES_TVS.length-1; i++) {
            for (let j = 0; j < NAMES_OF_MOVIES_TVS[i].title_arr.length; j++) {
                // 검색값이 비교값과 일치하는게 없으면 그만두기
                if (!NAMES_OF_MOVIES_TVS[i].title_arr[j].includes(TYPED_WORDS)) {
                    //
                // 검색값이 비교값과 일치하는게 있으면 검색창 아래 결과창을 만들어 띄우기
                } else {
                    document.getElementById('search-result').style.opacity = 1;
                    document.getElementById('search-result').style.zIndex = 11;
                    // 
                    // 
                    const searchSection = document.getElementById('search-result');

                    const searchResultInnerContainer = document.createElement('div');
                    searchResultInnerContainer.className = `search-result-inner-container`;
                    searchResultInnerContainer.setAttribute('_id', NAMES_OF_MOVIES_TVS[i].id);
                    searchResultInnerContainer.setAttribute('type', NAMES_OF_MOVIES_TVS[i].type);

                    const searchResultInnerContainerLeftDiv = document.createElement('div');
                    searchResultInnerContainerLeftDiv.className = 'search-result-inner-container-left-div';

                    const searchResultPoster = document.createElement('img');
                    searchResultPoster.className = 'search-result-poster';
                    searchResultPoster.src = NAMES_OF_MOVIES_TVS[i].poster;
                    searchResultPoster.alt = `movie poster ${i}: movie title: ${NAMES_OF_MOVIES_TVS[i].title}`;

                    const searchResultInnerContainerRightDiv = document.createElement('div');
                    searchResultInnerContainerRightDiv.className = 'search-result-inner-container-right-div';

                    const searchResultMovieTitle = document.createElement('h2');
                    searchResultMovieTitle.className = 'search-result-movie-title';
                    searchResultMovieTitle.innerText = NAMES_OF_MOVIES_TVS[i].title;

                    const searchRerultMovieOtherInfo = document.createElement('div');
                    searchRerultMovieOtherInfo.className = 'search-result-other-info-container';

                    const searchResultMovieYear = document.createElement('h3');
                    searchResultMovieYear.className = 'search-result-movie-year';
                    searchResultMovieYear.innerText = NAMES_OF_MOVIES_TVS[i].year;

                    const searchResultMovieGenre = document.createElement('p');
                    searchResultMovieGenre.className = 'search-result-movie-genre';
                    searchResultMovieGenre.innerText = NAMES_OF_MOVIES_TVS[i].genre;

                    searchResultInnerContainerLeftDiv.appendChild(searchResultPoster);
                    searchResultInnerContainerRightDiv.appendChild(searchResultMovieTitle);
                    searchResultInnerContainerRightDiv.appendChild(searchRerultMovieOtherInfo);
                    searchRerultMovieOtherInfo.appendChild(searchResultMovieYear);
                    searchRerultMovieOtherInfo.appendChild(searchResultMovieGenre);

                    searchResultInnerContainer.appendChild(searchResultInnerContainerLeftDiv);
                    searchResultInnerContainer.appendChild(searchResultInnerContainerRightDiv);

                    searchSection.appendChild(searchResultInnerContainer);
                }
            }
        } 
    }
    // 지우기 누르면 돋보기 애니메이션 끄기
    if (event.key === "Delete" || event.key === "Backspace") {
        search_icon.src = 'static/imgs/search-black.png'
        // 검색 결과 목록도 다 지우기
        deleteSearchResult();
    }
    // show 누르고 엔터 치면 리스트 보이게하는 함수
    if (event.key === "Enter" && searchInput.value === 'show') {
        console.log(NAMES_OF_MOVIES_TVS)
    }
    // ESC 누르면 검색창 사라지게 하기
    if (event.key === "Escape") {
        document.querySelector('#search-container').style.opacity = 0
        document.querySelector('#search-container').style.zIndex = 0
        j -= 1
        search_icon.src = 'static/imgs/search-black.png'
        document.getElementById('search-result').style.opacity = 0;
        document.getElementById('search-result').style.zIndex = -1;
        document.getElementById('search-area').value = ''
        deleteSearchResult();
    }
  });
  // 검색창에서 x 버튼 누르면 지워지는 기능
document.getElementById('close-search').addEventListener('click', () => {
    document.getElementById('search-area').value = ''
    deleteSearchResult();
})

// 검색창 아이콘 호버시 효과
search_icon.addEventListener('mouseenter', () => {
    search_icon.src = 'static/imgs/search-animated.gif'
    document.getElementById('search-container').style.background = '#eeeeeedd'

})
search_icon.addEventListener('mouseleave', () => {
    search_icon.src = 'static/imgs/search-black.png'
    document.getElementById('search-container').style.background = '#c0c0c0dd'
})

// 카드 눌러서 모달 나올 때 검색창 켜져있으면 숨기기
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("trending-movie")) {
        if (j === 1) {
            document.querySelector('#search-container').style.opacity = 0
            document.querySelector('#search-container').style.zIndex = 0
            j -= 1
            document.getElementById('search-result').style.opacity = 0;
            document.getElementById('search-result').style.zIndex = 0;
        }
        if (e.target.classList.contains("trending-tv")) {
            if (j === 1) {
                document.querySelector('#search-container').style.opacity = 0
                document.querySelector('#search-container').style.zIndex = 0
                j -= 1
                document.getElementById('search-result').style.opacity = 0;
                document.getElementById('search-result').style.zIndex = 0;
            }
        }
    }
})

// SEARCH LIST HOVER EVENT
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('search-result-inner-container')) {
        e.target.style.background = '#5a88e3dd'
    }})
document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('search-result-inner-container')) {
        e.target.style.background = '#c0c0c0dd'
    }})

// SEARCH LIST CLICK EVENT
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('search-result-inner-container')) {
        const resultDiv = e.target;
        const type = resultDiv.getAttribute('type')
        const id = resultDiv.getAttribute('_id')
        // IF MOVIE
        if (type === 'movie') {
            document.querySelector('#search-container').style.opacity = 0
            document.querySelector('#search-container').style.zIndex = 0
            j = 0;
            document.getElementById('search-result').style.opacity = 0;
            document.getElementById('search-result').style.zIndex = 0;
            moviePlayOnSearchResult(id)
        } 
        // IF TV
        else if (type === 'tv') {
            document.querySelector('#search-container').style.opacity = 0
            document.querySelector('#search-container').style.zIndex = 0
            j = 0;
            document.getElementById('search-result').style.opacity = 0;
            document.getElementById('search-result').style.zIndex = 0;
            tvPlayOnSearchResult(id);
        }
    }
})





// 영화였을때 함수
function moviePlayOnSearchResult(id) {
    document.querySelector('#MOTHER').style.opacity = '0.2'
        const MODAL = document.getElementById('movie-info-container');
        MODAL.style.opacity = 1;
        MODAL.style.zIndex = 10;
        const target_id = id;
        let MATCHED_MOVIE_ID;
        let selectedMovie;
        for (let i = 0; i < POPULAR_MOVIES.length; i++) {
            const movie = POPULAR_MOVIES[i]
            if (target_id == movie.id) {
                MATCHED_MOVIE_ID = movie.id
                selectedMovie = movie
                break;
            }}
        document.getElementById('modal-movie-title').innerText = selectedMovie.title
        document.getElementById('modal-movie-year').innerText = selectedMovie.year
        document.getElementById('modal-movie-genre').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
        document.getElementById('modal-movie-info').innerText = selectedMovie.overview
        const progressBar = document.querySelector('.progress')
        document.getElementById('release-date').innerText = selectedMovie['release date']
        document.getElementById('modal-genres').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
        if (!document.getElementById('modal-genres').innerText) {
            document.getElementById('modal-genres').innerText = ''
        }


        if (selectedMovie.popularity < 500) {
            progressBar.style.width = '15%'
        } else if (selectedMovie.popularity < 900) {
            progressBar.style.width = '25%'
        } else if (selectedMovie.popularity < 1000) {
            progressBar.style.width = '35%'
        } else if (selectedMovie.popularity < 1300) {
            progressBar.style.width = '45%'
        } else if (selectedMovie.popularity < 1500) {
            progressBar.style.width = '55%'
        } else if (selectedMovie.popularity < 1800) {
            progressBar.style.width = '65%'
        } else if (selectedMovie.popularity < 2000) {
            progressBar.style.width = '75%'
        } else if (selectedMovie.popularity < 2500) {
            progressBar.style.width = '80%'
        } else if (selectedMovie.popularity < 2800) {
            progressBar.style.width = '90%'
        } else if (selectedMovie.popularity < 3000) {
            progressBar.style.width = '95%'
        } else if (selectedMovie.popularity >= 3500) {
            progressBar.style.width = '100%'
        }




        // rate
        const rate = selectedMovie.rate/2
        const rate_1 = document.getElementById('modal-rate-1')
        const rate_2 = document.getElementById('modal-rate-2')
        const rate_3 = document.getElementById('modal-rate-3')
        const rate_4 = document.getElementById('modal-rate-4')
        const rate_5 = document.getElementById('modal-rate-5')
        
        if (rate < 0.3) {
            rate_1.src = 'static/imgs/null.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 0.7) {
            rate_1.src = 'static/imgs/rate_half.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/null.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 1.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate_half.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/null.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 2.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate_half.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/null.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 3.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate_half.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.2) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/null.png'
        } else if (rate < 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate_half.png'
        } else if (rate >= 4.7) {
            rate_1.src = 'static/imgs/rate.png'
            rate_2.src = 'static/imgs/rate.png'
            rate_3.src = 'static/imgs/rate.png'
            rate_4.src = 'static/imgs/rate.png'
            rate_5.src = 'static/imgs/rate.png'
        } 
        //
        
        // 영화 틀기
        fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos`, options)
                .then(res => res.json())
                .then(res => {
                    const index = res.results.length;
                    res.results.forEach(element => {
                        YOUTUBE_TEMP_KEY.push(element.key)
                    });
                    // 유튜브 영상 키
                    // const TRAILER_KEY = res.results[index-1].key
                    const TRAILER_KEY = YOUTUBE_TEMP_KEY[index-1]
                    playYouTubeVideo(TRAILER_KEY);
                }); 
}






// TV 였을 때 함수
function tvPlayOnSearchResult(id) {
    document.querySelector('#MOTHER').style.opacity = '0.2'
    const MODAL = document.getElementById('movie-info-container');
    MODAL.style.opacity = 1;
    MODAL.style.zIndex = 10;
    const target_id = id
    let MATCHED_MOVIE_ID;
    let selectedMovie;
    for (let i = 0; i < POPULAR_TVS.length; i++) {
        const movie = POPULAR_TVS[i]
        if (target_id == movie.id) {
            MATCHED_MOVIE_ID = movie.id
            selectedMovie = movie
            break;
        }}
    document.getElementById('modal-movie-title').innerText = selectedMovie.title
    document.getElementById('modal-movie-year').innerText = selectedMovie.year
    document.getElementById('modal-movie-genre').innerText = `${selectedMovie.genre[0]}`
    document.getElementById('modal-movie-info').innerText = selectedMovie.overview
    const progressBar = document.querySelector('.progress')
    document.getElementById('release-date-h3').innerText = 'First Air Date'
    document.getElementById('release-date').innerText = selectedMovie['first_air_date']
    document.getElementById('modal-genres').innerText = `${selectedMovie.genre[0]}, ${selectedMovie.genre[1]}`
    if (!document.getElementById('modal-genres').innerText) {
        document.getElementById('modal-genres').innerText = ''
    }


    if (selectedMovie.popularity < 500) {
        progressBar.style.width = '15%'
    } else if (selectedMovie.popularity < 900) {
        progressBar.style.width = '25%'
    } else if (selectedMovie.popularity < 1000) {
        progressBar.style.width = '35%'
    } else if (selectedMovie.popularity < 1300) {
        progressBar.style.width = '45%'
    } else if (selectedMovie.popularity < 1500) {
        progressBar.style.width = '55%'
    } else if (selectedMovie.popularity < 1800) {
        progressBar.style.width = '65%'
    } else if (selectedMovie.popularity < 2000) {
        progressBar.style.width = '75%'
    } else if (selectedMovie.popularity < 2500) {
        progressBar.style.width = '80%'
    } else if (selectedMovie.popularity < 2800) {
        progressBar.style.width = '90%'
    } else if (selectedMovie.popularity < 3000) {
        progressBar.style.width = '95%'
    } else if (selectedMovie.popularity >= 3500) {
        progressBar.style.width = '100%'
    }

    // rate
    const rate = selectedMovie.vote_average/2
    const rate_1 = document.getElementById('modal-rate-1')
    const rate_2 = document.getElementById('modal-rate-2')
    const rate_3 = document.getElementById('modal-rate-3')
    const rate_4 = document.getElementById('modal-rate-4')
    const rate_5 = document.getElementById('modal-rate-5')
    
    if (rate < 0.3) {
        rate_1.src = 'static/imgs/null.png'
        rate_2.src = 'static/imgs/null.png'
        rate_3.src = 'static/imgs/null.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 0.7) {
        rate_1.src = 'static/imgs/rate_half.png'
        rate_2.src = 'static/imgs/null.png'
        rate_3.src = 'static/imgs/null.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 1.2) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/null.png'
        rate_3.src = 'static/imgs/null.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 1.7) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate_half.png'
        rate_3.src = 'static/imgs/null.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 2.2) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/null.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 2.7) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate_half.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 3.2) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate.png'
        rate_4.src = 'static/imgs/null.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 3.7) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate.png'
        rate_4.src = 'static/imgs/rate_half.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 4.2) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate.png'
        rate_4.src = 'static/imgs/rate.png'
        rate_5.src = 'static/imgs/null.png'
    } else if (rate < 4.7) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate.png'
        rate_4.src = 'static/imgs/rate.png'
        rate_5.src = 'static/imgs/rate_half.png'
    } else if (rate >= 4.7) {
        rate_1.src = 'static/imgs/rate.png'
        rate_2.src = 'static/imgs/rate.png'
        rate_3.src = 'static/imgs/rate.png'
        rate_4.src = 'static/imgs/rate.png'
        rate_5.src = 'static/imgs/rate.png'
    } 
    //
    // 영화 틀기
    fetch(`https://api.themoviedb.org/3/tv/${selectedMovie.id}/videos`, options)
            .then(res => res.json())
            .then(res => {
                const index = res.results.length;
                res.results.forEach(element => {
                    YOUTUBE_TEMP_KEY.push(element.key)
                });
                // 유튜브 영상 키
                // const TRAILER_KEY = res.results[index-1].key
                const TRAILER_KEY = YOUTUBE_TEMP_KEY[index-1]
                playYouTubeVideo(TRAILER_KEY);
            }); 
}






