import POPULAR_MOVIES from '../home/movie_list.mjs'
import {POPULAR_TVS} from '../home/tv_list.mjs'

let j = 0;
const NAMES_OF_MOVIES_TVS = [];

document.querySelector('#search-home').addEventListener('click', () => {
    if (!NAMES_OF_MOVIES_TVS.length) {
        POPULAR_MOVIES.forEach(el => {
            NAMES_OF_MOVIES_TVS.push({
                'id': el.id,
                'title': el.title,
                'poster': el.poster,
                'year': el.year
            })
        })
        POPULAR_TVS.forEach(el => {
            NAMES_OF_MOVIES_TVS.push({
                'id': el.id,
                'title': el.title,
                'poster': el.poster,
                'year': el.year
            })
        })
    }
    if (j === 0) {
        searchInput.focus();
        document.querySelector('#search-container').style.opacity = 1
        document.querySelector('#search-container').style.zIndex = 11
        j += 1
    } else if (j === 1) {
        document.querySelector('#search-container').style.opacity = 0
        document.querySelector('#search-container').style.zIndex = 0
        j -= 1
    }
})

const searchInput = document.getElementById('search-area');
// show 누르고 엔터 치면 리스트 보이게하는 함수
searchInput.addEventListener("keydown", function(event) {
    if (searchInput.value !== "") {
        search_icon.src = 'static/imgs/search-animated.gif'
        document.getElementById('search-container').style.background = '#fff'
    } else if (searchInput.value === "") {
        search_icon.src = 'static/imgs/search-black.png'
        document.getElementById('search-container').style.background = '#c0c0c0dd'
    }
    if (event.key === "Enter" && searchInput.value === 'show') {
        console.log(NAMES_OF_MOVIES_TVS)
    }
  });

const search_icon = document.getElementById('search-icon');

search_icon.addEventListener('mouseenter', () => {
    search_icon.src = 'static/imgs/search-animated.gif'
    document.getElementById('search-container').style.background = '#fff'

})
search_icon.addEventListener('mouseleave', () => {
    search_icon.src = 'static/imgs/search-black.png'
    document.getElementById('search-container').style.background = '#c0c0c0dd'
})
