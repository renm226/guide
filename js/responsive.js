/**
 * ApexProtocol — Responsive JS
 
 * Adds:
 *  - Mobile sidebar drawer (hamburger toggle)
 *  - Mobile bottom navigation bar (area switcher)
 *  - Swipe-to-close sidebar
 *  - Auto-close sidebar on phase click (mobile)
 */

(function () {
  'use strict';

  const AREAS = [
    { id: 'ai',      name: '◈ AI / ML' },
    { id: 'net',     name: '⬡ Networking' },
    { id: 'hack',    name: '⚡ Hacking' },
    { id: 'soft',    name: '⎄ Software' },
    { id: 'crypto',  name: '⛓ Blockchain' },
    { id: 'cloud',   name: '☁ Cloud' },
    { id: 'mobile',  name: '📱 Mobile' },
    { id: 'devsec',  name: '🛡 DevSecOps' },
    { id: 'selfdev', name: '🌟 Self Dev' },
  ];

  /* ── BUILD MOBILE BOTTOM NAV ──────────────────────────── */
  function buildMobileNav() {
    const inner = document.getElementById('mobNavInner');
    if (!inner) return;

    inner.innerHTML = AREAS.map(area =>
      `<button
        class="mob-nav-pill${area.id === (window._currentArea || 'ai') ? ' active' : ''}"
        data-area="${area.id}"
        onclick="window.switchArea('${area.id}')"
      >${area.name}</button>`
    ).join('');
  }

  /* ── SYNC BOTTOM NAV ACTIVE STATE ─────────────────────── */
  function syncMobileNav(areaId) {
    document.querySelectorAll('.mob-nav-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-area') === areaId);
    });

    // Scroll the active pill into view on the bottom nav
    const active = document.querySelector(`.mob-nav-pill[data-area="${areaId}"]`);
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  /* ── SIDEBAR DRAWER ───────────────────────────────────── */
  function openMobileSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const menuBtn  = document.getElementById('mobMenuBtn');
    if (!sidebar) return;

    sidebar.classList.add('mob-open');
    if (overlay)  overlay.classList.add('show');
    if (menuBtn)  menuBtn.textContent = '✕';
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  }

  function closeMobileSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const menuBtn  = document.getElementById('mobMenuBtn');
    if (!sidebar) return;

    sidebar.classList.remove('mob-open');
    if (overlay)  overlay.classList.remove('show');
    if (menuBtn)  menuBtn.textContent = '☰';
    document.body.style.overflow = '';
  }

  function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.contains('mob-open')
      ? closeMobileSidebar()
      : openMobileSidebar();
  }

  /* ── SWIPE-TO-CLOSE SIDEBAR ───────────────────────────── */
  function attachSwipeToClose() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    let startX = 0;
    let startY = 0;

    sidebar.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    sidebar.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = Math.abs(e.changedTouches[0].clientY - startY);
      // Swipe left ≥ 60px, horizontal (dy < 50)
      if (dx < -60 && dy < 50) closeMobileSidebar();
    }, { passive: true });
  }

  /* ── PATCH switchArea TO ALSO SYNC MOBILE NAV ─────────── */
  function patchSwitchArea() {
    const original = window.switchArea;
    if (!original) return;

    window.switchArea = function (areaId) {
      window._currentArea = areaId;
      original(areaId);
      syncMobileNav(areaId);
      // Auto-close sidebar when user picks an area on mobile
      if (window.innerWidth <= 640) closeMobileSidebar();
    };
  }

  /* ── PATCH scrollToPhase TO CLOSE SIDEBAR ON MOBILE ───── */
  function patchScrollToPhase() {
    const original = window.scrollToPhase;
    if (!original) return;

    window.scrollToPhase = function (phaseIdx) {
      original(phaseIdx);
      if (window.innerWidth <= 640) {
        // Small delay so the scroll starts before sidebar closes
        setTimeout(closeMobileSidebar, 120);
      }
    };
  }

  /* ── CLOSE MODALS ON BACK SWIPE (Android) ─────────────── */
  function handlePopState() {
    ['exportModal', 'coffeeModal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal && modal.classList.contains('show')) {
        window.closeModal(id);
      }
    });
  }

  /* ── KEYBOARD: ESC closes sidebar ─────────────────────── */
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeMobileSidebar();
    }
  }

  /* ── INIT ─────────────────────────────────────────────── */
  function init() {
    // Set initial current area tracker
    window._currentArea = 'ai';

    // Build mobile bottom nav
    buildMobileNav();

    // Wire hamburger button
    const menuBtn = document.getElementById('mobMenuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', toggleMobileSidebar);
    }

    // Swipe to close sidebar
    attachSwipeToClose();

    // Patch core functions
    // Use a short delay to ensure main.js has finished setting window.* functions
    setTimeout(() => {
      patchSwitchArea();
      patchScrollToPhase();
    }, 100);

    // Back button / popstate
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('keydown', handleKeydown);

    // Expose closeMobileSidebar globally (used in HTML onclick on overlay)
    window.openMobileSidebar  = openMobileSidebar;
    window.closeMobileSidebar = closeMobileSidebar;

    // Sync nav on window resize (going from mobile → desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) closeMobileSidebar();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
