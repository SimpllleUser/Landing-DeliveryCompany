console.log("Work main js")

// ===== INTI SLIDER

document.addEventListener('DOMContentLoaded', function () {
    new Splide('#service-slider',
        {
            type: "loop"
        })
        .mount();
});

// ===== / INTI SLIDER

const showMobileMenu = async () => {
    const navBar = document.getElementsByClassName('navbar-nav')[0];
    navBar.style.display = 'block';
    navBar.setAttribute('class', navBar.getAttribute('class') + ' mobile-navb-bar')
    setTimeout(() => {
        navBar.style.opacity = '1';
    }, 100)
    body.setAttribute('data', 'modal-show')
}

const hideMobileMenu = () => {
    const navBar = document.getElementsByClassName('navbar-nav')[0];
    navBar.style.opacity = '0';

    setTimeout(() => {
        navBar.setAttribute('class', navBar.getAttribute('class').replace('mobile-navb-bar', ''))
        body.setAttribute('data', '')
        navBar.style.display = 'none';
    }, 300)

}


const burgerBtn = document.getElementsByClassName('burger-btn')[0]
const hideNavBar = document.getElementsByClassName('hide-nav-bar')[0]
const body = document.getElementsByTagName('body')[0]

burgerBtn.addEventListener('click', showMobileMenu)
hideNavBar.addEventListener('click', hideMobileMenu)
