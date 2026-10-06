var mainMenu = document.querySelector('.main-menu');
var mainMenuToggle = document.querySelector('.main-menu__toggle');
var pageHeader = document.querySelector('.page-header__wrap');

pageHeader.classList.remove('page-header__wrap--opened');
mainMenu.classList.remove('main-menu--opened');
mainMenu.classList.add('main-menu--closed');

mainMenuToggle.addEventListener('click', function() {
  if (mainMenu.classList.contains('main-menu--closed')) {
    mainMenu.classList.remove('main-menu--closed');
    mainMenu.classList.add('main-menu--opened');
    pageHeader.classList.add('page-header__wrap--opened');
  } else {
    pageHeader.classList.remove('page-header__wrap--opened');
    mainMenu.classList.remove('main-menu--opened');
    mainMenu.classList.add('main-menu--closed');
  }
});
