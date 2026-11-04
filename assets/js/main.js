/* Quaderno — comportamenti via attributi data-* (nessuna dipendenza) */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base = (document.querySelector('link[href*="main.css"]').getAttribute('href') || '').replace(/assets\/css\/main\.css.*/, '');

  /* ---- reveal allo scroll + contatori + onde ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).concat(e.target.hasAttribute('data-count') ? [e.target] : []).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .18 });
  $$('.anim-reveal, .hero-title, .section-wave').forEach(function (el) { io.observe(el); });

  function countUp(el) {
    var raw = el.getAttribute('data-count');
    if (!/^\d+$/.test(raw) || reduce) return;
    var target = +raw, t0 = null;
    (function step(t) {
      t0 = t0 || t;
      var p = Math.min((t - t0) / 1400, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* ---- navbar: nascondi scorrendo in giù + back-to-top ---- */
  var navbar = $('.navbar'), lastY = 0, toTop = $('[data-back-to-top]');
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (navbar) navbar.classList.toggle('is-hidden', y > lastY && y > 160);
    if (toTop) toTop.classList.toggle('show', y > 600);
    lastY = y;
    scrubQuote();
  }, { passive: true });
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---- offcanvas (menu / ricerca) ---- */
  function openOffcanvas(id) {
    var o = document.getElementById(id); if (!o) return;
    o.classList.add('open'); o.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (id === 'search') { loadIndex(); setTimeout(function () { var i = $('[data-search-input]'); if (i) i.focus(); }, 300); }
  }
  function closeOffcanvas() {
    $$('.offcanvas.open').forEach(function (o) { o.classList.remove('open'); o.setAttribute('aria-hidden', 'true'); });
    document.body.style.overflow = '';
  }
  $$('[data-toggle="offcanvas"]').forEach(function (b) { b.addEventListener('click', function () { openOffcanvas(b.dataset.target); }); });
  $$('[data-dismiss="offcanvas"]').forEach(function (b) { b.addEventListener('click', closeOffcanvas); });
  $$('.offcanvas-nav a').forEach(function (a) { a.addEventListener('click', closeOffcanvas); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOffcanvas();
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openOffcanvas('search'); }
  });

  /* ---- ricerca live (legge /search.json) ---- */
  var index = null, labels = {}, box = $('[data-search-labels]');
  try { labels = JSON.parse((box && box.getAttribute('data-search-labels')) || '{}'); } catch (err) {}
  function loadIndex() {
    if (index) return;
    fetch(base + 'search.json').then(function (r) { return r.json(); }).then(function (d) { index = d; });
  }
  var searchInput = $('[data-search-input]');
  if (searchInput) searchInput.addEventListener('input', function (e) {
    var q = e.target.value.trim().toLowerCase(), ul = $('[data-search-results]');
    ul.innerHTML = '';
    if (!q || !index) return;
    index.filter(function (i) { return (i.title + ' ' + i.text).toLowerCase().indexOf(q) > -1; }).slice(0, 8).forEach(function (i) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + i.url + '"><span></span><small>' + (labels[i.type] || i.type) + '</small></a>';
      li.querySelector('span').textContent = i.title;
      ul.appendChild(li);
    });
    if (!ul.children.length) ul.innerHTML = '<li style="padding:14px 4px;opacity:.7">Nessun risultato.</li>';
  });

  /* ---- carousel: frecce, barra, trascinamento ---- */
  var car = $('[data-carousel]');
  if (car) {
    var bar = $('[data-carousel-progress]');
    var step = function () { return car.firstElementChild.offsetWidth + 20; };
    $('[data-carousel-prev]').addEventListener('click', function () { car.scrollBy({ left: -step(), behavior: 'smooth' }); });
    $('[data-carousel-next]').addEventListener('click', function () { car.scrollBy({ left: step(), behavior: 'smooth' }); });
    var upd = function () {
      var max = car.scrollWidth - car.clientWidth, w = car.clientWidth / car.scrollWidth * 100;
      bar.style.width = w + '%'; bar.style.marginLeft = (max ? car.scrollLeft / max * (100 - w) : 0) + '%';
    };
    car.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
    var down = false, sx = 0, sl = 0, moved = false;
    car.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = car.scrollLeft; });
    window.addEventListener('pointermove', function (e) {
      if (!down) return; var dx = e.clientX - sx;
      if (Math.abs(dx) > 5) { moved = true; car.classList.add('is-dragging'); }
      car.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () { down = false; car.classList.remove('is-dragging'); });
    car.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
  }

  /* ---- frase che si illumina parola per parola ---- */
  var quote = $('[data-scrub]'), words = [];
  if (quote) {
    words = quote.textContent.trim().split(/\s+/).map(function (w) {
      var s = document.createElement('span'); s.className = 'word'; s.textContent = w; return s;
    });
    quote.textContent = '';
    words.forEach(function (s, i) { quote.appendChild(s); if (i < words.length - 1) quote.appendChild(document.createTextNode(' ')); });
  }
  function scrubQuote() {
    if (!quote) return;
    var r = quote.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(Math.max((vh * .85 - r.top) / (vh * .5), 0), 1);
    var n = Math.round(p * words.length);
    words.forEach(function (s, i) { s.classList.toggle('on', i < n || reduce); });
  }
  scrubQuote();

  /* ---- filtri con #hash (data-filter-group / data-filter-items) ---- */
  $$('[data-filter-group]').forEach(function (group) {
    var items = $$('[data-filter-items] > *'), empty = $('.empty-state');
    var chips = $$('[data-filter]', group);
    function apply(f) {
      var shown = 0;
      chips.forEach(function (c) { c.classList.toggle('badge-active', c.dataset.filter === f); });
      items.forEach(function (it) {
        var ok = f === 'all' || it.dataset.category === f; it.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { apply(c.dataset.filter); history.replaceState(null, '', c.dataset.filter === 'all' ? location.pathname : '#' + c.dataset.filter); });
    });
    var h = location.hash.slice(1);
    apply(chips.some(function (c) { return c.dataset.filter === h; }) ? h : 'all');
  });

  /* ---- tilt 3D sulle card + parallax del titolo hero ---- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(700px) rotateY(' + x * 8 + 'deg) rotateX(' + -y * 8 + 'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
    var st = $('[data-parallax]');
    document.addEventListener('mousemove', function (e) {
      if (!st || !st.classList.contains('in')) return;
      st.style.transform = 'rotate(' + (-1.6 + (e.clientX / innerWidth - .5) * 2) + 'deg) translateY(' + (e.clientY / innerHeight - .5) * 6 + 'px)';
    });
  }

  /* ---- messaggio form inviato (?ok=1) ---- */
  if (/[?&]ok=1/.test(location.search)) { var ok = $('.alert-success'); if (ok) ok.hidden = false; }
})();
