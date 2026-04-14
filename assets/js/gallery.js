// Lightweight gallery lightbox — no dependencies.
(function () {
  var imgs = document.querySelectorAll('.gallery-item img');
  if (!imgs.length) return;

  var labels = {
    fr: { close: 'Fermer', prev: 'Précédente', next: 'Suivante' },
    en: { close: 'Close', prev: 'Previous', next: 'Next' },
    es: { close: 'Cerrar', prev: 'Anterior', next: 'Siguiente' },
    de: { close: 'Schließen', prev: 'Zurück', next: 'Weiter' }
  };
  var lang = (document.documentElement.lang || 'fr').slice(0, 2);
  var L = labels[lang] || labels.fr;

  var photos = Array.prototype.map.call(imgs, function (img) {
    var cap = img.nextElementSibling;
    return {
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
      caption: cap && cap.tagName === 'FIGCAPTION' ? cap.textContent : (img.getAttribute('alt') || '')
    };
  });

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML =
    '<button class="lightbox-btn lightbox-close" aria-label="' + L.close + '">\u00d7</button>' +
    '<button class="lightbox-btn lightbox-prev" aria-label="' + L.prev + '">\u2039</button>' +
    '<img class="lightbox-img" alt="" />' +
    '<button class="lightbox-btn lightbox-next" aria-label="' + L.next + '">\u203a</button>' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(box);

  var bigImg = box.querySelector('.lightbox-img');
  var bigCap = box.querySelector('.lightbox-caption');
  var idx = 0;

  function show(i) {
    idx = (i + photos.length) % photos.length;
    bigImg.src = photos[idx].src;
    bigImg.alt = photos[idx].alt;
    bigCap.textContent = photos[idx].caption;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  Array.prototype.forEach.call(imgs, function (img, i) {
    img.parentElement.addEventListener('click', function () { show(i); });
  });
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
