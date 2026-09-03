import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '../legal.css';

export const metadata:Metadata={title:'Terms & Conditions — Ampliga',description:'The terms that govern your use of Ampliga’s website and services.'};

export default function TermsAndConditions(){
 return <div className="legal-page">
  <header className="legal-nav">
   <Link href="/" className="logo" aria-label="Ampliga home"><Image src="/ampliga-logo.png" alt="Ampliga" width={66} height={44}/></Link>
   <Link href="/" className="back">← Back to site</Link>
  </header>

  <main className="legal-wrap">
   <p className="legal-eyebrow">Legal</p>
   <h1>Terms &amp; <em>Conditions</em></h1>
   <p className="legal-updated">Last updated: 03 September 2025</p>
   <p className="legal-intro">Welcome to Ampliga. These Terms and Conditions (“Terms”) govern your use of our website, digital services, and any other engagement with us. By accessing or using our Services, you agree to comply with these Terms. If you do not agree, you must not use our Services.</p>

   <section>
    <h2><span className="num">01</span>Definitions</h2>
    <ul>
     <li><b>“Ampliga”, “we”, “our”, “us”</b> refers to Ampliga.</li>
     <li><b>“Services”</b> means all websites, digital platforms, products, marketing, consulting, and related services offered by Ampliga.</li>
     <li><b>“User”, “you”, or “your”</b> means any person or entity accessing or using our Services.</li>
     <li><b>“Content”</b> means all text, graphics, logos, designs, documents, or information provided on or through the Services.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">02</span>Use of Services</h2>
    <ul>
     <li>You must be at least 18 years old to use our Services.</li>
     <li>You agree to use our Services only for lawful purposes and in accordance with these Terms.</li>
     <li>You are responsible for ensuring that any information you provide is accurate and up-to-date.</li>
     <li>You agree to comply with applicable laws, including the Indian Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">03</span>Intellectual Property</h2>
    <ul>
     <li>All content on this website and Services, including text, graphics, logos, images, videos, and software, is the property of Ampliga or our licensors.</li>
     <li>You may not reproduce, distribute, modify, or exploit any material without our prior written consent.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">04</span>User Content</h2>
    <ul>
     <li>If you provide content (e.g., feedback, testimonials, project briefs), you grant Ampliga a non-exclusive, royalty-free, worldwide license to use, display, and reproduce that content in connection with our Services.</li>
     <li>You must not provide unlawful, infringing, or harmful content.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">05</span>Payments and Contracts</h2>
    <ul>
     <li>For paid services, specific terms will be set out in a separate agreement or proposal.</li>
     <li>Payments must be made as agreed. Delayed payments may result in suspension of Services.</li>
     <li>All fees are exclusive of applicable taxes, unless otherwise stated.</li>
     <li>Refunds or cancellations (if applicable) are subject to the terms stated in individual agreements or proposals.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">06</span>Privacy</h2>
    <p>Our <Link href="/privacy">Privacy Policy</Link> explains how we collect, use, and protect your information. By using our Services, you also agree to our Privacy Policy.</p>
   </section>

   <section>
    <h2><span className="num">07</span>Third-Party Links</h2>
    <ul>
     <li>Our Services may contain links to third-party websites or tools. We are not responsible for their content, policies, or practices.</li>
     <li>Accessing third-party sites is at your own risk.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">08</span>Disclaimer of Warranties</h2>
    <ul>
     <li>Our Services are provided on an “as-is” and “as-available” basis.</li>
     <li>We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
     <li>We do not guarantee uninterrupted access, error-free operation, or specific outcomes from our Services.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">09</span>Limitation of Liability</h2>
    <ul>
     <li>To the maximum extent permitted by law, Ampliga is not liable for any indirect, incidental, or consequential damages arising from your use of our Services.</li>
     <li>Our total liability for any claims shall not exceed the amount you paid us for the Services in question.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">10</span>Indemnification</h2>
    <p>You agree to indemnify and hold harmless Ampliga, its founders, employees, and affiliates from any claims, damages, or expenses arising from your use of our Services or violation of these Terms.</p>
   </section>

   <section>
    <h2><span className="num">11</span>Force Majeure</h2>
    <p>We are not liable for any delay or failure to perform due to causes beyond our reasonable control, including natural disasters, acts of government, regulations, strikes, internet failures, cyberattacks, or other events of force majeure.</p>
   </section>

   <section>
    <h2><span className="num">12</span>Dispute Resolution</h2>
    <ul>
     <li>Any disputes shall first be attempted to be resolved amicably.</li>
     <li>If unresolved, disputes shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be held in Gurgaon, Haryana, India, in English.</li>
     <li>Courts in Gurgaon, Haryana shall have exclusive jurisdiction.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">13</span>Severability</h2>
    <p>If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall continue in effect.</p>
   </section>

   <section>
    <h2><span className="num">14</span>Entire Agreement</h2>
    <p>These Terms, together with our <Link href="/privacy">Privacy Policy</Link>, constitute the entire agreement between you and Ampliga regarding the Services.</p>
   </section>

   <section>
    <h2><span className="num">15</span>Notices</h2>
    <ul>
     <li>We may send notices via email, website postings, or other reasonable means.</li>
     <li>You should send notices to us at <a href="mailto:hello@ampliga.com">hello@ampliga.com</a>.</li>
    </ul>
   </section>

   <section>
    <h2><span className="num">16</span>Limitation Period</h2>
    <p>Any claims arising from your use of our Services must be brought within one (1) year from the date of the event giving rise to the claim.</p>
   </section>

   <section>
    <h2><span className="num">17</span>Changes to Terms</h2>
    <ul>
     <li>We may update these Terms from time to time. Updates will be posted on this page with the ‘Last updated’ date.</li>
     <li>Continued use of our Services after changes constitutes acceptance of the revised Terms.</li>
    </ul>
   </section>

   <section className="legal-contact">
    <h2><span className="num">18</span>Contact Us</h2>
    <p className="addr">
     If you have any questions about these Terms, please contact us:<br/>
     Email: <a href="mailto:hello@ampliga.com">hello@ampliga.com</a><br/>
     Postal: Plot No 1, Vijay Vihar, Behind Star Mall, Silokhera, Gurgaon, Haryana, India — Attn: Legal Department
    </p>
   </section>
  </main>
 </div>;
}
