/* global React, PillButton, Eyebrow, Icon, Nav, ProductCard, MarketTile, Footer, Stat */
const { useState, useEffect, useRef } = React;

// ---------------------------------------------------------------------------
// Hero — full-bleed product photography, headline centred, two pill CTAs
// ---------------------------------------------------------------------------

const Hero = () => (
  <section className="cs-hero">
    <img className="cs-hero__bg" src="../../assets/photos/hospitality.webp" alt="" />
    <div className="cs-hero__scrim"></div>
    <div className="cs-hero__inner">
      <h1 className="cs-hero__h">Commercial seating, made in New Zealand for fifty years.</h1>
      <div className="cs-hero__trust">
        <span className="cs-hero__trust-pill">★ ★ ★ ★ ★&nbsp;&nbsp;Rated 4.9 by 240+ specifiers</span>
      </div>
      <div className="cs-hero__ctas">
        <PillButton variant="primary" size="lg">Browse products</PillButton>
        <PillButton variant="ghost-light" size="lg">Order samples</PillButton>
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Trusted-by strip
// ---------------------------------------------------------------------------

const TrustedBy = () => {
  const logos = [
    "Te Whatu Ora",
    "Auckland Council",
    "Ministry of Education",
    "Sudima Hotels",
    "Fisher & Paykel",
    "NZ Police",
    "Massey University",
  ];
  return (
    <section className="cs-trusted">
      <div className="cs-trusted__inner">
        <span className="cs-trusted__label">Specified by</span>
        <div className="cs-trusted__logos">
          {logos.map((l) => <span key={l} className="cs-trusted__logo">{l}</span>)}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Markets strip — five tiles, one per market
// ---------------------------------------------------------------------------

const Markets = () => (
  <section className="cs-section">
    <div className="cs-container">
      <header className="cs-section__head">
        <Eyebrow>Built for five markets</Eyebrow>
        <h2 className="cs-section__h">Spaces we fit out, week in, week out.</h2>
      </header>
      <div className="cs-markets">
        <MarketTile image="../../assets/photos/boardroom.webp"    name="Commercial"   count="48 ranges" />
        <MarketTile image="../../assets/photos/healthcare.webp"   name="Healthcare"   count="22 ranges" />
        <MarketTile image="../../assets/photos/hospitality.webp"  name="Hospitality"  count="34 ranges" />
        <MarketTile image="../../assets/photos/education.webp"    name="Education"    count="19 ranges" />
        <MarketTile image="../../assets/photos/soft-seating.webp" name="Government"   count="27 ranges" />
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Trending — filter chips swap product set
// ---------------------------------------------------------------------------

const PRODUCTS_BY_TAB = {
  "Office & task": [
    { image: "../../assets/photos/boardroom.webp",    name: "Hapuka boardroom chair",     fromPrice: "$789",  badge: "Save 18%", rating: "4.9" },
    { image: "../../assets/photos/soft-seating.webp", name: "Kawakawa tub · grey weave",  fromPrice: "$640",                       rating: "5.0" },
    { image: "../../assets/photos/hospitality.webp", name: "Aria stack · seafoam",        fromPrice: "$189",  badge: "New 2026" },
    { image: "../../assets/photos/healthcare.webp",  name: "Clinic soft seating · denim", fromPrice: "$420",                       rating: "4.8" },
  ],
  "Hospitality": [
    { image: "../../assets/photos/hospitality.webp", name: "Aria stack · seafoam",        fromPrice: "$189",  badge: "Bestseller", rating: "5.0" },
    { image: "../../assets/photos/hospitality.webp", name: "Aria stack · forest",         fromPrice: "$189", },
    { image: "../../assets/photos/soft-seating.webp", name: "Lounge tub · mustard",       fromPrice: "$640",  badge: "Save 12%" },
    { image: "../../assets/photos/hospitality.webp", name: "Café side · slate",           fromPrice: "$215",                       rating: "4.7" },
  ],
  "Healthcare": [
    { image: "../../assets/photos/healthcare.webp", name: "Clinic soft seating · denim",  fromPrice: "$420",                       rating: "4.8" },
    { image: "../../assets/photos/healthcare.webp", name: "Ward visitor · vinyl",         fromPrice: "$310",  badge: "AS/NZS 4438" },
    { image: "../../assets/photos/healthcare.webp", name: "Bariatric arm chair",          fromPrice: "$890" },
    { image: "../../assets/photos/healthcare.webp", name: "Procedure recliner",           fromPrice: "$1,240",                     rating: "4.9" },
  ],
  "Education": [
    { image: "../../assets/photos/education.webp",  name: "Reading cantilever · black",   fromPrice: "$169",  badge: "Save 22%" },
    { image: "../../assets/photos/education.webp",  name: "Lecture flip · indigo",        fromPrice: "$240" },
    { image: "../../assets/photos/education.webp",  name: "Library task · oak",           fromPrice: "$320",                       rating: "4.8" },
    { image: "../../assets/photos/education.webp",  name: "Studio stool · maple",         fromPrice: "$199" },
  ],
  "Soft seating": [
    { image: "../../assets/photos/soft-seating.webp", name: "Kawakawa tub · grey weave",  fromPrice: "$640",                       rating: "5.0" },
    { image: "../../assets/photos/soft-seating.webp", name: "Lounge tub · mustard",       fromPrice: "$640",  badge: "Save 12%" },
    { image: "../../assets/photos/soft-seating.webp", name: "Atrium two-seater",          fromPrice: "$1,420" },
    { image: "../../assets/photos/soft-seating.webp", name: "Wingback · charcoal",        fromPrice: "$980",                       rating: "4.9" },
  ],
};

const Trending = () => {
  const tabs = Object.keys(PRODUCTS_BY_TAB);
  const [tab, setTab] = useState(tabs[0]);
  return (
    <section className="cs-section cs-section--surface">
      <div className="cs-container">
        <header className="cs-section__head cs-section__head--row">
          <h2 className="cs-section__h">Trending right now</h2>
          <div className="cs-arrows">
            <button className="cs-arrow" aria-label="Previous">{Icon.chevL}</button>
            <button className="cs-arrow" aria-label="Next">{Icon.chevR}</button>
          </div>
        </header>
        <div className="cs-chips">
          {tabs.map((t) => (
            <button
              key={t}
              className={`cs-chip ${t === tab ? "is-active" : ""}`}
              onClick={() => setTab(t)}
            >{t}</button>
          ))}
        </div>
        <div className="cs-grid-4">
          {PRODUCTS_BY_TAB[tab].map((p) => <ProductCard key={p.name} {...p} />)}
        </div>
        <div className="cs-section__foot">
          <PillButton variant="outline">View all products</PillButton>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Collage — the signature move
// ---------------------------------------------------------------------------

const Collage = () => {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="cs-section">
      <div className="cs-container cs-collage" ref={wrapRef}>
        <div className={`cs-collage__stage ${visible ? "is-in" : ""}`}>
          <div className="cs-collage__primary">
            <img src="../../assets/photos/soft-seating.webp" alt="" />
          </div>
          <div className="cs-collage__overlay">
            <img src="../../assets/photos/healthcare.webp" alt="" />
          </div>
        </div>
        <div className="cs-collage__copy">
          <Eyebrow>Local stock, fast shipping</Eyebrow>
          <h2 className="cs-section__h">Real support from the team that built your chairs.</h2>
          <p>From the moment a quote leaves your inbox to the day the chairs arrive on site, the process is designed to be straightforward. We hold core ranges in our Hamilton warehouse and ship from the same building they were assembled in.</p>
          <div className="cs-collage__ctas">
            <PillButton variant="primary">Speak to our trade team</PillButton>
            <span className="cs-meta">Most orders ship in 24–48 hours.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Promise — four-up feature strip
// ---------------------------------------------------------------------------

const PromiseStrip = () => (
  <section className="cs-section cs-section--surface">
    <div className="cs-container">
      <div className="cs-promise">
        <Stat icon={Icon.star}    label="50 years of NZ manufacturing" />
        <Stat icon={Icon.package} label="Core ranges held locally" />
        <Stat icon={Icon.truck}   label="Most orders ship in 24–48 hours" />
        <Stat icon={Icon.check}   label="10-year structural warranty" />
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Final CTA — full-bleed photography
// ---------------------------------------------------------------------------

const FinalCTA = () => (
  <section className="cs-final">
    <img className="cs-final__bg" src="../../assets/photos/boardroom.webp" alt="" />
    <div className="cs-final__scrim"></div>
    <div className="cs-final__inner">
      <h2 className="cs-final__h">Specifying a project? Let's talk.</h2>
      <p className="cs-final__p">Send us your floor plan and headcount. We'll come back with a chair selection, lead times, and a fixed quote within two working days.</p>
      <div className="cs-final__ctas">
        <PillButton variant="primary" size="lg">Request a quote</PillButton>
        <PillButton variant="ghost-light" size="lg">Download catalogue</PillButton>
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Page composition
// ---------------------------------------------------------------------------

const Homepage = () => (
  <React.Fragment>
    <Nav />
    <Hero />
    <TrustedBy />
    <Markets />
    <Trending />
    <Collage />
    <PromiseStrip />
    <FinalCTA />
    <Footer />
  </React.Fragment>
);

window.Homepage = Homepage;
