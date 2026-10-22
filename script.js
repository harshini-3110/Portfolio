'use strict';
const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 640px)');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menuButton.querySelector('span').textContent = '+';
  if (returnFocus) menuButton.focus();
}
function syncMenu() {
  closeMenu();
  menuButton.hidden = !mobileViewport.matches;
  header.classList.toggle('menu-ready', mobileViewport.matches);
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && mobileViewport.matches) {
    closeMenu();
    const section = document.querySelector(link.getAttribute('href'));
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
mobileViewport.addEventListener('change', syncMenu);
syncMenu();
document.querySelectorAll('.info-toggle').forEach((button) => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  panel.hidden = true;
  button.hidden = false;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;
    button.querySelector('span').textContent = expanded ? '−' : '+';
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
