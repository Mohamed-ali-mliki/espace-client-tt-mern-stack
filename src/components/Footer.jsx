import React from 'react';
import { Link } from 'react-router-dom';
import '../components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Données du footer
  const companyInfo = {
    name: 'Tunisie Telecom',
    description: 'Leader des télécommunications en Tunisie',
    address: 'Centre Urbain Nord, 1082 Tunis',
    phone: '1298',
    email: 'support@tunisietelecom.tn',
    website: 'www.tunisietelecom.tn'
  };

  const links = {
    about: { label: 'À propos', path: '/about' },
    contact: { label: 'Contact', path: '/contact' },
    assistance: { label: 'Assistance', path: '/assistance' },
    faq: { label: 'FAQ', path: '/faq' },
    terms: { label: 'Conditions d\'utilisation', path: '/terms' },
    privacy: { label: 'Politique de confidentialité', path: '/privacy' }
  };

  const socialMedia = [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/tunisietelecom' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/tunisietelecom' },
    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/company/tunisietelecom' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/tunisietelecom' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/tunisietelecom' }
  ];

  return (
    <footer className="tt-footer">
      <div className="footer-container">
        {/* Section Principale */}
        <div className="footer-main">
          {/* Logo et Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-satellite-dish"></i>
              <span className="logo-text">Tunisie Telecom</span>
            </div>
            <p className="company-description">
              Leader des télécommunications en Tunisie, offrant des solutions innovantes 
              en fibre optique, mobile et services numériques.
            </p>
            <div className="social-links">
              {socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Liens Rapides */}
          <div className="footer-links">
            <h3 className="links-title">Liens Rapides</h3>
            <ul className="links-list">
              <li><Link to={links.about.path}>{links.about.label}</Link></li>
              <li><Link to={links.contact.path}>{links.contact.label}</Link></li>
              <li><Link to={links.assistance.path}>{links.assistance.label}</Link></li>
              <li><Link to={links.faq.path}>{links.faq.label}</Link></li>
              <li><Link to={links.terms.path}>{links.terms.label}</Link></li>
              <li><Link to={links.privacy.path}>{links.privacy.label}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3 className="contact-title">Contactez-nous</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>Service Client : {companyInfo.phone}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{companyInfo.email}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{companyInfo.address}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <span>{companyInfo.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="footer-divider"></div>

        {/* Bas du Footer */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} {companyInfo.name} – Tous droits réservés</p>
          </div>
          <div className="footer-extra">
            <div className="language-switcher">
              <button className="lang-btn active">FR</button>
              <span className="lang-separator">|</span>
              <button className="lang-btn">AR</button>
            </div>
            <div className="certifications">
              <span className="cert-badge">ISO 9001</span>
              <span className="cert-badge">Certifié AN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;