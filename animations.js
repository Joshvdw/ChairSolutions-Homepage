/**
 * Chair Solutions — Animation Layer
 * Implements wvh.co.nz animation spec using Motion One
 */

const { animate, scroll, inView, spring, stagger } = window.Motion;

// ─── Global flags ────────────────────────────────────────────────────────────

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH   = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const EXPO      = [0.16, 1, 0.3, 1];  // expo-out, matches spec
const FILL_EASE    = [0.4, 0, 0.6, 1];  // ease-in-out — same curve for enter and exit
const FILL_DUR_IN  = 0.4;               // enter: shorter travel distance so shorter duration matches exit feel
const FILL_DUR_OUT = 0.8;               // exit: full travel distance

// ─── Utility ─────────────────────────────────────────────────────────────────

function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map(w => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`)
    .join(' ');
  return Array.from(el.querySelectorAll('.word-inner'));
}

// ─── 1. NAV entrance ─────────────────────────────────────────────────────────

function initNavEntrance() {
  if (REDUCED) return;
  const nav = document.getElementById('nav');
  if (!nav) return;
  animate(nav,
    { opacity: [0, 1], transform: ['translateY(-16px)', 'translateY(0)'] },
    { duration: 0.8, delay: 0.4, easing: EXPO }
  );
}

// ─── 2. Hero page-load entrance ──────────────────────────────────────────────

function initHeroEntrance() {
  if (REDUCED) return;

  const video   = document.querySelector('.hero__bg');
  const eyebrow = document.querySelector('.hero__eyebrow');
  const heading = document.querySelector('.hero__h');
  const sub     = document.querySelector('.hero__sub');
  const ctas        = document.querySelectorAll('.hero__ctas .btn');

  // Video: CSS can't set the initial transform, so do it here synchronously
  if (video) {
    video.style.opacity = '0';
    video.style.transform = 'scale(1.3)';
  }

  // Split the heading synchronously so word spans exist before the first paint.
  // Then make the parent visible — the spans themselves start hidden and animate in.
  let words = [];
  if (heading) {
    words = splitWords(heading);
    words.forEach(w => { w.style.opacity = '0'; w.style.transform = 'translateY(90%)'; });
    heading.style.opacity = '1';
  }

  requestAnimationFrame(() => {
    if (video) {
      animate(video,
        { transform: ['scale(1.3)', 'scale(1)'], opacity: [0, 1] },
        { duration: 2.4, easing: EXPO }
      );
    }

    if (eyebrow) {
      animate(eyebrow,
        { opacity: [0, 1] },
        { duration: 1.4, delay: 0.5, easing: EXPO }
      );
    }

    words.forEach((w, i) => {
      animate(w,
        { transform: ['translateY(90%)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1, delay: 0.6 + i * 0.04, easing: EXPO }
      );
    });

    if (sub) {
      animate(sub,
        { transform: ['translateY(2rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1.4, delay: 0.9, easing: EXPO }
      );
    }

    if (ctas.length) {
      animate(ctas,
        { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1, delay: stagger(0.08, { start: 1.1 }), easing: EXPO }
      );
    }
  });
}

// ─── 3. Button fill hover (HoverButton) ──────────────────────────────────────

function initButtonFills() {
  if (TOUCH) return;

  document.querySelectorAll(
    '.btn--primary, .btn--outline, .btn--ghost-light, .btn--on-dark, .btn--umber'
  ).forEach(btn => {
    // Wrap all existing content so text nodes get z-index from .btn__content
    const content = document.createElement('span');
    content.className = 'btn__content';
    while (btn.firstChild) content.appendChild(btn.firstChild);
    btn.appendChild(content);

    const fill = document.createElement('span');
    fill.className = 'btn__fill';
    fill.setAttribute('aria-hidden', 'true');
    btn.insertBefore(fill, content);

    // Mark button so CSS can suppress its own hover background-color (fill handles it)
    btn.classList.add('has-js-fill');

    // Oval fill: always enters from below, exits upward
    btn.addEventListener('mouseenter', () => {
      animate(fill,
        { transform: ['translate(-50%, 15%)', 'translate(-50%, -50%)'] },
        { duration: FILL_DUR_IN, easing: FILL_EASE }
      );
    });
    btn.addEventListener('mouseleave', () => {
      animate(fill,
        { transform: 'translate(-50%, -200%)' },
        { duration: FILL_DUR_OUT, easing: FILL_EASE }
      );
    });
  });
}

// ─── 4. Magnet effect — nav links ────────────────────────────────────────────

function initMagnetNav() {
  if (TOUCH || REDUCED) return;
  const STRENGTH = 5;
  const SPRING = spring();

  document.querySelectorAll('.nav__item > a').forEach(link => {
    let rect = link.getBoundingClientRect();
    link.addEventListener('mouseenter', () => { rect = link.getBoundingClientRect(); });
    link.addEventListener('mousemove', e => {
      const x = ((e.clientX - (rect.left + rect.width  / 2)) / rect.width)  * STRENGTH;
      const y = ((e.clientY - (rect.top  + rect.height / 2)) / rect.height) * STRENGTH;
      animate(link, { x, y }, { duration: 1.5, easing: SPRING });
    });
    link.addEventListener('mouseleave', () => {
      animate(link, { x: 0, y: 0 }, { duration: 1.5, easing: SPRING });
    });
  });
}

// ─── 5. Simple dropdowns — Motion One stagger open/close ─────────────────────

function initDropdowns() {
  if (REDUCED) return;

  const DD_EASE   = [0.7, 0, 0.2, 1];
  const ITEM_EASE = [0.075, 0.82, 0.165, 1];

  document.querySelectorAll('.nav__item').forEach(item => {
    const dd    = item.querySelector('.dd');
    const panel = dd?.querySelector('.dd__panel');
    const links = panel ? Array.from(panel.querySelectorAll('a')) : [];
    if (!dd || !panel || !links.length) return;

    // Pre-hide links for their individual stagger entrance
    links.forEach(a => { a.style.opacity = '0'; a.style.transform = 'translateY(8px)'; });

    function openDd() {
      // Animate .dd itself — it carries opacity:0 in CSS, so we must target it directly.
      // Include translateX(-50%) in the keyframes to preserve the centering transform.
      animate(dd,
        { opacity: [0, 1], transform: ['translateX(-50%) translateY(-8px)', 'translateX(-50%) translateY(0)'] },
        { duration: 0.36, easing: DD_EASE }
      );
      animate(links,
        { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0)'] },
        { duration: 1.5, delay: stagger(0.16, { start: 0.08 }), easing: ITEM_EASE }
      );
    }

    function closeDd() {
      animate(dd, { opacity: [1, 0] }, { duration: 0.14, easing: DD_EASE });
      // Reset so next open starts from initial state
      links.forEach(a => { a.style.opacity = '0'; a.style.transform = 'translateY(8px)'; });
    }

    item.addEventListener('mouseenter', openDd);
    item.addEventListener('mouseleave', closeDd);
  });
}

// ─── 6. Mega menu — Motion One open/close ────────────────────────────────────

function initMegaMenu() {
  if (REDUCED) return;

  const trigger = document.getElementById('nav-products-item');
  const mega    = document.getElementById('megaProducts');
  const panel   = mega?.querySelector('.mega__panel');
  const tiles   = mega ? Array.from(mega.querySelectorAll('.mega__tile')) : [];
  if (!trigger || !mega || !panel) return;

  const EASE      = [0.7, 0, 0.2, 1];
  const TILE_EASE = [0.075, 0.82, 0.165, 1]; // matches spec mega-menu__item easing
  let isOpen = false;
  let closeTimer;

  // Pre-hide tiles for their stagger entrance
  tiles.forEach(t => { t.style.opacity = '0'; t.style.transform = 'translateY(14px)'; });

  function openMega() {
    clearTimeout(closeTimer);
    if (isOpen) return;
    isOpen = true;
    mega.classList.add('is-open');

    // Animate .mega itself — it carries opacity:0 in CSS, so target it directly
    animate(mega, { opacity: [0, 1] }, { duration: 0.44, easing: EASE });
    // Slide the panel separately (no opacity — mega handles fade)
    animate(panel,
      { transform: ['translateY(-12px)', 'translateY(0)'] },
      { duration: 0.7, easing: EASE }
    );
    // Stagger tiles — near-immediate start, long duration + elastic easing = fast visible
    // motion matching the reference site's mega-menu feel
    const tileAnim = animate(tiles,
      { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] },
      { duration: 1.4, delay: stagger(0.11, { start: 0.12 }), easing: TILE_EASE }
    );
    // Clear inline transform after entrance so CSS tile hover (translateY(-3px)) works
    tileAnim.finished.then(() => {
      if (isOpen) tiles.forEach(t => t.style.removeProperty('transform'));
    });
  }

  function closeMega() {
    clearTimeout(closeTimer);
    // 60ms grace period absorbs cursor crossing the bridge gap into the panel
    closeTimer = setTimeout(() => {
      if (!isOpen) return;
      isOpen = false;
      mega.classList.remove('is-open');
      animate(mega, { opacity: [1, 0] }, { duration: 0.22, easing: EASE });
      panel.style.removeProperty('transform');
      tiles.forEach(t => { t.style.opacity = '0'; t.style.transform = 'translateY(14px)'; });
    }, 60);
  }

  trigger.addEventListener('mouseenter', openMega);
  trigger.addEventListener('mouseleave', closeMega);
  mega.addEventListener('mouseenter', openMega);
  mega.addEventListener('mouseleave', closeMega);
}

// ─── 7. Scroll reveals ───────────────────────────────────────────────────────

function initScrollReveals() {
  if (REDUCED) return;

  // Section headings: split words immediately, hide word-inners (not parent)
  document.querySelectorAll('.section__h, .sustainability__h, .final__h').forEach(el => {
    if (el.closest('.hero')) return;
    const words = splitWords(el);
    words.forEach(w => { w.style.opacity = '0'; });
    inView(el, () => {
      words.forEach((w, i) => {
        animate(w,
          { transform: ['translateY(90%)', 'translateY(0)'], opacity: [0, 1] },
          { duration: 1, delay: 0.1 + i * 0.04, easing: EXPO }
        );
      });
    }, { margin: '0px 0px -60px 0px' });
  });

  // Eyebrows
  const eyebrows = Array.from(document.querySelectorAll('.eyebrow')).filter(
    el => !el.closest('.hero')
  );
  eyebrows.forEach(el => {
    el.style.opacity = '0';
    inView(el, () => {
      animate(el, { opacity: [0, 1] }, { duration: 1.2, easing: EXPO });
    }, { margin: '0px 0px -30px 0px' });
  });

  // Section sub / body text
  document.querySelectorAll('.section__sub, .sustainability__p, .final__p').forEach(el => {
    el.style.opacity = '0';
    inView(el, () => {
      animate(el,
        { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1.2, delay: 0.1, easing: EXPO }
      );
    }, { margin: '0px 0px -30px 0px' });
  });

  // Heritage copy paragraphs + CTA
  document.querySelectorAll('.heritage__copy > p, .heritage__cta').forEach((el, i) => {
    el.style.opacity = '0';
    inView(el, () => {
      animate(el,
        { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1.2, delay: i * 0.08, easing: EXPO }
      );
    }, { margin: '0px 0px -30px 0px' });
  });

  // Market cards: staggered fade-up
  const marketsWrap = document.querySelector('.markets');
  const marketCards = document.querySelectorAll('.market');
  if (marketsWrap && marketCards.length) {
    for (const c of marketCards) c.style.opacity = '0';
    inView(marketsWrap, () => {
      animate(marketCards,
        { transform: ['translateY(40px)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.7, delay: stagger(0.08), easing: EXPO }
      );
    }, { margin: '0px 0px -80px 0px' });
  }

  // Resource cards: staggered fade-up
  const resourcesWrap = document.querySelector('.resources');
  const resourceCards = document.querySelectorAll('.resource');
  if (resourcesWrap && resourceCards.length) {
    for (const c of resourceCards) c.style.opacity = '0';
    inView(resourcesWrap, () => {
      animate(resourceCards,
        { transform: ['translateY(40px)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.7, delay: stagger(0.1), easing: EXPO }
      );
    }, { margin: '0px 0px -60px 0px' });
  }

  // Sustainability credential tags
  const creds = document.querySelectorAll('.cred');
  if (creds.length) {
    for (const c of creds) c.style.opacity = '0';
    inView(creds[0], () => {
      animate(creds,
        { transform: ['translateY(1rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.6, delay: stagger(0.06), easing: EXPO }
      );
    }, { margin: '0px 0px -30px 0px' });
  }

  // Stats band — heritage metrics
  const statsGrid = document.querySelector('.stats__grid');
  const stats = document.querySelectorAll('.stat');
  if (statsGrid && stats.length) {
    for (const s of stats) s.style.opacity = '0';
    inView(statsGrid, () => {
      animate(stats,
        { transform: ['translateY(40px)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.7, delay: stagger(0.14), easing: EXPO }
      );
    }, { margin: '0px 0px -60px 0px' });
  }

  // Range chips row
  const chipsRow = document.querySelector('.chips-row');
  if (chipsRow) {
    const chips = chipsRow.querySelectorAll('.chip');
    for (const c of chips) c.style.opacity = '0';
    inView(chipsRow, () => {
      animate(chips,
        { transform: ['translateY(1rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.6, delay: stagger(0.05), easing: EXPO }
      );
    }, { margin: '0px 0px -40px 0px' });
  }

  // Final CTA buttons
  const finalCtas = document.querySelectorAll('.final__ctas .btn');
  if (finalCtas.length) {
    for (const c of finalCtas) c.style.opacity = '0';
    const finalInner = document.querySelector('.final__inner');
    if (finalInner) {
      inView(finalInner, () => {
        animate(finalCtas,
          { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
          { duration: 1, delay: stagger(0.08, { start: 0.3 }), easing: EXPO }
        );
      }, { margin: '0px 0px -60px 0px' });
    }
  }

  // Section header link arrows
  document.querySelectorAll('.section__head .link-arrow').forEach(el => {
    el.style.opacity = '0';
    inView(el, () => {
      animate(el, { opacity: [0, 1] }, { duration: 1, easing: EXPO });
    }, { margin: '0px 0px -30px 0px' });
  });

  // Footer
  const footerBrand = document.querySelector('.footer__brand');
  const footerCols  = document.querySelectorAll('.footer__col');
  if (footerBrand) {
    footerBrand.style.opacity = '0';
    inView(footerBrand, () => {
      animate(footerBrand,
        { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1, easing: EXPO }
      );
    }, { margin: '0px 0px -30px 0px' });
  }
  if (footerCols.length) {
    for (const c of footerCols) c.style.opacity = '0';
    inView(footerCols[0], () => {
      animate(footerCols,
        { transform: ['translateY(1rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.8, delay: stagger(0.06, { start: 0.1 }), easing: EXPO }
      );
    }, { margin: '0px 0px -30px 0px' });
  }
}

// ─── 7. Product grid — scroll reveal + chip switch + crossfade hover ──────────

// Cycling hover images for product cards (4 available)
const PRODUCT_IMGS = [
  'uploads/products/product-1.webp',
  'uploads/products/product-2.webp',
  'uploads/products/product-3.webp',
  'uploads/products/product-4.webp',
];

function injectProductHovers(grid) {
  if (TOUCH || REDUCED) return;

  grid.querySelectorAll('.product').forEach((card, i) => {
    const wrap = card.querySelector('.product__img');
    if (!wrap || wrap.querySelector('.product__hover-img')) return;

    const hoverSrc = PRODUCT_IMGS[(i + 1) % PRODUCT_IMGS.length];
    let hoverImg = null;

    card.addEventListener('mouseenter', () => {
      if (!hoverImg) {
        hoverImg = document.createElement('img');
        hoverImg.className = 'product__hover-img';
        hoverImg.alt = '';
        const tag = wrap.querySelector('.product__tag');
        wrap.insertBefore(hoverImg, tag || null);
        hoverImg.src = hoverSrc;
      }
      animate(hoverImg, { opacity: [0, 1] }, { duration: 0.9, easing: EXPO });
    });
    card.addEventListener('mouseleave', () => {
      if (hoverImg) animate(hoverImg, { opacity: [1, 0] }, { duration: 0.7, easing: FILL_EASE });
    });
  });
}

function animateProductItems(items) {
  if (!items.length || REDUCED) return;
  const mobile = window.innerWidth < 768;
  animate(items,
    {
      transform: [mobile ? 'translateY(30px)' : 'translateY(50px)', 'translateY(0)'],
      opacity:   [0, 1],
    },
    {
      duration: mobile ? 0.3 : 0.5,
      delay:    stagger(mobile ? 0.05 : 0.1),
      easing:   EXPO,
    }
  );
}

function initProductGrid() {
  const grid  = document.getElementById('productGrid');
  const chips = document.querySelectorAll('.chip[data-range]');
  if (!grid || !chips.length) return;

  // Initial cards: hide then reveal when grid enters viewport
  requestAnimationFrame(() => {
    if (!REDUCED) {
      for (const item of grid.querySelectorAll('.product')) item.style.opacity = '0';
      inView(grid, () => {
        animateProductItems(grid.querySelectorAll('.product'));
      }, { margin: '0px 0px -80px 0px' });
    }
    injectProductHovers(grid);
  });

  // Chip switch: animate new items in immediately
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      requestAnimationFrame(() => {
        animateProductItems(grid.querySelectorAll('.product'));
        injectProductHovers(grid);
      });
    });
  });
}

// ─── 9. Parallax — scroll-linked backgrounds ─────────────────────────────────

function initParallax() {
  if (REDUCED) return;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  // Translate-based layers — the image drifts as its section crosses the
  // viewport. `scale` keeps the oversized image covering the frame at full
  // travel (safe travel ≈ (scale − 1) / 2 of the frame height).
  const layers = [];
  const addLayer = (elSel, containerSel, opts) => {
    const el = document.querySelector(elSel);
    const container = document.querySelector(containerSel);
    if (el && container) layers.push({ el, container, cur: 0, target: 0, ...opts });
  };

  // Gentle travel — subtle depth without obvious movement
  addLayer('.sustainability__bg', '.sustainability', { range: 4, scale: 1.16 });
  addLayer('.final__bg',          '.final',          { range: 3, scale: 1.14 });

  // Smoothing factor — lower = more easing / softer, slower catch-up
  const EASE = 0.025;

  function measure() {
    const vh = window.innerHeight;
    for (const l of layers) {
      const r = l.container.getBoundingClientRect();
      // p: −1 when the section sits just below the viewport, +1 when just above
      const p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
      l.target = -p * l.range;
    }
  }

  function frame() {
    for (const l of layers) {
      l.cur += (l.target - l.cur) * EASE;
      l.el.style.transform = `scale(${l.scale}) translateY(${l.cur.toFixed(3)}%)`;
    }
    requestAnimationFrame(frame);
  }

  measure();
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', measure);
  requestAnimationFrame(frame);
}

// ─── 10. Collage primary — zoom-out on entry ──────────────────────────────────

function initCollage() {
  if (REDUCED) return;
  const img = document.querySelector('.collage__primary img');
  if (!img) return;
  inView(img, () => {
    animate(img,
      { transform: ['scale(1.1)', 'scale(1)'] },
      { duration: 1.3, easing: EXPO }
    );
  }, { margin: '0px 0px -60px 0px' });
}

// ─── 11. Products header link arrow ───────────────────────────────────────────

function initProductsHeader() {
  if (REDUCED) return;
  const viewAll = document.querySelector('.products-header .link-arrow');
  if (viewAll) {
    viewAll.style.opacity = '0';
    inView(viewAll, () => {
      animate(viewAll, { opacity: [0, 1] }, { duration: 1, easing: EXPO });
    }, { margin: '0px 0px -30px 0px' });
  }
}

// ─── 12. Range slider — arrows, drag-to-scroll, edge state ────────────────────

function initRangeSlider() {
  const track = document.getElementById('productGrid');
  const prev  = document.getElementById('rangePrev');
  const next  = document.getElementById('rangeNext');
  if (!track) return;

  // One card unit = card width + gap, measured from real layout positions
  function unit() {
    const cards = track.querySelectorAll('.product');
    const gap   = parseFloat(getComputedStyle(track).columnGap) || 20;
    if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft;
    if (cards.length === 1) return cards[0].getBoundingClientRect().width + gap;
    return 280 + gap;
  }

  // Whole cards that fit in the viewport (the page size)
  function perPage() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    return Math.max(1, Math.floor((track.clientWidth + gap) / unit()));
  }

  // scrollLeft for the final page — the last card-aligned position that is
  // actually reachable, so the slider settles flush on a full row of cards
  // (and never bottoms out a few pixels short of the snap point).
  function lastStart() {
    const real = track.scrollWidth - track.clientWidth;
    if (real <= 0) return 0;
    return Math.floor(real / unit()) * unit();
  }

  function goTo(left) {
    track.scrollTo({ left, behavior: 'smooth' });
  }

  function update() {
    const end = lastStart();
    const scrollable = end > 4;
    if (prev) prev.disabled = !scrollable || track.scrollLeft <= 2;
    if (next) next.disabled = !scrollable || track.scrollLeft >= end - 2;
    const nav = (prev || next) && (prev || next).closest('.slider-nav');
    if (nav) nav.style.display = scrollable ? '' : 'none';
  }

  // Page on card boundaries; the last next-click snaps exactly to the final row
  prev && prev.addEventListener('click', () => {
    const u = unit();
    goTo(Math.max(0, Math.round(track.scrollLeft / u) * u - perPage() * u));
  });
  next && next.addEventListener('click', () => {
    const u = unit();
    goTo(Math.min(lastStart(), Math.round(track.scrollLeft / u) * u + perPage() * u));
  });

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // Chip switches re-render the grid — re-measure when children change
  new MutationObserver(update).observe(track, { childList: true });

  // Pointer drag-to-scroll (mouse/pen only — touch scrolls natively)
  let down = false, startX = 0, startScroll = 0, moved = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    down = true; moved = 0; startX = e.clientX; startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  track.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    track.scrollLeft = startScroll - dx;
  });
  function end() {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
  }
  track.addEventListener('pointerup', end);
  track.addEventListener('pointerleave', end);
  track.addEventListener('pointercancel', end);
  // Swallow the click that follows a real drag so cards don't navigate
  track.addEventListener('click', e => { if (moved > 6) e.preventDefault(); }, true);

  update();
}

// ─── INIT ────────────────────────────────────────────────────────────────────

initNavEntrance();
initHeroEntrance();
initButtonFills();
initMagnetNav();
initDropdowns();
initMegaMenu();
initScrollReveals();
initProductGrid();
initRangeSlider();
// Delay parallax until hero entrance animation is complete to avoid transform conflicts
setTimeout(initParallax, 2600);
initCollage();
initProductsHeader();
