import POPULAR_MOVIES from './movie_list.mjs'
import { POPULAR_TVS } from './tv_list.mjs'
import PEOPLE_INFO from './people_list.mjs'

// Global Variable
let YOUTUBE_TEMP_KEY = [];

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


// 동영상 가져오기 해보기
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
function onYouTubePlayerError(event) {
    // 오류 처리 로직을 추가하거나 오류 메시지를 표시하는 등의 작업 수행
    console.log("ERROR ERROR ERROR! LET'S CHANGE THE VIDEO!")
    let length;
    // 이렇게 함으로써 리스트의 새로운 마지막 요소를 재생할 수 있게 된다.
    YOUTUBE_TEMP_KEY.pop();
    length = YOUTUBE_TEMP_KEY.length
    const TRAILER_KEY = YOUTUBE_TEMP_KEY[length-1]
    console.log(YOUTUBE_TEMP_KEY)
    console.log(TRAILER_KEY)
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


        if (selectedMovie.popularity < 1000) {
            progressBar.style.width = '15%'
        } else if (selectedMovie.popularity < 1300) {
            progressBar.style.width = '25%'
        } else if (selectedMovie.popularity < 1500) {
            progressBar.style.width = '35%'
        } else if (selectedMovie.popularity < 1700) {
            progressBar.style.width = '45%'
        } else if (selectedMovie.popularity < 1900) {
            progressBar.style.width = '55%'
        } else if (selectedMovie.popularity < 2300) {
            progressBar.style.width = '65%'
        } else if (selectedMovie.popularity < 2800) {
            progressBar.style.width = '75%'
        } else if (selectedMovie.popularity < 3500) {
            progressBar.style.width = '80%'
        } else if (selectedMovie.popularity < 4200) {
            progressBar.style.width = '90%'
        } else if (selectedMovie.popularity < 5000) {
            progressBar.style.width = '95%'
        } else if (selectedMovie.popularity >= 5000) {
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
                    console.log(res.results)
                    res.results.forEach(element => {
                        YOUTUBE_TEMP_KEY.push(element.key)
                    });
                    console.log(YOUTUBE_TEMP_KEY)
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


        if (selectedMovie.popularity < 1000) {
            progressBar.style.width = '15%'
        } else if (selectedMovie.popularity < 1300) {
            progressBar.style.width = '25%'
        } else if (selectedMovie.popularity < 1500) {
            progressBar.style.width = '35%'
        } else if (selectedMovie.popularity < 1700) {
            progressBar.style.width = '45%'
        } else if (selectedMovie.popularity < 1900) {
            progressBar.style.width = '55%'
        } else if (selectedMovie.popularity < 2300) {
            progressBar.style.width = '65%'
        } else if (selectedMovie.popularity < 2800) {
            progressBar.style.width = '75%'
        } else if (selectedMovie.popularity < 3500) {
            progressBar.style.width = '80%'
        } else if (selectedMovie.popularity < 4200) {
            progressBar.style.width = '90%'
        } else if (selectedMovie.popularity < 5000) {
            progressBar.style.width = '95%'
        } else if (selectedMovie.popularity >= 5000) {
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
                    console.log(res.results)
                    res.results.forEach(element => {
                        YOUTUBE_TEMP_KEY.push(element.key)
                    });
                    console.log(YOUTUBE_TEMP_KEY)
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