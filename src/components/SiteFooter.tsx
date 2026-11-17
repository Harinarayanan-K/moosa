import { ArrowUp, ArrowUpRight, Mail, Play } from 'lucide-react';
import { footerContent } from '../content';
import { contact, emailLink, whatsappLink } from '../config/contact';
import { site } from '../config/site';
import WhatsAppIcon from './WhatsAppIcon';
import './site-footer.css';

export default function SiteFooter({ onReplayWelcome, reduced }: { onReplayWelcome?: () => void; reduced: boolean }) {
  const whatsapp = whatsappLink();
  const email = emailLink();

  return <footer className="site-footer" id="footer">
    <div className="section-shell">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="wordmark" href="#home" aria-label="Moosa home">MOOSA<span>PRIVATE CHEF · PRAGUE</span></a>
          <p className="footer-tagline">{footerContent.tagline}</p>
          <p className="footer-description">{footerContent.description}</p>
          <p className="footer-status"><span className="status-dot" aria-hidden="true" />{site.launched ? footerContent.launchedStatus : footerContent.prelaunchStatus}</p>
        </div>
        <nav className="footer-explore" aria-label="Footer navigation">
          <h2 className="footer-column-title">Explore</h2>
          <a href="#the-chef">Meet the chef</a>
          <a href="#menu">{site.launched ? 'The menu' : 'Menu preview'}</a>
          <a href="#experiences">Dining experiences</a>
          <a href="#gallery">The gallery</a>
        </nav>
        <div className="footer-contact">
          <h2 className="footer-column-title">{site.launched ? footerContent.contactHeading : footerContent.prelaunchContactHeading}</h2>
          {whatsapp && <a className="footer-contact-link" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /><span>WhatsApp enquiries</span><ArrowUpRight size={14} aria-hidden="true" /></a>}
          {email && <a className="footer-contact-link" href={email}><Mail size={15} strokeWidth={1.5} aria-hidden="true" /><span>{contact.emailAddress}</span><ArrowUpRight size={14} aria-hidden="true" /></a>}
          {!whatsapp && !email && <p className="footer-contact-note">Contact details coming soon.</p>}
          <p className="footer-contact-note">{site.launched ? footerContent.contactNote : footerContent.prelaunchContactNote}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Chef Moosa. All rights reserved.</small>
        <div className="footer-utilities">
          <a href="#questions">Dining FAQs</a>
          <a href={`${import.meta.env.BASE_URL}photo-credits.html`}>Image credits</a>
          {onReplayWelcome && !reduced && <button type="button" className="welcome-replay" onClick={onReplayWelcome}>Replay welcome <Play size={12} aria-hidden="true" /></button>}
          <a className="footer-to-top" href="#home" aria-label="Back to top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </footer>;
}
