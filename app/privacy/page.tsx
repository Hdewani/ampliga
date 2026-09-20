import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '../legal.css';

export const metadata:Metadata={title:'Privacy Policy',description:'How Ampliga collects, uses, and protects your personal information.',alternates:{canonical:'/privacy'}};

export default function PrivacyPolicy(){
 return <div className="legal-page">
  <header className="legal-nav">
   <Link href="/" className="logo" aria-label="Ampliga home"><Image src="/ampliga-logo.png" alt="Ampliga" width={66} height={44}/></Link>
   <Link href="/" className="back">← Back to site</Link>
  </header>

  <main className="legal-wrap">
   <p className="legal-eyebrow">Legal</p>
   <h1>Privacy <em>Policy</em></h1>
   <p className="legal-updated">Last updated: 03 September 2025</p>
   <p className="legal-intro">This Privacy Policy explains how Ampliga (“Ampliga”, “we”, “us”, “our”) collects, uses, shares, and protects your personal information when you engage with our website and services. Website: <a href="https://www.ampliga.com/">https://www.ampliga.com/</a> · Email: <a href="mailto:hello@ampliga.com">hello@ampliga.com</a> · Registered address: 2318/ Tower5, county the center court , sector 88A , Gurgaon 122505, Haryana, India.</p>

   <section>
    <h2><span className="num">01</span>Information We Collect</h2>
    <ul>
     <li><b>Contact details</b> — name, email, phone/WhatsApp, company, role.</li>
     <li><b>Business information</b> — industry, budgets, project details, interests.</li>
     <li><b>Content you send us</b> — messages, briefs, files, support requests.</li>
     <li><b>Billing/support information</b> — address, tax IDs, transaction references.</li>
     <li><b>Device &amp; usage data</b> — IP, browser, device type, pages viewed, referrers.</li>
     <li><b>Cookies/trackers</b> — analytics, ad pixels.</li>
     <li><b>Data from third parties</b> — Google, Meta, LinkedIn, CRM tools, public sources.</li>
    </ul>
    <p>We do not intentionally collect sensitive personal data unless explicitly provided for a defined purpose.</p>
   </section>

   <section>
    <h2><span className="num">02</span>How We Use Information</h2>
    <ul>
     <li><b>Provide &amp; improve services</b> — respond to inquiries, demos, proposals.</li>
     <li><b>Marketing &amp; ads</b> — personalization, campaign measurement, remarketing.</li>
     <li><b>Sales enablement</b> — qualify leads, manage CRM relationships.</li>
     <li><b>Security &amp; fraud prevention.</b></li>
     <li><b>Compliance</b> with legal obligations.</li>
    </ul>
    <p><b>Legal bases under GDPR:</b> consent, contract performance, legitimate interests, legal obligation. <b>Grounds under India DPDP:</b> consent or legitimate use. <b>CCPA/CPRA:</b> business purposes including advertising/measurement; no sale for money, but some sharing may occur.</p>
   </section>

   <section>
    <h2><span className="num">03</span>Cookies &amp; Similar Technologies</h2>
    <p>We use cookies, pixels, and tags (Google Analytics, Meta Pixel, LinkedIn Insight Tag). You can manage preferences via our Cookie Banner or browser settings.</p>
   </section>

   <section>
    <h2><span className="num">04</span>Sharing of Data</h2>
    <ul>
     <li><b>Service providers</b> — hosting, analytics, ads, CRM/marketing automation, cloud storage, payments.</li>
     <li><b>Professional advisors</b> — legal, audit, accounting.</li>
     <li><b>Authorities</b> — where required by law.</li>
     <li><b>Business transfers</b> — mergers, acquisitions, restructuring.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">05</span>International Transfers</h2>
    <p>Your data may be transferred to countries where our processors operate (including the US, EU, Singapore). We rely on safeguards such as Standard Contractual Clauses (SCCs) or other lawful mechanisms.</p>
   </section>

   <section>
    <h2><span className="num">06</span>Data Retention</h2>
    <ul>
     <li><b>Marketing leads</b> — up to 24 months from last interaction (or earlier if you opt out).</li>
     <li><b>Client &amp; billing records</b> — 7 years (or longer if required by law).</li>
    </ul>
    <p>We delete or anonymize data once retention periods expire.</p>
   </section>

   <section>
    <h2><span className="num">07</span>Security</h2>
    <p>We use safeguards including encryption, access controls, and monitoring. No method is 100% secure, so please use caution online.</p>
   </section>

   <section>
    <h2><span className="num">08</span>Your Rights</h2>
    <div className="legal-grid">
     <div><b>India (DPDP 2023)</b><span>Access, correct, erase, grievance redressal, nominate.</span></div>
     <div><b>EU/UK (GDPR)</b><span>Access, rectify, erase, restrict, object, portability, withdraw consent, complain to Supervisory Authority.</span></div>
     <div><b>California (CCPA/CPRA)</b><span>Know, delete, correct, limit sensitive data use, opt out of sale/sharing.</span></div>
     <div><b>Response time</b><span>We aim to respond to rights requests within 30 days (may extend by law).</span></div>
    </div>
    <p><b>Do Not Sell/Share:</b> use the footer link ‘Do Not Sell or Share My Personal Information’ or email <a href="mailto:hello@ampliga.com">hello@ampliga.com</a>.</p>
   </section>

   <section>
    <h2><span className="num">09</span>Children’s Privacy</h2>
    <p>Our Services are not directed to children under 18. If you believe we have collected such data, contact us for deletion.</p>
   </section>

   <section>
    <h2><span className="num">10</span>WhatsApp &amp; Phone Communications</h2>
    <p>By submitting your phone/WhatsApp number, you consent to receive business communications. You can opt out anytime by replying STOP or contacting <a href="mailto:hello@ampliga.com">hello@ampliga.com</a>.</p>
   </section>

   <section>
    <h2><span className="num">11</span>Third-Party Links</h2>
    <p>Our Services may contain links to third-party websites. Their policies are independent; review them separately.</p>
   </section>

   <section>
    <h2><span className="num">12</span>Changes to this Policy</h2>
    <p>We may update this Policy. Material changes will be notified by email or website banner. The ‘Last updated’ date indicates the latest version.</p>
   </section>

   <section className="legal-contact">
    <h2><span className="num">13</span>Contact &amp; Grievance Officer</h2>
    <p className="addr">
     Privacy queries/requests: <a href="mailto:hello@ampliga.com">hello@ampliga.com</a><br/>
     Grievance Officer (India): <a href="mailto:hello@ampliga.com">hello@ampliga.com</a><br/>
     Postal: 2318/ Tower5, county the center court , sector 88A , Gurgaon 122505, Haryana, India — Attn: Privacy
    </p>
   </section>
  </main>
 </div>;
}
