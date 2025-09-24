async function inject(selector, url){
  const host = document.querySelector(selector);
  if(!host) return;
  const res = await fetch(url);
  host.innerHTML = await res.text();
}

(async () => {

  // 2) Theme + active-link setup (run NOW, not only on DOMContentLoaded)
  const key = 'prefers-light';
  const applyTheme = () => {
    const light = localStorage.getItem(key) === '1';
    document.documentElement.classList.toggle('light', light);
  };
  applyTheme(); // apply immediately on every page load

  const init = () => {
    // year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // active nav
    const page = document.body.dataset.page;
    document.querySelectorAll('nav a').forEach(a => {
      if (a.getAttribute('href') === page + '.html') a.classList.add('active');
    });


    // theme toggle
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.onclick = () => {
        const next = localStorage.getItem(key) === '1' ? '0' : '1';
        localStorage.setItem(key, next);
        applyTheme();
      };
    }
  };

  // If DOM is already ready, run immediately; otherwise wait.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
