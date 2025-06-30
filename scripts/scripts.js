const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav');

menu.classList.remove('active');
menuToggle.classList.remove('active');
menuToggle.setAttribute('aria-expanded', 'false');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggle.classList.toggle('active');
  const isOpen = menu.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', isOpen.toString());
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
