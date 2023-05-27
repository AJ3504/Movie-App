/**
 * GLOBAL VARIABLES
 */
let i = 1;


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
        const a = el.parentNode.querySelector('a');
        if (i) {
            a.style.cssText = 'transform: scaleX(1.05); color: white; transition: ease-in-out 0.2s'
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
    if (i) {
        i--
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        aTagsInSidebar.forEach(el => {
            el.style.cssText = 'display: none;'
        })
        sidebar.style.cssText = 'transform: translateX(-200px); '
        main.style.cssText = 'transform: translateX(-200px); '
        setTimeout(() => {
            main.style.cssText = 'padding-left: 80px;'
        sidebar.style.cssText = 'width: 80px; '
        
        document.getElementById('logo-h1').style.display = 'none'
        }, 200);
        
    } else {
        i++
        const main = document.querySelector('main');
        const sidebar = document.getElementById('side-bar');
        sidebar.style.cssText = 'transform: translateX(40px)'
        main.style.cssText = 'padding-left: 250px;'
        setTimeout(() => {
        sidebar.style.cssText = 'position: fixed;'
        const aTagsInSidebar = event.target.parentNode.parentNode.querySelectorAll('a')
        aTagsInSidebar.forEach(el => {
            el.style.cssText = ''
    })
    document.getElementById('logo-h1').style.display = ''
        }, 200);
        
}
}

)
