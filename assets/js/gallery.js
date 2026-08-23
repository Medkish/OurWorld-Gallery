(function() {
  "use strict";

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const limit = parseInt(grid.getAttribute('data-limit') || '0', 10);

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  fetch('assets/data/gallery.json')
    .then(response => {
      if (!response.ok) throw new Error('Gallery data unavailable');
      return response.json();
    })
    .then(data => {
      let pictures = data.pictures || [];
      if (limit > 0) pictures = pictures.slice(0, limit);

      grid.innerHTML = pictures.map(p => `
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="gallery-item h-100">
            <img src="${escapeHtml(p.image)}" class="img-fluid" alt="${escapeHtml(p.title)}">
            <div class="gallery-links d-flex align-items-center justify-content-center">
              <a href="${escapeHtml(p.image)}" title="${escapeHtml(p.title)}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
            </div>
          </div>
        </div>`).join('');

      if (typeof window.initGlightbox === 'function') window.initGlightbox();
      if (typeof AOS !== 'undefined' && AOS.refreshHard) AOS.refreshHard();
    })
    .catch(() => {
      grid.innerHTML = '<div class="col-12 text-center"><p class="mb-0">Gallery could not be loaded. Please refresh the page.</p></div>';
    });
})();
