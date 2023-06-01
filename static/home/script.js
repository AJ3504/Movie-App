/**
 * GLOBAL VARIABLES (전역 변수 모음)
 */
let i = 0; // 사이드바가 나와있으면 i = 1, 들어가면 i = 0;
const logo = document.getElementById('logo'); // 로고 아이콘
const logoh1 = document.querySelector('#logo-h1'); // 로고 글자
const sidebar_toggle = document.getElementById('side-bar-toggle'); // 사이드바 토글 아이콘
const muteBtn = document.getElementById('main-mute') // 메인 비디오 플레이어의 음소거 버튼
const muteBtn1 = document.getElementById('main-mute1') // 메인 비디오 플레이어의 음소거 풀기 버튼

// NO CONTROL
// 마우스 드래그 막기
document.getElementById('GRAND-MOTHER').addEventListener('mousedown', e => {
    e.preventDefault()
})
// 마우스 오른쪽 클릭 막기
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
  
// 처음 로드 될 때 사이드바 a태그들 감추기, main width 100%로 하기
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('main').style.width = 'calc(100% + 170px)'
    const a_container = document.querySelectorAll('.side-bar-menu a');
    a_container.forEach(a => {
        a.style.display = 'none';
    })
})

// document.addEventListener로 이벤트 위임(Event Delegation)을 만들었습니다.
// 따라서 동적으로 생성된 요소에도 클릭 이벤트를 적용하기 위해 해당 함수를 구현했습니다.
// document.addEventListener('click', ...)를 사용하면 모든 클릭 이벤트를 하나의 핸들러에서 처리할 수 있어
// 클릭 이벤트에 대한 일관된 처리를 할 수 있고, 코드의 가독성과 유지 보수성을 높일 수 있다고 합니다.
document.addEventListener('click', (e) => {
    // 카드 안에 있는 좋아요 버튼
    if (e.target.classList.contains('Button-add-to-favorite')) {
        const btn = e.target;
        if (btn.classList.contains('liked')) {
            btn.classList.remove('liked');
        } else {
            btn.classList.add('liked');
        }
    }

});

const section1 = document.getElementById('section1');
// 섹션 1, 즉 메인 비디오 플레이어가 존재한다면, 홈 화면이므로 사이드바에 홈 아이콘을 색이 있는 아이콘으로 변경합니다.
if (section1) {
    document.getElementById('home').src = 'static/imgs/home_current.png'
}
// 로고를 호버링 하면 색이 있는 로고 아이콘으로 파일을 변경한다.
logo.addEventListener('mouseenter', () => {
    logo.src = 'static/imgs/logo_colored.png'
})
// 마우스가 로고아이콘을 벗어나면 기존의 아이콘으로 파일을 변경한다.
logo.addEventListener('mouseleave', () => {
    logo.src = 'static/imgs/logo.png'
})

/**
 * 사이드바 a태그 (메뉴들) 호버시, a태그와 img태그에 효과 주기
 */
const sidebar_a = document.querySelectorAll('.side-bar-menu a');
sidebar_a.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const icon = el.parentNode.querySelector('img');
        icon.style.cssText = 'transform: scale(1.08); transition: ease-in-out 0.2s'
        el.style.cssText = 'transform: scaleX(1.05); transition: ease-in-out 0.2s'
    })
})
sidebar_a.forEach(el => {
    el.addEventListener('mouseleave', () => {
        const icon = el.parentNode.querySelector('img');
            icon.style.cssText = 'transform: scale(1); transition: ease-in-out 0.3s'
            el.style.cssText = 'transform: scaleX(1); transition: ease-in-out 0.3s'
    })
})

/**
 * 사이드바 img태그 (아이콘들) 호버시, a태그와 img태그에 효과 주기
 */
const sidebarIcons = document.querySelectorAll('.side-bar-menu img');
sidebarIcons.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const a = el.parentNode.querySelectorAll('a');
        if (i) {
            a.forEach(el => {
                el.style.cssText = 'transform: scaleX(1.05); color: white; transition: ease-in-out 0.2s'
            })
            
        }
        
        el.style.cssText = 'transform: scale(1.08); transition: ease-in-out 0.2s'
    })
});
sidebarIcons.forEach(el => {
    el.addEventListener('mouseleave', () => {
        const a = el.parentNode.querySelector('a');
        if (i) {
            a.style.cssText = 'color: #b4b4b4; transform: scale(1); transition: ease-in-out 0.3s'
        }
        el.style.cssText = 'transform: scaleX(1); transition: ease-in-out 0.3s'
    })
});
// // // // // // // // // // // // // // // // 
/**
 * 사이드바 버튼 클릭 시 사이드바 나오고 들어가기
 */
sidebar_toggle.addEventListener('click', (event) => {
    // 사이드바 들어가기, i가 0이면 사이드바는 들어간 상태, 1이면 나온 상태
    if (i) { // i = 1 == true === 사이드바가 나온상태이면
        i--
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        sidebar.style.cssText = "transform: translateX(-200px);"
        // setTimeout 400ms로 설정하여 좀 더 다이나믹한 애니메이션 구현
        setTimeout(() => {
            main.style.cssText = 'transform: translateX(-200px); '
            main.style.cssText = 'padding-left: 80px;'
            sidebar.style.cssText = 'max-width: 80px; min-width: 80px; background:#212121'
            // 줄어든 사이드바의 길이는 70px이므로 body는 너비가 70px을 뺀 100%로 설정
            document.querySelector('body').style.width = 'calc(100% - 70px)'
            // 사이드바에 a 태그들 감추기
            aTagsInSidebar.forEach(el => {
                el.style.cssText = 'display: none;'
            })
            document.getElementById('logo-h1').style.display = 'none'
        }, 0);
        setTimeout(() => {
            sidebar_toggle.id = 'side-bar-toggle'
        }, 400);
    // 사이드바 나오기
    } else {    // else ; 사이드바가 들어간 상태이면
        i++
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const logo_aTag = event.target.parentNode.parentNode.querySelector('h1')
        // event.target.parentNode.parentNode === <div id="side-bar">
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        // sidebar.style.cssText = 'transform: translateX(40px)'
        main.style.cssText = 'padding-left: 250px;'
        // setTimeout 400ms로 설정하여 좀 더 다이나믹한 애니메이션 구현
        setTimeout(() => {
            sidebar.style.background = '#3a4042'
            logo_aTag.style.display = 'block'
            aTagsInSidebar.forEach(a => {
                a.style.display = 'block'
            })
            sidebar.style.minWidth = '250px';sidebar.style.maxnWidth = '250px';sidebar.style.width = '250px';sidebar.style.position = 'fixed;'
            // body는 100%에서 사이드바의 사이즈 250px 만큼 빼서 100%로 구현
            document.querySelector('body').style.width = 'calc(100% - 250px)'
            }, 200);
        setTimeout(() => {
            sidebar_toggle.id = 'side-bar-toggle1'
        }, 400);
        }
    }
)

/**
* 화살표를 클릭하면 콘텐츠가 더 나오는 함수 SECTION 2
*/
const arrows = document.querySelectorAll('.arrow.div1');
const container = document.getElementById('trending-cards-container');
// 카드 컨테이너의 너비 산출
let cardWidth = container.offsetWidth;
arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    // arrow에 next란 클래스이름이 들어가면 즉, 오른쪽 화살표 아이콘을 누르면 scrollAmount는 카드 컨테이너의 너비 만큼 설정한다. 이는 오른쪽 화살표를 눌렀을 때 카드들이 화면의 너비 만큼 이동하기 위해서이다. 그렇지않으면(else) 너비를 음수로 설정하여 반대편으로 이동하여 전의 카드를 다시 보여주게끔 설정한다.
    const scrollAmount = arrow.classList.contains('next') ? container.offsetWidth : -container.offsetWidth;
    // 현재 스크롤된 왼쪽 위치를 저장
    const scrollLeft = container.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 1000; // 애니메이션 지속 시간 (ms)
    const startTime = performance.now(); // 애니메이션 시작 시간을 기록
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime; // 경과 시간: 현재 시간과 시작 시간의 차이를 기록
      // 애니메이션 지속 시간을 경과 시간으로 나눈 값이 항상 1보다 작게 만들기 위해 min함수에 두 번째 매개변수로 1을 둔다.
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(scrollProgress);
      const newScrollLeft = scrollLeft + scrollAmount * easedProgress;
      container.scrollLeft = newScrollLeft;
      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    requestAnimationFrame(scrollAnimation);
  });
});
// Cubic easing function (https://easings.net/)
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
* 화살표를 클릭하면 콘텐츠가 더 나오는 함수 SECTION 2에 두 번째 div
*/
const arrows2 = document.querySelectorAll('.arrow.div2');
const container2 = document.getElementById('trending-tv-cards-container');
let cardWidth2 = container2.offsetWidth;
arrows2.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? container2.offsetWidth : -container2.offsetWidth;
    const scrollLeft = container2.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 1000; // 애니메이션 지속 시간 (밀리초)
    const startTime = performance.now();
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(scrollProgress);
      const newScrollLeft = scrollLeft + scrollAmount * easedProgress;
      container2.scrollLeft = newScrollLeft;
      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    requestAnimationFrame(scrollAnimation);
  });
});


/**
* 화살표를 클릭하면 콘텐츠가 더 나오는 함수 SECTION 2에 세 번째 div
*/
const arrows3 = document.querySelectorAll('.arrow.div3');
const container3 = document.getElementById('trending-people-cards-container');
let cardWidth3 = container3.offsetWidth;
arrows3.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? container3.offsetWidth : -container3.offsetWidth;
    const scrollLeft = container3.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 1000; // 애니메이션 지속 시간 (밀리초)
    const startTime = performance.now();
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(scrollProgress);
      const newScrollLeft = scrollLeft + scrollAmount * easedProgress;
      container3.scrollLeft = newScrollLeft;
      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    requestAnimationFrame(scrollAnimation);
  });
});
// 화살표를 클릭하면 콘텐츠가 더 나오는 함수 종료 // // // // // // // // //


/**
 * main mute 버튼 호버 동작 설정
 * @param {mute_button} target
 * @returns {change_opacity}
 *  */ 
function muteBtnHover(target) { // 음소거 버튼 호버시에 투명도 1로 하여 잘 보이게 설정
    target.style.opacity = 1
}
function muteBtnHoverAway(target) { // 마우스가 벗어나면 영상에 집중하게끔 투명도를 40%로 설정
    target.style.opacity = 0.4
}

/**
 * @param {HTMLElement} muteBtn - Mute button element
 * 음소거 버튼이 있는지 파악해서 호버 이벤트를 주기
 */
if (muteBtn) {
    muteBtn.addEventListener('mouseenter', () => muteBtnHover(muteBtn))
    muteBtn.addEventListener('mouseleave', () => muteBtnHoverAway(muteBtn))
}
if (muteBtn1) {
    muteBtn1.addEventListener('mouseenter', () => muteBtnHover(muteBtn1))
    muteBtn1.addEventListener('mouseleave', () => muteBtnHoverAway(muteBtn1))
}
//


