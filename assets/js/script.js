function changeNav() {
    let myNav = document.querySelector('.navbar');
    let windowHeight = 10;
    if (document.body.scrollTop >= windowHeight || document.documentElement.scrollTop >= windowHeight) {
        myNav.classList.add("navbar-background");
        myNav.classList.remove("navbar-transparent");
    }
    else {
        myNav.classList.add("navbar-transparent");
        myNav.classList.remove("navbar-background");
    }
}

function textAppear() {
    let introTexts = Array.from(document.querySelectorAll('.intro-text'));
    let screenPosition = window.innerHeight / 1.2;

    introTexts.forEach((el) => {
        let introPosition = el.getBoundingClientRect().top;
        if(introPosition < screenPosition) {
            el.classList.add('intro-appear');
        }
    });
}

function modalShow() {
    let mainEl = document.getElementsByTagName('main')[0];
    let openLink = document.querySelector('.section__box__modal-link');
    let modalContainer = document.querySelector('.section__box__modal');
    let closeLink = document.querySelector('.modal-close');

    openLink.addEventListener('click', (e) => {
        e.preventDefault();
        mainEl.classList.add('overlay');
        modalContainer.classList.add('section__box__modal-open');

    }, false);

    closeLink.addEventListener('click', () => {
        mainEl.classList.remove('overlay');
        modalContainer.classList.remove('section__box__modal-open');
    });
    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
            modalContainer.classList.remove('section__box__modal-open');
            mainEl.classList.remove('overlay');

        }
    });
}
(function () {
    modalShow();
})();

function menuDropdown() {
    const parentLinks = Array.from(document.querySelectorAll('.footer-box__menu__item.parent'));
    parentLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const submenu = e.target.querySelector('.submenu');
            submenu.classList.toggle('submenu-show');
            link.classList.toggle('footer-box__menu__item--active');
        });
    });
}
(function () {
    menuDropdown();
})();