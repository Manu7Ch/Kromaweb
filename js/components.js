/* ============================================================
   KROMA — components.js
   Templates de Header (Navbar) y Footer
   Se inyectan en #site-header y #site-footer de cada página
   ============================================================ */

(function () {

  /* ── Detectar página activa ─────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function active(page) {
    return currentPage === page ? ' active' : '';
  }

  /* ── TEMPLATE: HEADER ───────────────────────────────────── */
  const headerHTML = `
    <header class="navbar" role="banner">
      <div class="navbar__inner">

        <a href="index.html" class="navbar__logo" aria-label="Kroma — inicio">
          <img src="img/logo-kroma.png" alt="Kroma" height="40" />
        </a>

        <nav class="navbar__nav" aria-label="Navegación principal">
          <a href="index.html"       class="navbar__link${active('index.html')}">Inicio</a>
          <a href="servicios.html"   class="navbar__link${active('servicios.html')}">Servicios</a>
          <a href="portafolio.html"  class="navbar__link${active('portafolio.html')}">Portafolio</a>
          <a href="inspiracion.html" class="navbar__link${active('inspiracion.html')}">Inspiración</a>
          <a href="contacto.html"    class="navbar__cta${active('contacto.html')}">Cotizar</a>
        </nav>

        <button class="navbar__hamburger"
                aria-label="Abrir menú"
                aria-expanded="false"
                aria-controls="site-mobile-menu">
          <span></span><span></span><span></span>
        </button>

      </div>
    </header>

    <nav id="site-mobile-menu" class="navbar__mobile-menu" aria-label="Menú móvil">
      <a href="index.html"       class="navbar__mobile-link${active('index.html')}">Inicio</a>
      <a href="servicios.html"   class="navbar__mobile-link${active('servicios.html')}">Servicios</a>
      <a href="portafolio.html"  class="navbar__mobile-link${active('portafolio.html')}">Portafolio</a>
      <a href="inspiracion.html" class="navbar__mobile-link${active('inspiracion.html')}">Inspiración</a>
      <a href="contacto.html"    class="navbar__mobile-cta">Cotizar ahora</a>
    </nav>
  `;

  /* ── TEMPLATE: FOOTER ───────────────────────────────────── */
  const footerHTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">

          <div>
            <div class="footer__brand-name">Kr<span>&#9679;</span>ma</div>
            <p class="footer__tagline">De idea a identidad</p>
            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">📍</span>
              Piura, Perú
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">📞</span>
              961 171 186
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">✉</span>
              Kroma062026@gmail.com
            </div>
            <div class="footer__contact-item">
              <span class="footer__contact-icon" aria-hidden="true">🕐</span>
              Lun–Vie 8:00–17:00 · Sáb 9:00–12:00
            </div>
          </div>

          <div>
            <p class="footer__col-title">Navegación</p>
            <a href="index.html"       class="footer__link">Inicio</a>
            <a href="servicios.html"   class="footer__link">Servicios / Paquetes</a>
            <a href="portafolio.html"  class="footer__link">Portafolio</a>
            <a href="inspiracion.html" class="footer__link">Inspiración</a>
            <a href="contacto.html"    class="footer__link">Contacto</a>
          </div>

          <div>
            <p class="footer__col-title">Paquetes</p>
            <a href="servicios.html#basico"   class="footer__link">Básico</a>
            <a href="servicios.html#estandar" class="footer__link">Estándar</a>
            <a href="servicios.html#premium"  class="footer__link">Premium</a>
            <a href="contacto.html"           class="footer__link">Cotización personalizada</a>
          </div>

        </div>

        <div class="footer__bottom">
          <p class="footer__copy">© ${new Date().getFullYear()} Kroma. Todos los derechos reservados.</p>
          <div class="footer__bottom-links">
            <a href="#">Política de privacidad</a>
            <a href="#">Términos de uso</a>
          </div>
        </div>

      </div>
    </footer>
  `;

  /* ── Inyectar en el DOM ─────────────────────────────────── */
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) headerSlot.innerHTML = headerHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

})();
