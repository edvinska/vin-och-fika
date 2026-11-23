const header = document.querySelector('.header');
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');

function setNavigation(open) {
  header.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
}

toggle.addEventListener('click', () => setNavigation(!header.classList.contains('nav-open')));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setNavigation(false);
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) setNavigation(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('nav-open')) {
    setNavigation(false);
    toggle.focus();
  }
});
matchMedia('(min-width: 1025px)').addEventListener('change', () => setNavigation(false));

for (const link of document.querySelectorAll('[data-dialog]')) {
  link.addEventListener('click', event => {
    const id = link.dataset.dialog === 'events' ? 'events-info' : link.dataset.dialog;
    const dialog = document.getElementById(id);
    if (!dialog?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dialog.showModal();
  });
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (navigation.contains(document.activeElement) && getComputedStyle(navigation).display === 'none') toggle.focus();
  });
}

function keepSectionOnLanguageChange() {
  for (const link of document.querySelectorAll('.languages a')) {
    link.hash = window.location.hash;
  }
}
keepSectionOnLanguageChange();
window.addEventListener('hashchange', keepSectionOnLanguageChange);