/* global React */
const { useState, useEffect, useRef } = React;

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

const Eyebrow = ({ children, style }) => (
  <span className="cs-eyebrow" style={style}>{children}</span>
);

const PillButton = ({ children, variant = "primary", size = "md", onClick, as = "button" }) => {
  const cls = `cs-btn cs-btn--${variant} cs-btn--${size}`;
  const Tag = as;
  return <Tag className={cls} onClick={onClick}>{children}</Tag>;
};

const Stat = ({ icon, label }) => (
  <div className="cs-stat">
    <div className="cs-stat__icon">{icon}</div>
    <div className="cs-stat__label">{label}</div>
  </div>
);

// Outline icons — Lucide-style, 1.5px stroke
const Icon = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  cart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-2 11H8z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.5 6 6.5.5-5 4.5L17.5 21 12 17.5 6.5 21l1.5-7-5-4.5L9.5 9z"/></svg>,
  package: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5v9l-9 5-9-5z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v9"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h11v9H2z"/><path d="M13 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>,
  chevL: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
};

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav className={`cs-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="cs-nav__inner">
        <a className="cs-nav__logo" href="#">Chair Solutions</a>
        <div className="cs-nav__links">
          <a href="#">Shop</a>
          <a href="#">Markets</a>
          <a href="#">Trade &amp; commercial</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="cs-nav__icons">
          <button aria-label="Search" className="cs-iconbtn">{Icon.search}</button>
          <button aria-label="Account" className="cs-iconbtn">{Icon.user}</button>
          <button aria-label="Cart" className="cs-iconbtn">{Icon.cart}</button>
        </div>
      </div>
    </nav>
  );
};

// ---------------------------------------------------------------------------
// Product card
// ---------------------------------------------------------------------------

const ProductCard = ({ image, eyebrow, name, fromPrice, badge, rating }) => (
  <article className="cs-product">
    <div className="cs-product__img">
      <img src={image} alt="" loading="lazy" />
      {badge && <span className="cs-product__badge">{badge}</span>}
      {rating && (
        <span className="cs-product__rating">
          <span className="cs-product__rating-icon">{Icon.star}</span>
          {rating}
        </span>
      )}
    </div>
    <div className="cs-product__meta">
      <span className="cs-product__eyebrow">Chair Solutions · NZ</span>
      <span className="cs-product__name">{name}</span>
      <span className="cs-product__price">From <strong>{fromPrice}</strong></span>
    </div>
  </article>
);

// ---------------------------------------------------------------------------
// Market tile
// ---------------------------------------------------------------------------

const MarketTile = ({ image, name, count }) => (
  <a href="#" className="cs-market">
    <div className="cs-market__img"><img src={image} alt="" /></div>
    <div className="cs-market__meta">
      <span className="cs-market__name">{name}</span>
      <span className="cs-market__count">{count}</span>
    </div>
  </a>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const Footer = () => (
  <footer className="cs-footer">
    <div className="cs-footer__inner">
      <div className="cs-footer__brand">
        <div className="cs-footer__logo">Chair Solutions</div>
        <p>Commercial seating, made in New Zealand for fifty years. Specified across healthcare, hospitality, education, government and commercial spaces.</p>
        <div className="cs-footer__address">
          <div>114 Maui Street · Te Rapa</div>
          <div>Hamilton 3200 · New Zealand</div>
          <div>+64 7 849 0123</div>
        </div>
      </div>
      <div className="cs-footer__cols">
        <div>
          <span className="cs-footer__h">Markets</span>
          <a href="#">Commercial</a>
          <a href="#">Government</a>
          <a href="#">Hospitality</a>
          <a href="#">Education</a>
          <a href="#">Healthcare</a>
        </div>
        <div>
          <span className="cs-footer__h">Range</span>
          <a href="#">Task &amp; office</a>
          <a href="#">Soft seating</a>
          <a href="#">Stack &amp; café</a>
          <a href="#">Boardroom</a>
          <a href="#">Made-to-order</a>
        </div>
        <div>
          <span className="cs-footer__h">Trade</span>
          <a href="#">Request a quote</a>
          <a href="#">Order samples</a>
          <a href="#">Download catalogue</a>
          <a href="#">Specifier portal</a>
          <a href="#">Reseller login</a>
        </div>
        <div>
          <span className="cs-footer__h">Company</span>
          <a href="#">About</a>
          <a href="#">Our factory</a>
          <a href="#">Sustainability</a>
          <a href="#">Press</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
    <div className="cs-footer__base">
      <span>© Chair Solutions Ltd 1976–2026. Made in Hamilton, Aotearoa.</span>
      <div className="cs-footer__legal">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Warranty</a>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Eyebrow, PillButton, Stat, Icon, Nav, ProductCard, MarketTile, Footer });
