/**
 * GLOBAL VARIABLES
 * 사이드바가 나와있으면 i = 1, 들어가면 i = 0;
 */
let i = 0;

// 처음 로드 될 때 사이드바 a태그들 감추기, main width 100%로 하기
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('main').style.width = 'calc(100% + 170px)'
    const a_container = document.querySelectorAll('.side-bar-menu a');
    a_container.forEach(a => {
        a.style.display = 'none';
    })
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
 * 로고 클릭 시 사이드바 나오고 들어가기
 */
const logo = document.getElementById('logo');
const logoh1 = document.querySelector('#logo-h1');
const sidebar_toggle = document.getElementById('side-bar-toggle');
sidebar_toggle.addEventListener('click', (event) => {
    // 사이드바 들어가기
    if (i) {
        i--
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        console.log(aTagsInSidebar)
        sidebar.style.cssText = "transform: translateX(-200px);"
        
        setTimeout(() => {
            main.style.cssText = 'transform: translateX(-200px); '
            main.style.cssText = 'padding-left: 80px;'
            sidebar.style.cssText = 'max-width: 80px; min-width: 80px; background:#212121'
            // 사이드바 줄어든 만큼 다시 body width 늘리기 70px
            document.querySelector('body').style.width = 'calc(100% - 70px)'

            aTagsInSidebar.forEach(el => {
                el.style.cssText = 'display: none;'
            })
            document.getElementById('logo-h1').style.display = 'none'
        }, 0);
        setTimeout(() => {
            sidebar_toggle.id = 'side-bar-toggle'
        }, 400);
        
    } else {
        // 사이드바 나오기
        i++
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const logo_aTag = event.target.parentNode.parentNode.querySelector('h1')
        // event.target.parentNode.parentNode === <div id="side-bar">
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        // sidebar.style.cssText = 'transform: translateX(40px)'
        main.style.cssText = 'padding-left: 250px;'
        setTimeout(() => {
            sidebar.style.background = '#3a4042'
            logo_aTag.style.display = 'block'
            aTagsInSidebar.forEach(a => {
                a.style.display = 'block'
            })
            sidebar.style.minWidth = '250px';sidebar.style.maxnWidth = '250px';sidebar.style.width = '250px';sidebar.style.position = 'fixed;'
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
let cardWidth = container.offsetWidth;
console.log(cardWidth)
arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? container.offsetWidth : -container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
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
// 
// 화살표를 클릭하면 콘텐츠가 더 나오는 함수 종료
// 

// SECTION2 DIV2 화살표 함수
const arrows2 = document.querySelectorAll('.arrow.div2');
const container2 = document.getElementById('trending-tv-cards-container');
let cardWidth2 = container2.offsetWidth;

arrows2.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? container2.offsetWidth : -container2.offsetWidth;
    const scrollLeft = container2.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
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


//

// SECTION2 DIV3 화살표 함수
const arrows3 = document.querySelectorAll('.arrow.div3');
const container3 = document.getElementById('trending-people-cards-container');
let cardWidth3 = container3.offsetWidth;

arrows3.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? container3.offsetWidth : -container3.offsetWidth;
    const scrollLeft = container3.scrollLeft;
    const targetScrollLeft = scrollLeft + scrollAmount;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
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


//


document.addEventListener('click', (e) => {
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
if (section1) {
    document.getElementById('home').src = 'static/imgs/home_current.png'
    document.getElementById('home').parentNode.querySelector('a').style.color = '#8ecccc'
}

logo.addEventListener('mouseenter', () => {
    logo.src = 'static/imgs/logo_colored.png'
})
logo.addEventListener('mouseleave', () => {
    logo.src = 'static/imgs/logo.png'
})


const muteBtn = document.getElementById('main-mute')
const muteBtn1 = document.getElementById('main-mute1')
/**
 * main mute 버튼 호버 동작 설정
 * @param {mute_button} target
 * @returns {change_opacity}
 *  */ 
function muteBtnHover(target) {
    target.style.opacity = 1
}
function muteBtnHoverAway(target) {
    target.style.opacity = 0.4
}

if (muteBtn) {
    muteBtn.addEventListener('mouseenter', () => muteBtnHover(muteBtn))
    muteBtn.addEventListener('mouseleave', () => muteBtnHoverAway(muteBtn))
}
if (muteBtn1) {
    muteBtn1.addEventListener('mouseenter', () => muteBtnHover(muteBtn1))
    muteBtn1.addEventListener('mouseleave', () => muteBtnHoverAway(muteBtn1))
}
//


