
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Subscriptions.css';

const Subscriptions = () => {
  const navigate = useNavigate();
  
  // État pour les abonnements de l'utilisateur
  const [userSubscriptions, setUserSubscriptions] = useState([
    {
      id: 1001,
      nom: 'Fibre Pro 50 Mbps',
      type: 'FIBRE',
      statut: 'ACTIF',
      prix: 45,
      dateActivation: '12/03/2024',
      dateRenouvellement: '12/03/2025',
      peutAmeliorer: true,
      details: {
        adresse: 'Rue de la Liberté, Tunis',
        dureeContrat: '12 mois'
      }
    },
    {
      id: 1002,
      nom: 'Forfait Mobile 25 Go',
      type: 'MOBILE',
      statut: 'ACTIF',
      prix: 25,
      dateActivation: '15/01/2024',
      dateRenouvellement: '15/02/2025',
      peutAmeliorer: false,
      details: {
        numeroTelephone: '22 123 456',
        dureeContrat: 'Mensuel'
      }
    },
    {
      id: 1003,
      nom: 'Ligne Fixe Classique',
      type: 'FIXE',
      statut: 'ACTIF',
      prix: 10,
      dateActivation: '01/06/2023',
      dateRenouvellement: '01/06/2024',
      peutAmeliorer: true
    }
  ]);

  // État pour les offres disponibles
  const [offres, setOffres] = useState([
    // Offres ADSL
    {
      id: 1,
      nom: 'ADSL Start',
      type: 'ADSL',
      categorie: 'Économique',
      vitesse: '4 Mbps',
      prix: 25,
      caracteristiques: [
        'Internet illimité',
        'Installation gratuite',
        'Support technique 24/7',
        'Modem inclus'
      ],
      populaire: false
    },
    {
      id: 2,
      nom: 'ADSL Famille',
      type: 'ADSL',
      categorie: 'Familial',
      vitesse: '8 Mbps',
      prix: 29,
      prixOriginal: 35,
      caracteristiques: [
        'Internet illimité',
        'Débit garanti',
        'Wi-Fi avancé',
        'Support dédié'
      ],
      populaire: true,
      promotion: {
        libelle: 'Offre spéciale',
        dateFin: '31/12/2024'
      }
    },
    
    // Offres FIBRE
    {
      id: 3,
      nom: 'Fibre Essential',
      type: 'FIBRE',
      categorie: 'Personnel',
      vitesse: '20 Mbps',
      prix: 39,
      caracteristiques: [
        'Fibre optique',
        'Débit symétrique',
        'Installation offerte',
        'Routeur 4G'
      ],
      populaire: false
    },
    {
      id: 4,
      nom: 'Fibre Pro',
      type: 'FIBRE',
      categorie: 'Professionnel',
      vitesse: '50 Mbps',
      prix: 45,
      prixOriginal: 55,
      caracteristiques: [
        'Fibre optique FTTH',
        'Débit 50 Mbps',
        'IP fixe inclus',
        'Support prioritaire',
        'Garantie 99.9%'
      ],
      miseEnAvant: true,
      populaire: true,
      promotion: {
        libelle: 'Plus populaire',
        dateFin: '30/06/2024'
      }
    },
    {
      id: 5,
      nom: 'Fibre Business',
      type: 'FIBRE',
      categorie: 'Entreprise',
      vitesse: '100 Mbps',
      prix: 69,
      caracteristiques: [
        'Débit 100 Mbps',
        'Routeur Gaming',
        'TV sur IP incluse',
        'Support 24/7',
        'Contrat 24 mois'
      ],
      populaire: false
    },
    
    // Offres MOBILE
    {
      id: 6,
      nom: 'Mobile Start',
      type: 'MOBILE',
      categorie: 'Économique',
      vitesse: '10 Go',
      prix: 15,
      caracteristiques: [
        '10 Go internet',
        'Appels illimités',
        'SMS illimités',
        'Réseau 4G'
      ],
      populaire: false
    },
    {
      id: 7,
      nom: 'Mobile Pro',
      type: 'MOBILE',
      categorie: 'Professionnel',
      vitesse: '25 Go',
      prix: 25,
      caracteristiques: [
        '25 Go internet',
        '5G incluse',
        'Appels internationaux',
        'Roaming 5 Go'
      ],
      populaire: true
    },
    {
      id: 8,
      nom: 'Mobile Premium',
      type: 'MOBILE',
      categorie: 'Premium',
      vitesse: 'Illimité',
      prix: 60,
      caracteristiques: [
        'Internet illimité',
        '5G ultra-rapide',
        'Roaming 10 Go',
        'Services divertissement gratuits'
      ],
      populaire: false
    },
    
    // Offres PACK
    {
      id: 9,
      nom: 'Pack Famille',
      type: 'PACK',
      categorie: 'Familial',
      vitesse: 'Fibre + Mobile',
      prix: 59,
      prixOriginal: 70,
      caracteristiques: [
        'Fibre 20 Mbps',
        'Mobile 10 Go',
        'TV sur IP incluse',
        'Économie 20%',
        'Facture unique'
      ],
      populaire: true,
      promotion: {
        libelle: 'Économie 20%',
        dateFin: '31/03/2024'
      }
    }
  ]);

  // État pour le filtre
  const [filterType, setFilterType] = useState('tout');
  const [filteredOffers, setFilteredOffers] = useState(offres);

  // Statistiques
  const stats = {
    totalAbonnements: 3,
    depenseMensuelle: 80,
    prochainRenouvellement: '12/03/2025'
  };

  // Fonction de filtrage
  const filterOffers = (type) => {
    setFilterType(type);
    if (type === 'tout') {
      setFilteredOffers(offres);
    } else {
      const filtered = offres.filter(offer => offer.type === type);
      setFilteredOffers(filtered);
    }
  };

  // Fonction pour s'abonner
  const subscribeToOffer = (offer) => {
    console.log('Demande d\'abonnement :', offer);
    // Navigation vers la page de demande
    // navigate('/demande', { state: { offer } });
  };

  // Fonction pour modifier un abonnement
  const modifySubscription = (subscription) => {
    console.log('Demande de modification :', subscription);
    // navigate(`/demande/modification/${subscription.id}`);
  };

  // Fonction pour résilier un abonnement
  const cancelSubscription = (subscription) => {
    if (window.confirm(`Êtes-vous sûr de vouloir résilier l'abonnement ${subscription.nom} ?`)) {
      console.log('Demande de résiliation :', subscription);
      // navigate(`/demande/resiliation/${subscription.id}`);
    }
  };

  // Calculer l'économie
  const calculateSavings = (offer) => {
    if (offer.prixOriginal) {
      return Math.round(((offer.prixOriginal - offer.prix) / offer.prixOriginal) * 100);
    }
    return 0;
  };

  // Rendu des badges de statut
  const renderStatusBadge = (status) => {
    let className = 'subscription-status ';
    switch(status) {
      case 'ACTIF':
        className += 'actif';
        break;
      case 'EN_ATTENTE':
        className += 'en_attente';
        break;
      case 'RESILIE':
        className += 'resilie';
        break;
      default:
        className += 'actif';
    }
    return className;
  };

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-container">
        
        {/* En-tête de la page */}
        <div className="page-header">
          <h1>Mes Abonnements Tunisie Telecom</h1>
          <p className="page-description">
            Consultez et gérez vos abonnements Internet, Mobile et Fixe
          </p>
        </div>

        {/* Section 1 : Résumé des abonnements */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-list-alt"></i>
            </div>
            <div className="summary-content">
              <div className="summary-number">{stats.totalAbonnements}</div>
              <div className="summary-label">Abonnements actifs</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="summary-content">
              <div className="summary-number">{stats.depenseMensuelle} DT</div>
              <div className="summary-label">Dépense mensuelle</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="summary-content">
              <div className="summary-date">{stats.prochainRenouvellement}</div>
              <div className="summary-label">Prochain renouvellement</div>
            </div>
          </div>
        </div>

        {/* Section 2 : Mes abonnements actuels */}
        <div className="section-container">
          <div className="section-header">
            <h2><i className="fas fa-user-check"></i> Mes Abonnements Actuels</h2>
            <span className="badge">{userSubscriptions.length} services</span>
          </div>
          
          <div className="subscriptions-list">
            {userSubscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className={`subscription-card ${subscription.statut === 'ACTIF' ? 'actif' : ''}`}
              >
                <div className="subscription-header">
                  <div className="subscription-info">
                    <h3>{subscription.nom}</h3>
                    <span className="subscription-type">{subscription.type}</span>
                  </div>
                  <div className={renderStatusBadge(subscription.statut)}>
                    {subscription.statut}
                  </div>
                </div>
                
                <div className="subscription-details">
                  <div className="detail">
                    <span className="label">Prix :</span>
                    <span className="value">{subscription.prix} DT / mois</span>
                  </div>
                  <div className="detail">
                    <span className="label">Activation :</span>
                    <span className="value">{subscription.dateActivation}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Renouvellement :</span>
                    <span className="value">{subscription.dateRenouvellement}</span>
                  </div>
                  {subscription.details && (
                    <div className="detail">
                      <span className="label">Détails :</span>
                      <span className="value">
                        {subscription.details.adresse && subscription.details.adresse}
                        {subscription.details.numeroTelephone && subscription.details.numeroTelephone}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="subscription-actions">
                  <button 
                    className="btn-modify" 
                    onClick={() => modifySubscription(subscription)}
                  >
                    <i className="fas fa-edit"></i> Modifier
                  </button>
                  <button className="btn-details">
                    <i className="fas fa-info-circle"></i> Détails
                  </button>
                  <button 
                    className="btn-cancel" 
                    onClick={() => cancelSubscription(subscription)}
                  >
                    <i className="fas fa-times"></i> Résilier
                  </button>
                </div>
              </div>
            ))}
            
            {/* Carte pour ajouter un nouvel abonnement */}
            <div className="subscription-card add-card">
              <div className="add-content">
                <i className="fas fa-plus-circle"></i>
                <h3>Souscrire à un nouveau service</h3>
                <p>Découvrez nos offres et ajoutez un nouvel abonnement</p>
                <button className="btn-add" onClick={() => document.querySelector('.section-container:nth-child(4)').scrollIntoView({ behavior: 'smooth' })}>
                  <i className="fas fa-search"></i> Voir les offres
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 : Catalogue des offres */}
        <div className="section-container">
          <div className="section-header">
            <h2><i className="fas fa-gift"></i> Catalogue des Offres</h2>
            <p className="section-subtitle">
              Choisissez l'abonnement qui correspond à vos besoins parmi notre sélection
            </p>
          </div>

          {/* Boutons de filtrage */}
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterType === 'tout' ? 'active' : ''}`}
              onClick={() => filterOffers('tout')}
            >
              <i className="fas fa-layer-group"></i> Toutes les offres
            </button>
            <button 
              className={`filter-btn ${filterType === 'ADSL' ? 'active' : ''}`}
              onClick={() => filterOffers('ADSL')}
            >
              <i className="fas fa-wifi"></i> ADSL
            </button>
            <button 
              className={`filter-btn ${filterType === 'FIBRE' ? 'active' : ''}`}
              onClick={() => filterOffers('FIBRE')}
            >
              <i className="fas fa-bolt"></i> Fibre Optique
            </button>
            <button 
              className={`filter-btn ${filterType === 'MOBILE' ? 'active' : ''}`}
              onClick={() => filterOffers('MOBILE')}
            >
              <i className="fas fa-mobile-alt"></i> Mobile
            </button>
            <button 
              className={`filter-btn ${filterType === 'PACK' ? 'active' : ''}`}
              onClick={() => filterOffers('PACK')}
            >
              <i className="fas fa-box"></i> Packs
            </button>
          </div>

          {/* Grille des offres */}
          <div className="offers-grid">
            {filteredOffers.map((offer) => (
              <div 
                key={offer.id} 
                className={`offer-card ${offer.miseEnAvant ? 'featured' : ''} ${offer.populaire ? 'popular' : ''}`}
              >
                
                {/* Badges */}
                {offer.miseEnAvant && (
                  <div className="offer-badge featured-badge">
                    <i className="fas fa-crown"></i> Recommandé
                  </div>
                )}
                
                {offer.populaire && !offer.miseEnAvant && (
                  <div className="offer-badge popular-badge">
                    <i className="fas fa-fire"></i> Populaire
                  </div>
                )}
                
                {offer.promotion && (
                  <div className="offer-badge promotion-badge">
                    <i className="fas fa-tag"></i> {offer.promotion.libelle}
                  </div>
                )}

                {/* En-tête de l'offre */}
                <div className="offer-header">
                  <span className="offer-category">{offer.categorie}</span>
                  <span className="offer-type">{offer.type}</span>
                </div>

                {/* Nom de l'offre */}
                <h3 className="offer-title">{offer.nom}</h3>
                
                {/* Vitesse/Débit */}
                <div className="offer-speed">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>{offer.vitesse}</span>
                </div>

                {/* Caractéristiques */}
                <ul className="offer-features">
                  {offer.caracteristiques.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Prix */}
                <div className="offer-price">
                  {offer.prixOriginal && (
                    <div className="original-price">
                      {offer.prixOriginal} DT
                    </div>
                  )}
                  <div className="current-price">
                    {offer.prix} DT / mois
                  </div>
                  {offer.prixOriginal && (
                    <div className="savings">
                      Économisez {calculateSavings(offer)}%
                    </div>
                  )}
                </div>

                {/* Bouton d'abonnement */}
                <button className="btn-subscribe" onClick={() => subscribeToOffer(offer)}>
                  <i className="fas fa-shopping-cart"></i>
                  Souscrire maintenant
                </button>

                {/* Pied de l'offre */}
                <div className="offer-footer">
                  <span className="offer-note">
                    <i className="fas fa-info-circle"></i>
                    Sans engagement caché
                  </span>
                  {offer.promotion && (
                    <span className="offer-promo">
                      <i className="fas fa-clock"></i>
                      Jusqu'au {offer.promotion.dateFin}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 : Assistance */}
        <div className="assistance-container">
          <div className="assistance-content">
            <i className="fas fa-headset"></i>
            <h3>Besoin d'aide pour choisir ?</h3>
            <p>Nos conseillers sont à votre disposition pour vous guider vers l'offre la plus adaptée</p>
            <button className="btn-assistance" onClick={() => navigate('/support')}>
              <i className="fas fa-phone-alt"></i> Contacter le support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Subscriptions;