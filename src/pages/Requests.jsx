
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/Requests.css';

// Types d'énumération
const TypeDemande = {
  NOUVELLE_SOUSCRIPTION: 'NOUVELLE_SOUSCRIPTION',
  MODIFICATION: 'MODIFICATION',
  RESILIATION: 'RESILIATION',
  SUPPORT: 'SUPPORT',
  REINITIALISATION: 'REINITIALISATION',
  AUTRE: 'AUTRE'
};

const StatutDemande = {
  EN_ATTENTE: 'EN_ATTENTE',
  EN_COURS: 'EN_COURS',
  APPROUVEE: 'APPROUVEE',
  TERMINEE: 'TERMINEE',
  REJETEE: 'REJETEE',
  ANNULEE: 'ANNULEE'
};

const PrioriteDemande = {
  BASSE: 'BASSE',
  NORMALE: 'NORMALE',
  HAUTE: 'HAUTE',
  URGENTE: 'URGENTE'
};

// Données mockées
const demandesMock = [
  {
    id: 1,
    numero: 'DEM-2024-003',
    titre: 'Résiliation ligne fixe',
    type: 'RESILIATION',
    description: 'Je souhaite résilier ma ligne fixe car je n\'en ai plus l\'utilité.',
    statut: 'EN_ATTENTE',
    priorite: 'BASSE',
    dateCreation: '2024-01-20T01:00:00',
    dateModification: '2024-01-20T01:00:00',
    createdBy: { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
    abonnementId: 1003,
    historique: [
      {
        id: 1,
        nouveauStatut: 'EN_ATTENTE',
        date: '2024-01-20T01:00:00',
        modifiePar: { id: 1, nom: 'Mohamed Ben Ali' },
        raison: 'Demande créée'
      }
    ],
    commentaires: []
  },
  {
    id: 2,
    numero: 'DEM-2024-004',
    titre: 'Problème de connexion fibre',
    type: 'SUPPORT',
    description: 'Ma connexion fibre est intermittente depuis 2 jours.',
    statut: 'EN_ATTENTE',
    priorite: 'HAUTE',
    dateCreation: '2024-01-19T01:00:00',
    dateModification: '2024-01-19T01:00:00',
    createdBy: { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
    abonnementId: 1001,
    historique: [
      {
        id: 1,
        nouveauStatut: 'EN_ATTENTE',
        date: '2024-01-19T01:00:00',
        modifiePar: { id: 1, nom: 'Mohamed Ben Ali' },
        raison: 'Demande créée'
      }
    ],
    commentaires: []
  },
  {
    id: 3,
    numero: 'DEM-2024-002',
    titre: 'Changement d\'offre ADSL 8 → Fibre 20',
    type: 'MODIFICATION',
    description: 'Je souhaite passer de l\'offre ADSL 8 Mbps à Fibre 20 Mbps.',
    statut: 'EN_COURS',
    priorite: 'NORMALE',
    dateCreation: '2024-01-18T01:00:00',
    dateModification: '2024-01-18T01:00:00',
    createdBy: { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
    abonnementId: null,
    offreId: 3,
    historique: [
      {
        id: 1,
        nouveauStatut: 'EN_ATTENTE',
        date: '2024-01-18T01:00:00',
        modifiePar: { id: 1, nom: 'Mohamed Ben Ali' },
        raison: 'Demande créée'
      },
      {
        id: 2,
        nouveauStatut: 'EN_COURS',
        date: '2024-01-18T14:00:00',
        modifiePar: { id: 2, nom: 'Admin Support', role: 'ADMIN' },
        raison: 'En traitement par le service technique'
      }
    ],
    commentaires: [
      {
        id: 1,
        contenu: 'Votre demande est en cours d\'examen par notre équipe technique.',
        date: '2024-01-18T14:30:00',
        auteur: { id: 2, nom: 'Support Technique', role: 'ADMIN' }
      }
    ]
  },
  {
    id: 4,
    numero: 'DEM-2024-001',
    titre: 'Souscription Fibre 100 Mbps',
    type: 'NOUVELLE_SOUSCRIPTION',
    description: 'Je souhaite souscrire à l\'offre Fibre 100 Mbps pour mon domicile.',
    statut: 'APPROUVEE',
    priorite: 'NORMALE',
    dateCreation: '2024-01-15T01:00:00',
    dateModification: '2024-01-16T10:00:00',
    createdBy: { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
    abonnementId: null,
    offreId: 5,
    historique: [
      {
        id: 1,
        nouveauStatut: 'EN_ATTENTE',
        date: '2024-01-15T01:00:00',
        modifiePar: { id: 1, nom: 'Mohamed Ben Ali' },
        raison: 'Demande créée'
      },
      {
        id: 2,
        nouveauStatut: 'EN_COURS',
        date: '2024-01-15T10:00:00',
        modifiePar: { id: 3, nom: 'Agent Commercial', role: 'ADMIN' },
        raison: 'En vérification'
      },
      {
        id: 3,
        nouveauStatut: 'APPROUVEE',
        date: '2024-01-16T10:00:00',
        modifiePar: { id: 4, nom: 'Manager', role: 'ADMIN' },
        raison: 'Demande approuvée'
      }
    ],
    commentaires: [
      {
        id: 1,
        contenu: 'Votre demande a été reçue et est en cours de traitement.',
        date: '2024-01-15T10:15:00',
        auteur: { id: 3, nom: 'Agent Commercial', role: 'ADMIN' }
      },
      {
        id: 2,
        contenu: 'Félicitations ! Votre demande a été approuvée. Un technicien vous contactera pour la mise en service.',
        date: '2024-01-16T10:30:00',
        auteur: { id: 4, nom: 'Manager', role: 'ADMIN' }
      }
    ]
  }
];

// Données mockées pour les abonnements
const mesAbonnementsMock = [
  {
    id: 1001,
    nom: 'Fibre Pro 50 Mbps',
    type: 'FIBRE',
    statut: 'ACTIF',
    prix: 45,
    dateActivation: '12/03/2024',
    dateRenouvellement: '12/03/2025'
  },
  {
    id: 1002,
    nom: 'Forfait Mobile 25 Go',
    type: 'MOBILE',
    statut: 'ACTIF',
    prix: 25,
    dateActivation: '15/01/2024',
    dateRenouvellement: '15/02/2025'
  },
  {
    id: 1003,
    nom: 'Ligne Fixe Classique',
    type: 'FIXE',
    statut: 'ACTIF',
    prix: 10,
    dateActivation: '01/06/2023',
    dateRenouvellement: '01/06/2024'
  }
];

// Données mockées pour les offres
const offresDisponiblesMock = [
  {
    id: 1,
    nom: 'ADSL Start',
    type: 'ADSL',
    categorie: 'Économique',
    vitesse: '4 Mbps',
    prix: 25
  },
  {
    id: 3,
    nom: 'Fibre Essential',
    type: 'FIBRE',
    categorie: 'Personnel',
    vitesse: '20 Mbps',
    prix: 39
  },
  {
    id: 4,
    nom: 'Fibre Pro',
    type: 'FIBRE',
    categorie: 'Professionnel',
    vitesse: '50 Mbps',
    prix: 45
  },
  {
    id: 5,
    nom: 'Fibre Business',
    type: 'FIBRE',
    categorie: 'Entreprise',
    vitesse: '100 Mbps',
    prix: 69
  }
];

const Requests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // États
  const [demandes, setDemandes] = useState(demandesMock);
  const [demandesFiltrees, setDemandesFiltrees] = useState(demandesMock);
  const [demandeSelectionnee, setDemandeSelectionnee] = useState(null);
  const [mesAbonnements, setMesAbonnements] = useState(mesAbonnementsMock);
  const [offresDisponibles, setOffresDisponibles] = useState(offresDisponiblesMock);
  
  // Formulaires
  const [demandeForm, setDemandeForm] = useState({
    type: '',
    titre: '',
    description: '',
    priorite: PrioriteDemande.NORMALE,
    abonnementId: '',
    offreId: ''
  });
  
  const [commentaireForm, setCommentaireForm] = useState({
    commentaire: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // Filtres
  const [filtreType, setFiltreType] = useState('TOUS');
  const [filtreStatut, setFiltreStatut] = useState('TOUS');
  const [filtrePriorite, setFiltrePriorite] = useState('TOUS');
  const [termeRecherche, setTermeRecherche] = useState('');
  
  // État
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // À déterminer via un service d'authentification
  
  // Statistiques
  const [statistiques, setStatistiques] = useState({
    total: 0,
    enAttente: 0,
    enCours: 0,
    resolues: 0,
    tauxResolution: '0'
  });
  
  // Constantes pour les listes déroulantes
  const typesDemande = Object.values(TypeDemande);
  const statutsDemande = Object.values(StatutDemande);
  const prioritesDemande = Object.values(PrioriteDemande);
  
  // Initialisation
  useEffect(() => {
    calculerStatistiques();
    
    // Vérification des paramètres URL
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const offreId = queryParams.get('offreId');
    
    if (type) {
      setFiltreType(type);
      appliquerFiltres(type, filtreStatut, filtrePriorite, termeRecherche);
    }
    
    if (offreId) {
      setShowForm(true);
      setDemandeForm(prev => ({
        ...prev,
        type: TypeDemande.NOUVELLE_SOUSCRIPTION,
        offreId: offreId
      }));
    }
  }, []);
  
  // Mise à jour des statistiques lorsque les demandes changent
  useEffect(() => {
    calculerStatistiques();
  }, [demandes]);
  
  // Calcul des statistiques
  const calculerStatistiques = () => {
    const total = demandes.length;
    const enAttente = demandes.filter(d => 
      d.statut === StatutDemande.EN_ATTENTE
    ).length;
    const enCours = demandes.filter(d => 
      d.statut === StatutDemande.EN_COURS
    ).length;
    const resolues = demandes.filter(d => 
      d.statut === StatutDemande.TERMINEE || 
      d.statut === StatutDemande.APPROUVEE
    ).length;
    
    const tauxResolution = total > 0 ? ((resolues / total) * 100).toFixed(1) : '0';
    
    setStatistiques({
      total,
      enAttente,
      enCours,
      resolues,
      tauxResolution
    });
  };
  
  // Application des filtres
  const appliquerFiltres = () => {
    let resultats = [...demandes];
    
    // Filtrage par type
    if (filtreType !== 'TOUS') {
      resultats = resultats.filter(d => d.type === filtreType);
    }
    
    // Filtrage par statut
    if (filtreStatut !== 'TOUS') {
      resultats = resultats.filter(d => d.statut === filtreStatut);
    }
    
    // Filtrage par priorité
    if (filtrePriorite !== 'TOUS') {
      resultats = resultats.filter(d => d.priorite === filtrePriorite);
    }
    
    // Recherche textuelle
    if (termeRecherche.trim()) {
      const terme = termeRecherche.toLowerCase();
      resultats = resultats.filter(d =>
        d.numero.toLowerCase().includes(terme) ||
        d.titre.toLowerCase().includes(terme) ||
        d.description.toLowerCase().includes(terme)
      );
    }
    
    setDemandesFiltrees(resultats);
  };
  
  // Réinitialisation des filtres
  const reinitialiserFiltres = () => {
    setFiltreType('TOUS');
    setFiltreStatut('TOUS');
    setFiltrePriorite('TOUS');
    setTermeRecherche('');
    setDemandesFiltrees(demandes);
  };
  
  // Gestion du changement de type de demande
  const handleTypeChange = (type) => {
    setDemandeForm(prev => ({
      ...prev,
      type,
      abonnementId: type === TypeDemande.NOUVELLE_SOUSCRIPTION ? '' : prev.abonnementId,
      offreId: type === TypeDemande.NOUVELLE_SOUSCRIPTION ? prev.offreId : ''
    }));
  };
  
  // Validation du formulaire
  const validerFormulaire = () => {
    const errors = {};
    
    if (!demandeForm.type) {
      errors.type = 'Le type de demande est requis';
    }
    
    if (!demandeForm.titre || demandeForm.titre.length < 5) {
      errors.titre = 'Le titre doit contenir au moins 5 caractères';
    }
    
    if (!demandeForm.description || demandeForm.description.length < 20) {
      errors.description = 'La description doit contenir au moins 20 caractères';
    }
    
    if ((demandeForm.type === TypeDemande.MODIFICATION || demandeForm.type === TypeDemande.RESILIATION) && 
        !demandeForm.abonnementId) {
      errors.abonnementId = 'La sélection d\'un abonnement est requise';
    }
    
    if (demandeForm.type === TypeDemande.NOUVELLE_SOUSCRIPTION && !demandeForm.offreId) {
      errors.offreId = 'La sélection d\'une offre est requise';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Création d'une nouvelle demande
  const soumettreDemande = (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Générer un nouveau numéro de demande
    const dernierId = Math.max(...demandes.map(d => d.id));
    const nouveauNumero = `DEM-2024-${String(dernierId + 1).padStart(3, '0')}`;
    
    const nouvelleDemande = {
      id: dernierId + 1,
      numero: nouveauNumero,
      titre: demandeForm.titre,
      type: demandeForm.type,
      description: demandeForm.description,
      statut: StatutDemande.EN_ATTENTE,
      priorite: demandeForm.priorite,
      dateCreation: new Date().toISOString(),
      dateModification: new Date().toISOString(),
      createdBy: { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
      abonnementId: demandeForm.abonnementId || null,
      offreId: demandeForm.offreId || null,
      historique: [
        {
          id: 1,
          nouveauStatut: StatutDemande.EN_ATTENTE,
          date: new Date().toISOString(),
          modifiePar: { id: 1, nom: 'Mohamed Ben Ali' },
          raison: 'Demande créée'
        }
      ],
      commentaires: []
    };
    
    // Simuler un délai d'envoi
    setTimeout(() => {
      setDemandes(prev => [nouvelleDemande, ...prev]);
      setDemandesFiltrees(prev => [nouvelleDemande, ...prev]);
      setDemandeForm({
        type: '',
        titre: '',
        description: '',
        priorite: PrioriteDemande.NORMALE,
        abonnementId: '',
        offreId: ''
      });
      setShowForm(false);
      setIsSubmitting(false);
      setFormErrors({});
      
      alert('Demande créée avec succès!');
    }, 1000);
  };
  
  // Affichage des détails de la demande
  const afficherDetails = (demande) => {
    setDemandeSelectionnee(demande);
    setShowDetails(true);
  };
  
  // Fermer les détails
  const fermerDetails = () => {
    setShowDetails(false);
    setDemandeSelectionnee(null);
  };
  
  // Ajout d'un commentaire
  const ajouterCommentaire = (e) => {
    e.preventDefault();
    
    if (!commentaireForm.commentaire || commentaireForm.commentaire.length < 3) {
      alert('Le commentaire doit contenir au moins 3 caractères');
      return;
    }
    
    if (!demandeSelectionnee) return;
    
    const nouveauCommentaire = {
      id: demandeSelectionnee.commentaires.length + 1,
      contenu: commentaireForm.commentaire,
      date: new Date().toISOString(),
      auteur: isAdmin 
        ? { id: 99, nom: 'Administrateur', role: 'ADMIN' }
        : { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' }
    };
    
    const demandesMisesAJour = demandes.map(d => {
      if (d.id === demandeSelectionnee.id) {
        return {
          ...d,
          commentaires: [...d.commentaires, nouveauCommentaire],
          dateModification: new Date().toISOString()
        };
      }
      return d;
    });
    
    setDemandes(demandesMisesAJour);
    setDemandeSelectionnee(prev => ({
      ...prev,
      commentaires: [...prev.commentaires, nouveauCommentaire],
      dateModification: new Date().toISOString()
    }));
    setCommentaireForm({ commentaire: '' });
    
    alert('Commentaire ajouté avec succès');
  };
  
  // Changement de statut de la demande (pour les administrateurs)
  const changerStatut = (demande, nouveauStatut) => {
    if (window.confirm('Êtes-vous sûr de vouloir modifier le statut de cette demande ?')) {
      const nouvelHistorique = {
        id: demande.historique.length + 1,
        nouveauStatut: nouveauStatut,
        date: new Date().toISOString(),
        modifiePar: isAdmin 
          ? { id: 99, nom: 'Administrateur', role: 'ADMIN' }
          : { id: 1, nom: 'Mohamed Ben Ali', role: 'CLIENT' },
        raison: 'Mise à jour manuelle'
      };
      
      const demandesMisesAJour = demandes.map(d => {
        if (d.id === demande.id) {
          return {
            ...d,
            statut: nouveauStatut,
            dateModification: new Date().toISOString(),
            historique: [...d.historique, nouvelHistorique]
          };
        }
        return d;
      });
      
      setDemandes(demandesMisesAJour);
      
      if (demandeSelectionnee && demandeSelectionnee.id === demande.id) {
        setDemandeSelectionnee(prev => ({
          ...prev,
          statut: nouveauStatut,
          dateModification: new Date().toISOString(),
          historique: [...prev.historique, nouvelHistorique]
        }));
      }
      
      appliquerFiltres();
      alert('Statut mis à jour avec succès');
    }
  };
  
  // Exportation des demandes (pour les administrateurs)
  const exporterDemandes = (format = 'csv') => {
    alert(`Exportation en ${format.toUpperCase()} démarrée`);
  };
  
  // Aide : obtenir la couleur du statut
  const getStatutColor = (statut) => {
    switch (statut) {
      case StatutDemande.EN_ATTENTE: return 'warning';
      case StatutDemande.EN_COURS: return 'info';
      case StatutDemande.APPROUVEE: return 'success';
      case StatutDemande.TERMINEE: return 'secondary';
      case StatutDemande.REJETEE: return 'danger';
      case StatutDemande.ANNULEE: return 'dark';
      default: return 'secondary';
    }
  };
  
  // Aide : obtenir l'icône du statut
  const getStatutIcon = (statut) => {
    switch (statut) {
      case StatutDemande.EN_ATTENTE: return 'fas fa-clock';
      case StatutDemande.EN_COURS: return 'fas fa-spinner fa-spin';
      case StatutDemande.APPROUVEE: return 'fas fa-check-circle';
      case StatutDemande.TERMINEE: return 'fas fa-flag-checkered';
      case StatutDemande.REJETEE: return 'fas fa-times-circle';
      case StatutDemande.ANNULEE: return 'fas fa-ban';
      default: return 'fas fa-question-circle';
    }
  };
  
  // Aide : obtenir la couleur de la priorité
  const getPrioriteColor = (priorite) => {
    switch (priorite) {
      case PrioriteDemande.BASSE: return 'success';
      case PrioriteDemande.NORMALE: return 'info';
      case PrioriteDemande.HAUTE: return 'warning';
      case PrioriteDemande.URGENTE: return 'danger';
      default: return 'secondary';
    }
  };
  
  // Aide : formater la date
  const formaterDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Aide : calculer la durée de la demande
  const calculerDuree = (demande) => {
    const dateCreation = new Date(demande.dateCreation);
    const dateActuelle = new Date();
    const diffMs = dateActuelle.getTime() - dateCreation.getTime();
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffJours === 0) return 'Aujourd\'hui';
    if (diffJours === 1) return 'Hier';
    if (diffJours < 7) return `Il y a ${diffJours} jours`;
    if (diffJours < 30) return `Il y a ${Math.floor(diffJours / 7)} semaines`;
    return `Il y a ${Math.floor(diffJours / 30)} mois`;
  };
  
  // Mise à jour des filtres lorsque les valeurs changent
  useEffect(() => {
    appliquerFiltres();
  }, [filtreType, filtreStatut, filtrePriorite, termeRecherche, demandes]);

  return (
    <div className="requests-page">
      <div className="requests-container">
        
        {/* En-tête de page */}
        <div className="page-header">
          <div className="header-content">
            <h1> 
              <i className="fas fa-tasks"></i>
              Gestion des Demandes
            </h1>
            <p className="page-description">
              Suivez et gérez toutes vos demandes auprès de Tunisie Telecom
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-new-request" onClick={() => setShowForm(!showForm)}>
              <i className="fas fa-plus"></i>
              Nouvelle Demande
            </button>
            {isAdmin && (
              <button className="btn-export" onClick={() => exporterDemandes('csv')}>
                <i className="fas fa-download"></i>
                Exporter
              </button>
            )}
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="stats-cards">
          <div className="stat-card total">
            <div className="stat-icon">
              <i className="fas fa-inbox"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{statistiques.total}</div>
              <div className="stat-label">Demandes totales</div>
            </div>
          </div>
          
          <div className="stat-card pending">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{statistiques.enAttente}</div>
              <div className="stat-label">En attente</div>
            </div>
          </div>
          
          <div className="stat-card in-progress">
            <div className="stat-icon">
              <i className="fas fa-spinner"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{statistiques.enCours}</div>
              <div className="stat-label">En cours</div>
            </div>
          </div>
          
          <div className="stat-card resolved">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{statistiques.resolues}</div>
              <div className="stat-label">Résolues</div>
            </div>
          </div>
          
          <div className="stat-card rate">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{statistiques.tauxResolution}%</div>
              <div className="stat-label">Taux de résolution</div>
            </div>
          </div>
        </div>

        {/* Formulaire de nouvelle demande */}
        {showForm && (
          <div className="form-container">
            <div className="form-header">
              <h3><i className="fas fa-file-alt"></i> Nouvelle Demande</h3>
              <button className="btn-close-form" onClick={() => setShowForm(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={soumettreDemande} className="request-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">
                    <i className="fas fa-tag"></i> Type de demande *
                  </label>
                  <select 
                    id="type" 
                    value={demandeForm.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className={`form-control ${formErrors.type ? 'is-invalid' : ''}`}
                  >
                    <option value="">Sélectionnez un type</option>
                    {typesDemande.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formErrors.type && (
                    <div className="invalid-feedback">
                      {formErrors.type}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="priorite">
                    <i className="fas fa-exclamation-circle"></i> Priorité
                  </label>
                  <select 
                    id="priorite" 
                    value={demandeForm.priorite}
                    onChange={(e) => setDemandeForm(prev => ({ ...prev, priorite: e.target.value }))}
                    className="form-control"
                  >
                    {prioritesDemande.map((priorite) => (
                      <option key={priorite} value={priorite}>{priorite}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="titre">
                  <i className="fas fa-heading"></i> Titre *
                </label>
                <input 
                  type="text" 
                  id="titre" 
                  value={demandeForm.titre}
                  onChange={(e) => setDemandeForm(prev => ({ ...prev, titre: e.target.value }))}
                  className={`form-control ${formErrors.titre ? 'is-invalid' : ''}`}
                  placeholder="Ex: Souscription Fibre 100 Mbps"
                />
                {formErrors.titre && (
                  <div className="invalid-feedback">
                    {formErrors.titre}
                  </div>
                )}
              </div>
              
              {/* Champ sélection abonnement */}
              {(demandeForm.type === 'MODIFICATION' || 
                demandeForm.type === 'RESILIATION') && (
                <div className="form-group">
                  <label htmlFor="abonnementId">
                    <i className="fas fa-sim-card"></i> Abonnement concerné *
                  </label>
                  <select 
                    id="abonnementId" 
                    value={demandeForm.abonnementId}
                    onChange={(e) => setDemandeForm(prev => ({ ...prev, abonnementId: e.target.value }))}
                    className={`form-control ${formErrors.abonnementId ? 'is-invalid' : ''}`}
                  >
                    <option value="">Sélectionnez un abonnement</option>
                    {mesAbonnements.map((abonnement) => (
                      <option key={abonnement.id} value={abonnement.id}>
                        {abonnement.nom} - {abonnement.prix} DT/mois
                      </option>
                    ))}
                  </select>
                  {formErrors.abonnementId && (
                    <div className="invalid-feedback">
                      {formErrors.abonnementId}
                    </div>
                  )}
                </div>
              )}
              
              {/* Champ sélection offre */}
              {demandeForm.type === 'NOUVELLE_SOUSCRIPTION' && (
                <div className="form-group">
                  <label htmlFor="offreId">
                    <i className="fas fa-gift"></i> Offre souhaitée *
                  </label>
                  <select 
                    id="offreId" 
                    value={demandeForm.offreId}
                    onChange={(e) => setDemandeForm(prev => ({ ...prev, offreId: e.target.value }))}
                    className={`form-control ${formErrors.offreId ? 'is-invalid' : ''}`}
                  >
                    <option value="">Sélectionnez une offre</option>
                    {offresDisponibles.map((offre) => (
                      <option key={offre.id} value={offre.id}>
                        {offre.nom} - {offre.vitesse} - {offre.prix} DT/mois
                      </option>
                    ))}
                  </select>
                  {formErrors.offreId && (
                    <div className="invalid-feedback">
                      {formErrors.offreId}
                    </div>
                  )}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="description">
                  <i className="fas fa-align-left"></i> Description détaillée *
                </label>
                <textarea 
                  id="description" 
                  value={demandeForm.description}
                  onChange={(e) => setDemandeForm(prev => ({ ...prev, description: e.target.value }))}
                  className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                  rows="4"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
                {formErrors.description && (
                  <div className="invalid-feedback">
                    {formErrors.description}
                  </div>
                )}
                <div className="form-help">
                  <i className="fas fa-info-circle"></i>
                  Soyez aussi précis que possible pour un traitement rapide
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Envoyer la demande
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="filters-container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              value={termeRecherche}
              onChange={(e) => setTermeRecherche(e.target.value)}
              placeholder="Rechercher par numéro, titre ou description..."
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label><i className="fas fa-filter"></i> Filtres :</label>
              <select value={filtreType} onChange={(e) => setFiltreType(e.target.value)} className="filter-select">
                <option value="TOUS">Tous les types</option>
                {typesDemande.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)} className="filter-select">
                <option value="TOUS">Tous les statuts</option>
                {statutsDemande.map((statut) => (
                  <option key={statut} value={statut}>{statut}</option>
                ))}
              </select>
              
              <select value={filtrePriorite} onChange={(e) => setFiltrePriorite(e.target.value)} className="filter-select">
                <option value="TOUS">Toutes priorités</option>
                {prioritesDemande.map((priorite) => (
                  <option key={priorite} value={priorite}>{priorite}</option>
                ))}
              </select>
            </div>
            
            <button className="btn-reset-filters" onClick={reinitialiserFiltres}>
              <i className="fas fa-redo"></i>
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="requests-list-container">
          <div className="requests-header">
            <h3>
              <i className="fas fa-list"></i>
              Liste des Demandes
              <span className="badge-count">{demandesFiltrees.length}</span>
            </h3>
          </div>
          
          {isLoading ? (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
              <p>Chargement des demandes...</p>
            </div>
          ) : demandesFiltrees.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox fa-3x"></i>
              <h4>Aucune demande trouvée</h4>
              <p>Commencez par créer votre première demande</p>
              <button className="btn-new-request" onClick={() => setShowForm(true)}>
                <i className="fas fa-plus"></i>
                Créer une demande
              </button>
            </div>
          ) : (
            <div className="requests-list">
              {demandesFiltrees.map((demande) => (
                <div 
                  key={demande.id} 
                  className={`request-card ${demandeSelectionnee?.id === demande.id ? 'selected' : ''}`}
                >
                  <div className="request-header">
                    <div className="request-info">
                      <div className="request-number">{demande.numero}</div>
                      <h4 className="request-title">{demande.titre}</h4>
                      <div className="request-meta">
                        <span className="request-type">{demande.type}</span>
                        <span className="request-date">
                          <i className="far fa-calendar"></i>
                          {formaterDate(demande.dateCreation)}
                        </span>
                      </div>
                    </div>
                    <div className="request-status">
                      <span 
                        className={`status-badge status-${getStatutColor(demande.statut)}`}
                      >
                        <i className={getStatutIcon(demande.statut)}></i>
                        {demande.statut}
                      </span>
                      <span 
                        className={`priority-badge priority-${getPrioriteColor(demande.priorite)}`}
                      >
                        {demande.priorite}
                      </span>
                    </div>
                  </div>
                  
                  <div className="request-body">
                    <p className="request-description">{demande.description}</p>
                    <div className="request-details">
                      <span className="detail-item">
                        <i className="far fa-user"></i>
                        {demande.createdBy.nom}
                      </span>
                      <span className="detail-item">
                        <i className="far fa-clock"></i>
                        {calculerDuree(demande)}
                      </span>
                      {demande.commentaires.length > 0 && (
                        <span className="detail-item">
                          <i className="far fa-comment"></i>
                          {demande.commentaires.length} commentaire(s)
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="request-actions">
                    <button className="btn-details" onClick={() => afficherDetails(demande)}>
                      <i className="fas fa-eye"></i>
                      Détails
                    </button>
                    
                    {/* Actions administrateur */}
                    {isAdmin && (
                      <div className="admin-actions">
                        <select 
                          className="status-select"
                          onChange={(e) => changerStatut(demande, e.target.value)}
                          value=""
                        >
                          <option value="">Changer statut</option>
                          {statutsDemande.map((statut) => (
                            <option 
                              key={statut} 
                              value={statut} 
                              disabled={statut === demande.statut}
                            >
                              {statut}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panneau de détails */}
        {showDetails && demandeSelectionnee && (
          <div className="details-panel">
            <div className="details-header">
              <h3>
                <i className="fas fa-file-alt"></i>
                Détails de la Demande {demandeSelectionnee.numero}
              </h3>
              <button className="btn-close-details" onClick={fermerDetails}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="details-content">
              {/* Informations générales */}
              <div className="detail-section">
                <h4><i className="fas fa-info-circle"></i> Informations Générales</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Titre :</span>
                    <span className="detail-value">{demandeSelectionnee.titre}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Type :</span>
                    <span className="detail-value">{demandeSelectionnee.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Statut :</span>
                    <span className={`detail-value status-badge status-${getStatutColor(demandeSelectionnee.statut)}`}>
                      {demandeSelectionnee.statut}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Priorité :</span>
                    <span className={`detail-value priority-badge priority-${getPrioriteColor(demandeSelectionnee.priorite)}`}>
                      {demandeSelectionnee.priorite}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date création :</span>
                    <span className="detail-value">{formaterDate(demandeSelectionnee.dateCreation)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dernière modification :</span>
                    <span className="detail-value">{formaterDate(demandeSelectionnee.dateModification)}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="detail-section">
                <h4><i className="fas fa-align-left"></i> Description</h4>
                <div className="description-box">
                  {demandeSelectionnee.description}
                </div>
              </div>
              
              {/* Historique */}
              <div className="detail-section">
                <h4><i className="fas fa-history"></i> Historique du Statut</h4>
                <div className="historique-timeline">
                  {demandeSelectionnee.historique.map((historique) => (
                    <div key={historique.id} className="timeline-item">
                      <div className="timeline-icon">
                        <i className={getStatutIcon(historique.nouveauStatut)}></i>
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-statut">{historique.nouveauStatut}</span>
                          <span className="timeline-date">{formaterDate(historique.date)}</span>
                        </div>
                        <div className="timeline-body">
                          <div className="timeline-auteur">
                            <i className="fas fa-user"></i>
                            {historique.modifiePar.nom}
                          </div>
                          {historique.raison && (
                            <div className="timeline-raison">
                              <i className="fas fa-comment"></i>
                              {historique.raison}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Commentaires */}
              <div className="detail-section">
                <h4><i className="fas fa-comments"></i> Commentaires</h4>
                <div className="commentaires-list">
                  {demandeSelectionnee.commentaires.length === 0 ? (
                    <div className="no-comments">
                      <i className="far fa-comment-dots"></i>
                      <p>Aucun commentaire pour le moment</p>
                    </div>
                  ) : (
                    demandeSelectionnee.commentaires.map((commentaire) => (
                      <div key={commentaire.id} className="commentaire">
                        <div className="commentaire-header">
                          <div className="commentaire-auteur">
                            <i className="fas fa-user"></i>
                            {commentaire.auteur.nom}
                            {commentaire.auteur.role === 'ADMIN' && (
                              <span className="badge-admin">Administrateur</span>
                            )}
                          </div>
                          <div className="commentaire-date">
                            {formaterDate(commentaire.date)}
                          </div>
                        </div>
                        <div className="commentaire-contenu">
                          {commentaire.contenu}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Formulaire d'ajout de commentaire */}
                <form onSubmit={ajouterCommentaire} className="commentaire-form">
                  <textarea 
                    value={commentaireForm.commentaire}
                    onChange={(e) => setCommentaireForm({ commentaire: e.target.value })}
                    className="form-control"
                    placeholder="Ajouter un commentaire..."
                    rows="3"
                  ></textarea>
                  <div className="commentaire-actions">
                    <button 
                      type="submit" 
                      className="btn-add-comment"
                      disabled={!commentaireForm.commentaire}
                    >
                      <i className="fas fa-paper-plane"></i>
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Requests;
