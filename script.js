
/* Global interactivity for the Party Rentals site
   - Theme toggle (persists using localStorage)
   - Countdown timer (for elements with [data-countdown])
   - Gallery filter (used on gallery.html)
*/
(function () {
  // --- Theme Toggle ---
  const btn = document.createElement('button');
  btn.id = 'themeToggle';
  btn.className = 'theme-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle light/dark theme');
  btn.textContent = '🌓 Theme';
  // Add after DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(btn);
  });

  function applyTheme(mode) {
    document.body.classList.toggle('dark', mode === 'dark');
    try { localStorage.setItem('theme', mode); } catch (e) {}
  }
  const saved = (() => {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved : (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const mode = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(mode);
  });

  // --- Countdown Timer ---
  function wireCountdown(el) {
    const targetStr = el.getAttribute('data-countdown');
    const span = el.querySelector('.time') || el;
    const target = new Date(targetStr).getTime();
    if (isNaN(target)) return;

    function update() {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= d * 24 * 60 * 60 * 1000;
      const h = Math.floor(diff / (1000 * 60 * 60));
      diff -= h * 60 * 60 * 1000;
      const m = Math.floor(diff / (1000 * 60));
      diff -= m * 60 * 1000;
      const s = Math.floor(diff / 1000);
      span.textContent = `${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
    }
    update();
    const t = setInterval(() => {
      update();
      if (Date.now() >= target) {
        clearInterval(t);
        span.textContent = 'Offer ended';
      }
    }, 1000);
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-countdown]').forEach(wireCountdown);
  });

  // --- Gallery Filter (used by gallery buttons) ---
  window.filterGallery = function (category) {
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.style.display =
        category === 'all' || item.classList.contains(category) ? 'block' : 'none';
    });
  };
})();
