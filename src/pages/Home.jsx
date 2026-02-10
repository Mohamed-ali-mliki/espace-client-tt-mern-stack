import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";

const Home = () => {
  const [showServices, setShowServices] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const services = [
    {
      icon: "📱",
      title: "My TT",
      description: "Rechargez votre TT Cash, achetez des forfaits internet et gérez vos services mobiles en toute simplicité.",
      features: ["Recharge TT Cash", "Achat internet", "Paiement facture", "Transfert"]
    },
    {
      icon: "💼",
      title: "My TT Business",
      description: "Solutions professionnelles complètes pour les entreprises avec un suivi détaillé de la consommation.",
      features: ["Inscription", "Suivi consommation", "Paiement factures", "Recharger TT Cash"]
    },
    {
      icon: "🛠️",
      title: "Assistance",
      description: "Notre équipe est à votre disposition 24/7 pour résoudre tous vos problèmes techniques.",
      features: ["TT près de chez vous", "Couverture réseau", "Réclamation", "Tutos"]
    },
    {
      icon: "🏢",
      title: "À propos de TT",
      description: "Découvrez notre entreprise, nos valeurs et nos engagements envers nos clients.",
      features: ["Notre Entreprise", "Appels d'offres", "Règlement interne"]
    }
  ];

  const stats = [
    { value: "5M+", label: "Clients satisfaits" },
    { value: "99.7%", label: "Couverture réseau" },
    { value: "24/7", label: "Support client" },
    { value: "15+", label: "Années d'expérience" }
  ];

  const testimonials = [
    {
      name: "Mohamed Ali",
      role: "Client Entreprise",
      text: "Excellent service! La gestion de mes abonnements est devenue beaucoup plus simple avec l'Espace Client.",
      rating: 5
    },
    {
      name: "Fatma Ben Salem",
      role: "Particulier",
      text: "Interface intuitive et support réactif. Je recommande vivement Tunisie Telecom.",
      rating: 4
    },
    {
      name: "Karim Technologie",
      role: "Développeur",
      text: "Les APIs sont bien documentées et le tableau de bord admin est très complet.",
      rating: 5
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      setShowServices(scrollPosition > windowHeight * 0.2);
      setShowStats(scrollPosition > windowHeight * 0.6);
      setShowFeatures(scrollPosition > windowHeight * 1.2);
      setShowTestimonials(scrollPosition > windowHeight * 1.8);
      setShowCta(scrollPosition > windowHeight * 2.4);
    };

    window.addEventListener("scroll", handleScroll);
    // Initialiser après un délai
    setTimeout(() => handleScroll(), 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateStars = (rating) => {
    return Array(rating).fill("★");
  };

  return (
    <div className="home-page">
      {/* Section Hero */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Bienvenue sur votre 
                <span className="highlight"> Espace Client</span> 
                Tunisie Telecom
              </h1>
              <p className="hero-subtitle">
                Gérez vos abonnements, consultez vos factures et créez des demandes de support 
                en toute simplicité. Tout ce dont vous avez besoin, à portée de clic.
              </p>
              <div className="hero-buttons">
                <Link to="/login" className="btn btn-primary">
                  <span className="btn-icon">🚀</span>
                  Accéder au Dashboard
                </Link>
                <Link to="/subscriptions" className="btn btn-outline">
                  <span className="btn-icon">📊</span>
                  Voir mes abonnements
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card card1">
                <div className="card-icon">📱</div>
                <h4>Gestion Mobile</h4>
                <p>Contrôlez vos services mobiles</p>
              </div>
              <div className="floating-card card2">
                <div className="card-icon">💻</div>
                <h4>Internet Haut Débit</h4>
                <p>Suivez votre consommation</p>
              </div>
              <div className="floating-card card3">
                <div className="card-icon">📊</div>
                <h4>Tableau de Bord</h4>
                <p>Visualisez vos données</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className={`services-section ${showServices ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Services</h2>
            <p className="section-subtitle">
              Découvrez la gamme complète de services Tunisie Telecom adaptés à vos besoins
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={service.title === "My TT" ? "/subscriptions" : "/dashboard-client"} 
                  className="service-link"
                >
                  Découvrir →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className={`stats-section ${showStats ? 'visible' : ''}`}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className={`features-section ${showFeatures ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Pourquoi choisir notre Espace Client ?</h2>
            <p className="section-subtitle">
              Une expérience utilisateur optimisée pour une gestion simplifiée de vos services
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Rapidité</h3>
              <p>Accédez à vos informations en temps réel sans délai d'attente.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Sécurité</h3>
              <p>Vos données sont cryptées et protégées selon les normes les plus strictes.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Accessibilité</h3>
              <p>Connectez-vous depuis n'importe quel appareil, à tout moment.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔄</div>
              <h3>Mises à jour</h3>
              <p>Des améliorations régulières basées sur vos retours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className={`testimonials-section ${showTestimonials ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ce que disent nos clients</h2>
            <p className="section-subtitle">
              Des milliers de clients font confiance à notre plateforme
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {generateStars(testimonial.rating).map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Call to Action */}
      <section className={`cta-section ${showCta ? 'visible' : ''}`}>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à gérer vos services plus efficacement ?</h2>
            <p className="cta-subtitle">
              Rejoignez des milliers de clients qui simplifient déjà leur gestion télécom avec nous.
            </p>
            <div className="cta-buttons">
              <Link to="/inscription" className="btn btn-primary btn-large">
                <span className="btn-icon">✨</span>
                Créer un compte gratuit
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                <span className="btn-icon">🔑</span>
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;