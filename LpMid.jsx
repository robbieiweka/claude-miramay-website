function LpSituations() {
  const items = [
    { icon: 'scroll-text', t: 'Probate & Inherited Property', p: "Inherited a home you're not sure what to do with? We make the process simple and respectful." },
    { icon: 'shield-alert', t: 'Foreclosure & Pre-Foreclosure', p: 'Behind on payments or facing foreclosure? We can close quickly and help you avoid damage to your credit.' },
    { icon: 'heart-handshake', t: 'Divorce & Estate Sales', p: "Going through a life change and need to sell fast? We'll work around your timeline with zero stress." },
    { icon: 'home', t: 'Any Condition or Situation', p: 'Fire damage, major repairs needed, bad tenants, vacant property — we buy it as-is, no questions asked.' },
  ];
  return (
    <section id="situations" className="lp-section">
      <div className="lp-container">
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 700, margin: '0 auto 56px' }}>
          <div className="lp-eyebrow">SITUATIONS WE BUY</div>
          <h2 className="lp-h2">We Buy Homes In Any Situation</h2>
          <p className="lp-lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            Whatever you're going through, we've seen it — and we can help.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="sit-grid">
          {items.map(it => (
            <div key={it.t} className="lp-card">
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(74,124,111,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <i data-lucide={it.icon} style={{ width: 24, height: 24, color: '#4A7C6F' }}></i>
              </div>
              <h4 style={{ fontFamily: 'DM Serif Display', fontSize: 26, letterSpacing: '-0.02em', color: '#1C2B3A', margin: '0 0 10px', lineHeight: 1.15 }}>{it.t}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5968', margin: 0 }}>{it.p}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="sit-photo-row">
          <div style={{ aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden', background: '#E8DDD0', boxShadow: '0 14px 36px rgba(28,43,58,0.08)' }}>
            <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=75" alt="Older fixer-upper home with worn siding" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.8) contrast(1.05)' }} />
          </div>
          <div style={{ aspectRatio: '4/3', borderRadius: 16, overflow: 'hidden', background: '#E8DDD0', boxShadow: '0 14px 36px rgba(28,43,58,0.08)' }}>
            <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1000&q=75" alt="Distressed residential property" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.8) contrast(1.05)' }} />
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .sit-grid, .sit-photo-row { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function LpTestimonials() {
  const quotes = [
    { name: 'Linda R.', loc: 'Austin, TX', initials: 'LR', stars: 5, q: "When my mother passed, I inherited her house from 900 miles away. Robbie and the team handled everything remotely — probate paperwork, the whole thing. Closed in 11 days. I can't imagine doing this with a realtor." },
    { name: 'Marcus D.', loc: 'Long Beach, CA', initials: 'MD', stars: 5, q: "We were three weeks from foreclosure and terrified. Miramay gave us a fair offer the day after I called. They closed before the bank could take the house. I'm not exaggerating — they saved our family." },
    { name: 'Angela & Tom W.', loc: 'Tulsa, OK', initials: 'AW', stars: 5, q: "Going through a divorce, neither of us wanted to deal with showings or repairs. Miramay bought the house as-is. Clean, private, done. Exactly what we needed in a hard year." },
  ];
  return (
    <section id="testimonials" className="lp-section" style={{ background: '#fff' }}>
      <div className="lp-container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="lp-eyebrow">SELLERS WE'VE HELPED</div>
          <h2 className="lp-h2">Homeowners We've Helped</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="test-grid">
          {quotes.map(t => (
            <div key={t.name} style={{ background: '#FAF9F7', borderRadius: 16, padding: 28, border: '1px solid rgba(28,43,58,0.05)' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {Array(t.stars).fill(0).map((_, i) => (
                  <i key={i} data-lucide="star" style={{ width: 16, height: 16, color: '#C4874A', fill: '#C4874A' }}></i>
                ))}
              </div>
              <p style={{ fontFamily: 'DM Serif Display', fontStyle: 'italic', fontSize: 18, lineHeight: 1.4, color: '#1C2B3A', margin: '0 0 24px' }}>&ldquo;{t.q}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(28,43,58,0.08)', color: '#1C2B3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em' }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1C2B3A' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#78838F' }}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .test-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function LpAbout() {
  return (
    <section id="about" className="lp-section">
      <div className="lp-container" style={{ maxWidth: 820, textAlign: 'center' }}>
        <div style={{ width: 48, height: 3, background: '#C4874A', margin: '0 auto 24px' }}></div>
        <div className="lp-eyebrow">FROM THE FOUNDER</div>
        <h2 className="lp-h2" style={{ marginBottom: 32 }}>You're Not Just a Transaction to Us</h2>
        <blockquote style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.5, letterSpacing: '-0.015em', color: '#1C2B3A', margin: 0, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
          &ldquo;When I was 11 years old, my father passed away without a will. Our family home went into probate, and foreclosure followed shortly after. We were lost, overwhelmed, and had nowhere to turn.
          <br/><br/>
          I started Miramay Home Buyers because I wish there had been someone like us to help my family during that time. Now I show up for families going through exactly what we went through &mdash; and I make sure they have a way out.&rdquo;
        </blockquote>
        <div style={{ marginTop: 32, fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500, color: '#4A5968', letterSpacing: '0.02em' }}>
          &mdash; Robbie, Founder at Miramay Home Buyers
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LpSituations, LpTestimonials, LpAbout });
