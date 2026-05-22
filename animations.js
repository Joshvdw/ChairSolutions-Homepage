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
  const heroRule = document.querySelector('.hero__rule');
  const metrics  = document.querySelectorAll('.trust__metric');

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

    if (heroRule) {
      animate(heroRule,
        { opacity: [0, 1] },
        { duration: 0.6, delay: 1.3, easing: EXPO }
      );
    }

    if (metrics.length) {
      animate(metrics,
        { transform: ['translateY(1.5rem)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 1, delay: stagger(0.1, { start: 1.3 }), easing: EXPO }
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

  document.querySelectorAll('.nav__item > a').forEach(link => {
    link.addEventListener('mousemove', e => {
      const r = link.getBoundingClientRect();
      const x = ((e.clientX - (r.left + r.width  / 2)) / r.width)  * STRENGTH;
      const y = ((e.clientY - (r.top  + r.height / 2)) / r.height) * STRENGTH;
      animate(link, { x, y }, { duration: 1.5, easing: spring() });
    });
    link.addEventListener('mouseleave', () => {
      animate(link, { x: 0, y: 0 }, { duration: 1.5, easing: spring() });
    });
  });
}

// ─── 5. Mega menu — Motion One open/close ────────────────────────────────────

function initMegaMenu() {
  const mega  = document.getElementById('megaProducts');
  const panel = mega?.querySelector('.mega__panel');
  const tiles = mega?.querySelectorAll('.mega__tile');
  if (!mega || !panel) return;

  new MutationObserver(() => {
    if (mega.classList.contains('is-open')) {
      animate(panel,
        { transform: ['translateY(-16px)', 'translateY(0)'], opacity: [0, 1] },
        { duration: 0.4, easing: [0.7, 0, 0.2, 1] }
      );
      if (tiles?.length) {
        animate(tiles,
          { transform: ['translateY(10px)', 'translateY(0)'], opacity: [0, 1] },
          { duration: 0.45, delay: stagger(0.04, { start: 0.06 }), easing: [0.075, 0.82, 0.165, 1] }
        );
      }
    } else {
      animate(panel, { opacity: [1, 0] }, { duration: 0.2, easing: [0.7, 0, 0.2, 1] });
    }
  }).observe(mega, { attributes: true, attributeFilter: ['class'] });
}

// ─── 6. Scroll reveals ───────────────────────────────────────────────────────

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
  grid.querySelectorAll('.product').forEach((card, i) => {
    const wrap = card.querySelector('.product__img');
    if (!wrap || wrap.querySelector('.product__hover-img')) return;

    const hoverSrc = PRODUCT_IMGS[(i + 1) % PRODUCT_IMGS.length];
    const hoverImg = document.createElement('img');
    hoverImg.className = 'product__hover-img';
    hoverImg.src = hoverSrc;
    hoverImg.alt = '';

    // Insert after primary img, before the tag
    const tag = wrap.querySelector('.product__tag');
    wrap.insertBefore(hoverImg, tag || null);

    if (TOUCH || REDUCED) return;

    card.addEventListener('mouseenter', () => {
      animate(hoverImg, { opacity: [0, 1] }, { duration: 0.9, easing: EXPO });
    });
    card.addEventListener('mouseleave', () => {
      animate(hoverImg, { opacity: [1, 0] }, { duration: 0.7, easing: FILL_EASE });
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

// ─── 8. Market card crossfade hover ──────────────────────────────────────────

const MARKET_HOVER = {
  'boardroom.webp':   'assets/photos/healthcare.webp',
  'healthcare.webp':  'assets/photos/hospitality.webp',
  'hospitality.webp': 'assets/photos/boardroom.webp',
  'education.webp':   'assets/photos/soft-seating.webp',
  'soft-seating.webp':'assets/photos/education.webp',
};

function initMarketHover() {
  document.querySelectorAll('.market').forEach(card => {
    const primaryImg = card.querySelector('.market__img');
    if (!primaryImg) return;

    const filename = primaryImg.getAttribute('src').split('/').pop();
    const hoverSrc = MARKET_HOVER[filename];
    if (!hoverSrc) return;

    const hoverImg = document.createElement('img');
    hoverImg.className = 'market__hover-img';
    hoverImg.src = hoverSrc;
    hoverImg.alt = '';

    // Insert after primary img — scrim and body remain on top via z-index in CSS
    primaryImg.after(hoverImg);

    if (TOUCH || REDUCED) return;

    card.addEventListener('mouseenter', () => {
      animate(hoverImg, { opacity: [0, 1] }, { duration: 0.9, easing: EXPO });
    });
    card.addEventListener('mouseleave', () => {
      animate(hoverImg, { opacity: [1, 0] }, { duration: 0.7, easing: FILL_EASE });
    });
  });
}

// ─── 9. Parallax — scroll-linked backgrounds ─────────────────────────────────

function initParallax() {
  if (REDUCED) return;

  const hero   = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero__bg');
  if (hero && heroBg) {
    scroll(
      animate(heroBg, { transform: ['scale(1)', 'scale(1.12)'] }, { easing: 'linear' }),
      { target: hero, offset: ['start start', 'end start'] }
    );
  }

  const sus   = document.querySelector('.sustainability');
  const susBg = document.querySelector('.sustainability__bg');
  if (sus && susBg) {
    scroll(
      animate(susBg,
        { transform: ['scale(1.15) translateY(-8%)', 'scale(1.15) translateY(8%)'] },
        { easing: 'linear' }
      ),
      { target: sus, offset: ['start end', 'end start'] }
    );
  }

  const final   = document.querySelector('.final');
  const finalBg = document.querySelector('.final__bg');
  if (final && finalBg) {
    scroll(
      animate(finalBg,
        { transform: ['scale(1.15) translateY(-8%)', 'scale(1.15) translateY(8%)'] },
        { easing: 'linear' }
      ),
      { target: final, offset: ['start end', 'end start'] }
    );
  }
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
  const viewAll = document.querySelector('.chips-row .link-arrow');
  if (viewAll) {
    viewAll.style.opacity = '0';
    inView(viewAll, () => {
      animate(viewAll, { opacity: [0, 1] }, { duration: 1, easing: EXPO });
    }, { margin: '0px 0px -30px 0px' });
  }
}

// ─── INIT ────────────────────────────────────────────────────────────────────

initNavEntrance();
initHeroEntrance();
initButtonFills();
initMagnetNav();
initMegaMenu();
initScrollReveals();
initProductGrid();
initMarketHover();
// Delay parallax until hero entrance animation is complete to avoid transform conflicts
setTimeout(initParallax, 2600);
initCollage();
initProductsHeader();
