function LpNav({ onCta }) {
  const smoothTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  const links = [
    ['how', 'How It Works'],
    ['situations', 'Situations'],
    ['testimonials', 'Testimonials'],
    ['about', 'About'],
    ['cash-offer-form', 'Cash Offer'],
    ['faq', 'FAQ'],
  ];
  return (
    <nav style={navStyles.bar}>
      <div style={navStyles.inner}>
        <a href="#" style={navStyles.logo}>
          <img src="assets/logo-miramay.png" alt="miramay" style={{ height: 30, display: 'block' }} />
        </a>
        <div style={navStyles.links} className="lp-nav-links">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => smoothTo(e, id)} style={navStyles.link}>{label}</a>
          ))}
        </div>
        <button className="lp-btn lp-btn-gold" onClick={onCta}>
          Get My Cash Offer
        </button>
      </div>
      <style>{`
        @media (max-width: 960px) { .lp-nav-links { display: none !important; } }
        nav a.lp-link:hover { color: #C4874A !important; }
      `}</style>
    </nav>
  );
}
const navStyles = {
  bar: { position: 'sticky', top: 0, zIndex: 40, background: 'rgba(250,249,247,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(28,43,58,0.06)' },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 },
  logo: { display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 },
  links: { display: 'flex', gap: 26, alignItems: 'center', flex: 1, justifyContent: 'center' },
  link: { fontSize: 14, fontWeight: 500, color: '#1C2B3A', textDecoration: 'none', transition: 'color 120ms cubic-bezier(0.32,0.72,0,1)' },
};

function LpHero({ onCta }) {
  return (
    <section style={{ padding: '96px 0 80px' }}>
      <div className="lp-container" style={{ textAlign: 'center' }}>
        <div className="lp-eyebrow">MIRAMAY HOME BUYERS</div>
        <h1 className="lp-h1" style={{ maxWidth: 960, margin: '0 auto 24px' }}>
          Sell Your Home Fast —<br/>Without the Hassle
        </h1>
        <p className="lp-lede" style={{ margin: '0 auto 36px', textAlign: 'center' }}>
          We buy homes in any condition, any situation. Get a fair cash offer in 24 hours
          and close on your timeline — no repairs, no agents, no fees.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {['No Fees Ever', 'As-Is Purchase', 'Close in 7 Days', 'Any Situation Welcome'].map(t => (
            <span key={t} className="lp-pill">
              <i data-lucide="check" style={{ width: 14, height: 14, color: '#4A7C6F' }}></i>
              {t}
            </span>
          ))}
        </div>
        <button className="lp-btn lp-btn-gold lp-btn-gold-lg" onClick={onCta}>
          Get My Cash Offer
          <i data-lucide="arrow-right" style={{ width: 18, height: 18 }}></i>
        </button>
      </div>

    </section>
  );
}

function LpHowItWorks() {
  const steps = [
    { n: '01', icon: 'pencil-line', t: 'Tell Us About Your Home', p: 'Fill out our simple form. Takes less than 2 minutes.' },
    { n: '02', icon: 'file-text', t: 'Receive Your Cash Offer', p: "We'll review your property and send a no-obligation offer within 24 hours." },
    { n: '03', icon: 'key-round', t: 'Close On Your Terms', p: 'Pick your closing date. We handle everything. You walk away with cash.' },
  ];
  return (
    <section id="how" className="lp-section" style={{ background: '#fff' }}>
      <div className="lp-container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="lp-eyebrow">HOW IT WORKS</div>
          <h2 className="lp-h2" style={{ margin: 0 }}>Three Steps to Your Cash Offer</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="hiw-grid">
          {steps.map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: 16, background: 'rgba(196,135,74,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <i data-lucide={s.icon} style={{ width: 32, height: 32, color: '#C4874A' }}></i>
              </div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 14, letterSpacing: '0.14em', color: '#C4874A', marginBottom: 8 }}>{s.n}</div>
              <h4 style={{ fontFamily: 'DM Serif Display', fontSize: 26, letterSpacing: '-0.02em', color: '#1C2B3A', margin: '0 0 12px', lineHeight: 1.15 }}>{s.t}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5968', margin: 0, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .hiw-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

Object.assign(window, { LpNav, LpHero, LpHowItWorks });
