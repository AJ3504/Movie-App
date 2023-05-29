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
const logoh1 = document.querySelector('#logo-h1')
logo.addEventListener('click', (event) => {
    // 사이드바 들어가기
    if (i) {
        i--
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        
        sidebar.style.cssText = "transform: translateX(-200px);"
        main.style.cssText = 'transform: translateX(-200px); '
        setTimeout(() => {
            main.style.cssText = 'padding-left: 80px;'
            sidebar.style.cssText = 'max-width: 80px; min-width: 80px; background:#111'
            // 사이드바 줄어든 만큼 다시 body width 늘리기 70px
            document.querySelector('body').style.width = 'calc(100% - 70px)'

            aTagsInSidebar.forEach(el => {
                el.style.cssText = 'display: none;'
            })
            document.getElementById('logo-h1').style.display = 'none'
        }, 200);
        
    } else {
        // 사이드바 나오기
        i++
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const logo_aTag = event.target.parentNode.querySelector('h1')
        // event.target.parentNode.parentNode === <div id="side-bar">
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        // sidebar.style.cssText = 'transform: translateX(40px)'
        main.style.cssText = 'padding-left: 250px;'
        setTimeout(() => {
            sidebar.style.background = '#363633'
            logo_aTag.style.display = 'block'
            aTagsInSidebar.forEach(a => {
                a.style.display = 'block'
            })
            sidebar.style.minWidth = '250px';sidebar.style.maxnWidth = '250px';sidebar.style.width = '250px';sidebar.style.position = 'fixed;'
            document.querySelector('body').style.width = 'calc(100% - 250px)'
            }, 200);
        }
    }
)

/**
* 화살표를 클릭하면 콘텐츠가 더 나오는 함수 SECTION 2
*/
const arrows = document.querySelectorAll('.arrow');
const container = document.getElementById('trending-cards-container');
const cardWidth = container.offsetWidth;

arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const scrollAmount = arrow.classList.contains('next') ? cardWidth : -cardWidth;
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




