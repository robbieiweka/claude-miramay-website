const { useState: useStateLp, useEffect: useEffectLp, useRef: useRefLp } = React;

const ADDR_SUGGESTIONS = [
  '1248 Oakridge Lane, Austin, TX 78704',
  '1248 Oak Street, Portland, OR 97201',
  '1248 Oakmont Drive, Dallas, TX 75204',
  '1248 Oakwood Avenue, Denver, CO 80209',
  '1248 Oakhill Road, Nashville, TN 37215',
];

const WEB3FORMS_ACCESS_KEY = 'ae72e4b6-6990-405c-8bcc-039e1ac301e9';

function LpForm() {
  const [addr, setAddr] = useStateLp('');
  const [showSug, setShowSug] = useStateLp(false);
  const [form, setForm] = useStateLp({ name: '', phone: '', email: '', situation: '' });
  const [submitted, setSubmitted] = useStateLp(false);
  const [submitting, setSubmitting] = useStateLp(false);
  const [error, setError] = useStateLp('');

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const suggestions = addr.length >= 2
    ? ADDR_SUGGESTIONS.filter(s => s.toLowerCase().includes(addr.toLowerCase())).slice(0, 4)
    : [];

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New Cash Offer Request — Miramay',
          from_name: 'Miramay Landing Page',
          'Property Address': addr,
          'Full Name': form.name,
          'Phone': form.phone,
          'Email': form.email,
          'Situation': form.situation,
        }),
      });
      const out = await res.json();
      if (out.success) {
        setSubmitted(true);
      } else {
        setError(out.message || 'Something went wrong. Please call us or try again.');
      }
    } catch (err) {
      setError('Network error — please try again, or give us a call.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="cash-offer-form" className="lp-section" style={{ background: '#fff' }}>
        <div className="lp-container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'rgba(74,124,111,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4A7C6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="lp-h2">You're all set.</h2>
          <p className="lp-lede" style={{ margin: '0 auto 24px', textAlign: 'center' }}>
            A Miramay specialist will reach out to <b style={{ color: '#1C2B3A' }}>{form.phone || form.email}</b> within 24 hours with your cash offer.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="cash-offer-form" className="lp-section" style={{ background: '#fff' }}>
      <div className="lp-container" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="lp-eyebrow">YOUR CASH OFFER</div>
          <h2 className="lp-h2">Get Your Free Cash Offer Today</h2>
          <p className="lp-lede" style={{ margin: '0 auto', textAlign: 'center' }}>
            No obligation. No pressure. Just a fair offer.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <span className="lp-pill"><i data-lucide="lock" style={{ width: 14, height: 14, color: '#4A7C6F' }}></i>Secure & Confidential</span>
          <span className="lp-pill"><i data-lucide="clock" style={{ width: 14, height: 14, color: '#4A7C6F' }}></i>Offer Within 24 Hours</span>
          <span className="lp-pill"><i data-lucide="hand" style={{ width: 14, height: 14, color: '#4A7C6F' }}></i>No Obligation Whatsoever</span>
        </div>

        <form onSubmit={submit}
          style={{ background: '#FAF9F7', borderRadius: 20, padding: 40, border: '1px solid rgba(28,43,58,0.06)' }}>
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <label style={labelS}>Property Address</label>
            <div style={{ position: 'relative' }}>
              <i data-lucide="map-pin" style={{ position: 'absolute', left: 14, top: 15, width: 18, height: 18, color: '#78838F' }}></i>
              <input style={{ ...inputS, paddingLeft: 42 }} placeholder="Start typing your address..."
                name="address"
                value={addr}
                onFocus={() => setShowSug(true)}
                onBlur={() => setTimeout(() => setShowSug(false), 150)}
                onChange={(e) => { setAddr(e.target.value); setShowSug(true); }}
                required />
            </div>
            {showSug && suggestions.length > 0 && (
              <div style={sugStyles.dropdown}>
                {suggestions.map(s => (
                  <div key={s} style={sugStyles.item}
                    onMouseDown={() => { setAddr(s); setShowSug(false); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78838F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }} className="form-grid">
            <div>
              <label style={labelS}>Full Name</label>
              <input style={inputS} name="name" value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Your name" required />
            </div>
            <div>
              <label style={labelS}>Phone Number</label>
              <input style={inputS} name="phone" type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="(555) 123-4567" required />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelS}>Email Address</label>
            <input style={inputS} name="email" type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="you@example.com" required />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelS}>Situation Type</label>
            <div style={{ position: 'relative' }}>
              <select style={{ ...inputS, appearance: 'none', paddingRight: 42, cursor: 'pointer', color: form.situation ? '#1C2B3A' : '#78838F' }}
                name="situation"
                value={form.situation} onChange={e => upd('situation', e.target.value)} required>
                <option value="">Select your situation...</option>
                <option>Probate / Inherited Property</option>
                <option>Foreclosure / Pre-Foreclosure</option>
                <option>Divorce or Estate Sale</option>
                <option>Needs Major Repairs</option>
                <option>Vacant or Rental Property</option>
                <option>Other</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78838F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: 14, top: 15, pointerEvents: 'none' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="lp-btn lp-btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: 17, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
            {submitting ? 'Sending…' : 'Send Me My Cash Offer'}
            {!submitting && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
          </button>

          {error && (
            <p style={{ fontSize: 14, color: '#B4332C', textAlign: 'center', margin: '16px 0 0' }}>{error}</p>
          )}

          <p style={{ fontSize: 12, color: '#78838F', textAlign: 'center', margin: '16px 0 0' }}>
            We respect your privacy. Your info is never shared or sold.
          </p>
        </form>
      </div>
      <style>{`@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const labelS = { display: 'block', fontSize: 13, fontWeight: 500, color: '#1C2B3A', marginBottom: 6 };
const inputS = { display: 'block', width: '100%', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#1C2B3A', background: '#fff', border: '1px solid rgba(28,43,58,0.14)', borderRadius: 10, padding: '14px 16px', outline: 'none' };
const sugStyles = {
  dropdown: { position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', borderRadius: 10, border: '1px solid rgba(28,43,58,0.1)', boxShadow: '0 10px 30px rgba(28,43,58,0.1)', overflow: 'hidden', zIndex: 10 },
  item: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', fontSize: 14, color: '#1C2B3A', borderBottom: '1px solid rgba(28,43,58,0.06)' },
};

function LpFaq() {
  const [open, setOpen] = useStateLp(0);
  const faqs = [
    { q: 'Will I get a fair offer?', a: "Yes. We base offers on current comparable sales in your area, the condition of your home, and what it will take to bring it to market. Our offers are firm cash numbers — we never bait with a high number and renegotiate later. If our offer doesn't work for you, walk away. No pressure." },
    { q: 'How is this different from listing with an agent?', a: "Listing typically means 3-6 months of showings, repairs, inspections, negotiations, and 6% in commissions. With us: fill out a form, get an offer in 24 hours, close in as little as 7 days. No repairs, no showings, no fees. You lose some top-of-market upside in exchange for speed, certainty, and zero hassle." },
    { q: 'Do I need to make repairs?', a: "No. We buy as-is. Fire damage, old roof, outdated kitchen, hoarding situations, tenant issues — it doesn't matter. Leave what you want, take what you want. We handle cleanout and every repair after closing." },
    { q: 'Do I need to pay any fees or commissions?', a: "Zero fees. No commissions, no closing costs from your side, no inspection fees, no junk fees. The number we offer is the number you walk away with at closing." },
    { q: 'How does the process work step by step?', a: "(1) You fill out the form with your address and a bit about your situation. (2) Within 24 hours, we call or email with a firm cash offer. (3) If you accept, we send paperwork to a local title company you trust. (4) You pick your closing date — as early as 7 days out, or months away if you need time. (5) At closing, you sign, we send funds, and the house is ours. That's it." },
  ];

  return (
    <section id="faq" className="lp-section" style={{ background: '#FAF9F7' }}>
      <div className="lp-container" style={{ maxWidth: 820 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="lp-eyebrow">FAQ</div>
          <h2 className="lp-h2">Common Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(28,43,58,0.08)', overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'DM Sans, sans-serif' }}>
                <span style={{ fontFamily: 'DM Serif Display', fontSize: 20, color: '#1C2B3A', letterSpacing: '-0.01em' }}>{f.q}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4874A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{open === i ? <line x1="5" y1="12" x2="19" y2="12"></line> : <><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></>}</svg>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 24px', fontSize: 15, lineHeight: 1.65, color: '#4A5968' }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LpFooter({ navigate }) {
  return (
    <footer style={{ background: '#1C2B3A', color: '#FAF9F7', padding: '64px 0 32px' }}>
      <div className="lp-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap', marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid rgba(250,249,247,0.1)' }}>
          <div>
            <img src="assets/logo-miramay-light.png" alt="miramay" style={{ height: 34, display: 'block', marginBottom: 18 }} />
            <p style={{ fontSize: 14, color: 'rgba(250,249,247,0.7)', margin: '0 0 8px' }}>We Buy Homes for Cash</p>
            <a href="/" style={{ fontSize: 13, color: '#C4874A', textDecoration: 'none' }}>miramayhomebuyers.com</a>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <a href="/privacy-policy" style={{ color: 'rgba(250,249,247,0.8)', textDecoration: 'none', fontSize: 14 }}>Privacy Policy</a>
<a href="/terms-of-service" style={{ color: 'rgba(250,249,247,0.8)', textDecoration: 'none', fontSize: 14 }}>Terms of Service</a>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(250,249,247,0.5)' }}>© 2025 Miramay Home Buyers. All rights reserved.</div>
      </div>
    </footer>
  );
}

const legalStyles = `
  .legal-page { font-family: 'DM Sans', sans-serif; background: #FAF9F7; color: #1C2B3A; min-height: 100vh; }
  .legal-nav { background: #1C2B3A; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; }
  .legal-nav img { height: 30px; }
  .legal-nav a { color: rgba(250,249,247,0.8); font-size: 14px; text-decoration: none; cursor: pointer; }
  .legal-nav a:hover { color: #FAF9F7; }
  .legal-container { max-width: 780px; margin: 0 auto; padding: 64px 24px 96px; }
  .legal-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; color: #C4874A; text-transform: uppercase; margin-bottom: 12px; }
  .legal-h1 { font-family: 'DM Serif Display', serif; font-size: clamp(32px, 5vw, 48px); color: #1C2B3A; line-height: 1.15; margin-bottom: 12px; }
  .legal-meta { font-size: 14px; color: #78838F; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid rgba(28,43,58,0.1); }
  .legal-h2 { font-family: 'DM Serif Display', serif; font-size: 22px; color: #1C2B3A; margin: 40px 0 12px; }
  .legal-p { font-size: 15px; line-height: 1.75; color: #4A5968; margin-bottom: 16px; }
  .legal-ul { padding-left: 20px; margin-bottom: 16px; }
  .legal-ul li { font-size: 15px; line-height: 1.75; color: #4A5968; margin-bottom: 6px; }
  .legal-footer { background: #1C2B3A; color: rgba(250,249,247,0.5); text-align: center; font-size: 12px; padding: 24px; }
`;

function PrivacyPolicy({ navigate }) {
  return (
    <div className="legal-page">
      <style>{legalStyles}</style>
      <nav className="legal-nav">
        <img src="assets/logo-miramay-light.png" alt="Miramay Home Buyers" />
        <a onClick={() => navigate('/')}>← Back to Home</a>
      </nav>
      <div className="legal-container">
        <div className="legal-eyebrow">Legal</div>
        <h1 className="legal-h1">Privacy Policy</h1>
        <p className="legal-meta">Last updated: June 1, 2025</p>

        <p className="legal-p">Miramay Home Buyers, operated by Miramay Group LLC ("Miramay," "we," "us," or "our"), is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information you provide when visiting miramayhomebuyers.com or communicating with us.</p>

        <h2 className="legal-h2">1. Information We Collect</h2>
        <p className="legal-p">We may collect the following types of information:</p>
        <ul className="legal-ul">
          <li><strong>Contact Information:</strong> Name, phone number, and email address submitted through our forms or chat widget.</li>
          <li><strong>Property Information:</strong> Property address and details about your situation that you voluntarily provide.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent on site, browser type, and IP address, collected automatically via cookies and analytics tools.</li>
          <li><strong>Communications:</strong> Records of phone calls, SMS messages, and emails exchanged with our team.</li>
        </ul>

        <h2 className="legal-h2">2. How We Use Your Information</h2>
        <p className="legal-p">We use the information we collect to:</p>
        <ul className="legal-ul">
          <li>Prepare and deliver a cash offer for your property</li>
          <li>Contact you via phone, email, or SMS regarding your inquiry</li>
          <li>Improve our website and marketing efforts</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="legal-h2">3. SMS / Text Message Communications</h2>
        <p className="legal-p">By submitting your phone number through our website or chat widget, you consent to receive SMS text messages from Miramay Home Buyers regarding your property inquiry. Message frequency varies. Standard message and data rates may apply. You may opt out at any time by replying <strong>STOP</strong> to any message. For help, reply <strong>HELP</strong>.</p>
        <p className="legal-p">We do not sell or share your phone number with third parties for their own marketing purposes.</p>

        <h2 className="legal-h2">4. Sharing Your Information</h2>
        <p className="legal-p">We do not sell, rent, or trade your personal information. We may share information with:</p>
        <ul className="legal-ul">
          <li><strong>Service Providers:</strong> Third-party tools we use to operate our business (e.g., CRM platforms, form submission services, analytics), bound by confidentiality agreements.</li>
          <li><strong>Legal Requirements:</strong> If required by law, court order, or government authority.</li>
        </ul>

        <h2 className="legal-h2">5. Cookies & Tracking</h2>
        <p className="legal-p">We use cookies and similar tracking technologies to understand how visitors use our site and to improve your experience. You can control cookie settings through your browser. Disabling cookies may affect certain site functionality.</p>

        <h2 className="legal-h2">6. Data Security</h2>
        <p className="legal-p">We implement reasonable security measures to protect your information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

        <h2 className="legal-h2">7. Your Rights</h2>
        <p className="legal-p">Depending on your state of residence, you may have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at the information below.</p>

        <h2 className="legal-h2">8. Third-Party Links</h2>
        <p className="legal-p">Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.</p>

        <h2 className="legal-h2">9. Changes to This Policy</h2>
        <p className="legal-p">We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last updated" date.</p>

        <h2 className="legal-h2">10. Contact Us</h2>
        <p className="legal-p">If you have questions about this Privacy Policy, please contact us:</p>
        <ul className="legal-ul">
          <li><strong>Company:</strong> Miramay Group LLC</li>
          <li><strong>Website:</strong> miramayhomebuyers.com</li>
          <li><strong>Email:</strong> info@miramayhomebuyers.com</li>
        </ul>
      </div>
      <div className="legal-footer">© 2025 Miramay Home Buyers. All rights reserved.</div>
    </div>
  );
}

function TermsOfService({ navigate }) {
  return (
    <div className="legal-page">
      <style>{legalStyles}</style>
      <nav className="legal-nav">
        <img src="assets/logo-miramay-light.png" alt="Miramay Home Buyers" />
        <a onClick={() => navigate('/')}>← Back to Home</a>
      </nav>
      <div className="legal-container">
        <div className="legal-eyebrow">Legal</div>
        <h1 className="legal-h1">Terms of Service</h1>
        <p className="legal-meta">Last updated: June 1, 2025</p>

        <p className="legal-p">These Terms of Service ("Terms") govern your use of the website miramayhomebuyers.com, operated by Miramay Group LLC ("Miramay," "we," "us," or "our"). By accessing or using our website, you agree to be bound by these Terms.</p>

        <h2 className="legal-h2">1. Use of the Website</h2>
        <p className="legal-p">You may use this website for lawful purposes only. You agree not to:</p>
        <ul className="legal-ul">
          <li>Submit false or misleading information</li>
          <li>Interfere with the operation of the site</li>
          <li>Use the site for any unlawful or unauthorized purpose</li>
          <li>Attempt to gain unauthorized access to any part of the site or its related systems</li>
        </ul>

        <h2 className="legal-h2">2. No Obligation</h2>
        <p className="legal-p">Submitting your information through our website does not obligate you to sell your property, nor does it obligate Miramay Home Buyers to purchase it. Any cash offer we provide is subject to property inspection, due diligence, and mutual agreement by both parties.</p>

        <h2 className="legal-h2">3. Informational Purposes Only</h2>
        <p className="legal-p">The content on this website is provided for general informational purposes only. Nothing on this site constitutes legal, financial, or real estate advice. We encourage you to consult qualified professionals before making any real estate decisions.</p>

        <h2 className="legal-h2">4. SMS Communications</h2>
        <p className="legal-p">By providing your phone number and submitting our contact form or chat widget, you consent to receive SMS text messages from Miramay Home Buyers. These messages may include information about your property inquiry, follow-up communications, and related updates. You may opt out at any time by replying <strong>STOP</strong>. Message and data rates may apply.</p>

        <h2 className="legal-h2">5. Intellectual Property</h2>
        <p className="legal-p">All content on this website — including text, graphics, logos, and images — is the property of Miramay Group LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written permission.</p>

        <h2 className="legal-h2">6. Third-Party Services</h2>
        <p className="legal-p">Our website may use third-party services for form submissions, analytics, and communications (such as GoHighLevel, Web3Forms, and Meta). Your use of these services is also governed by their respective terms and privacy policies.</p>

        <h2 className="legal-h2">7. Disclaimer of Warranties</h2>
        <p className="legal-p">This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the site will be error-free, uninterrupted, or free of viruses or other harmful components.</p>

        <h2 className="legal-h2">8. Limitation of Liability</h2>
        <p className="legal-p">To the fullest extent permitted by law, Miramay Group LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any content contained herein.</p>

        <h2 className="legal-h2">9. Governing Law</h2>
        <p className="legal-p">These Terms shall be governed by and construed in accordance with the laws of the State of Connecticut, without regard to its conflict of law provisions.</p>

        <h2 className="legal-h2">10. Changes to These Terms</h2>
        <p className="legal-p">We reserve the right to update these Terms at any time. Changes will be posted on this page with a revised "Last updated" date. Continued use of the website after changes constitutes acceptance of the updated Terms.</p>

        <h2 className="legal-h2">11. Contact Us</h2>
        <p className="legal-p">If you have questions about these Terms, please contact us:</p>
        <ul className="legal-ul">
          <li><strong>Company:</strong> Miramay Group LLC</li>
          <li><strong>Website:</strong> miramayhomebuyers.com</li>
          <li><strong>Email:</strong> info@miramayhomebuyers.com</li>
        </ul>
      </div>
      <div className="legal-footer">© 2025 Miramay Home Buyers. All rights reserved.</div>
    </div>
  );
}

Object.assign(window, { LpForm, LpFaq, LpFooter, PrivacyPolicy, TermsOfService });
