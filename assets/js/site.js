/* Long Valley Wrestling — small progressive-enhancement helpers.
   No dependencies. Everything degrades gracefully without JS. */
(function () {
  'use strict';

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Back-to-top */
  var top = document.querySelector('.to-top');
  if (top) {
    var onScroll = function () {
      top.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Photo carousel */
  document.querySelectorAll('.carousel').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = track ? track.children : [];
    if (!track || slides.length < 2) return;

    var i = 0;
    var dotWrap = root.querySelector('.carousel-dots');
    var dots = [];

    if (dotWrap) {
      for (var n = 0; n < slides.length; n++) {
        (function (index) {
          var b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', 'Photo ' + (index + 1));
          b.addEventListener('click', function () { go(index); });
          dotWrap.appendChild(b);
          dots.push(b);
        })(n);
      }
    }

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach(function (d, k) {
        d.setAttribute('aria-selected', String(k === i));
      });
    }

    var prev = root.querySelector('.prev');
    var next = root.querySelector('.next');
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });

    /* Auto-advance, paused on hover and when the tab is hidden */
    var timer = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function start() { if (!reduce && !timer) timer = setInterval(function () { go(i + 1); }, 5500); }
    function stop() { clearInterval(timer); timer = null; }
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
    go(0);
    start();
  });

  /* Horizontal parallax on the "Fear the Pack / Embrace the challenge" rows.
     The rows drift apart as the section passes the viewport centre. RATE is
     px of travel per px of scroll, measured off the original: the top row
     moves ~0.033 and the bottom ~0.095, so the lower row leads. */
  var slogan = document.querySelector('.slogan');
  var rows = slogan ? slogan.querySelectorAll('.slogan-row') : [];
  if (slogan && rows.length === 2 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    var RATE  = [0.033, -0.095];
    var LIMIT = [34, 84];          /* px, so it settles rather than running away */
    var ticking = false;

    function place() {
      ticking = false;
      var r = slogan.getBoundingClientRect();
      /* distance from the section's centre to the viewport's; 0 when centred */
      var d = (r.top + r.height / 2) - (window.innerHeight / 2);
      for (var i = 0; i < rows.length; i++) {
        var x = RATE[i] * d;
        if (x >  LIMIT[i]) x =  LIMIT[i];
        if (x < -LIMIT[i]) x = -LIMIT[i];
        rows[i].style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(place);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    place();
  }

  /* Typewriter on the CTA headline */
  var head = document.querySelector('.cta-head');
  if (head && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var caret = head.querySelector('.caret');
    var full = head.textContent.trim();

    /* The headline stays in the DOM until the observer actually fires, so a
       JS failure or a browser without IntersectionObserver still shows it. */
    var shown = false;
    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || shown) return;
        shown = true;
        var out = document.createElement('span');
        head.textContent = '';
        head.appendChild(out);
        if (caret) head.appendChild(caret);
        var k = 0;
        (function tick() {
          out.textContent = full.slice(0, k++);
          if (k <= full.length) setTimeout(tick, 45);
        })();
      });
    }, { threshold: 0.4 });
    io.observe(head);
  }
})();
