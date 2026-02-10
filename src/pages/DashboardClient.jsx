import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../components/DashboardClient.css";

const DashboardClient = () => {
  const navigate = useNavigate();
  
  // Données utilisateur
  const [user, setUser] = useState({
    nom: "Ben Ali",
    prenom: "Mohamed",
    email: "mohamed.benali@example.com",
    telephone: "+216 20 123 456",
    adresse: "Rue Habib Bourguiba, Tunis",
    ville: "Tunis",
    codePostal: "1000"
  });
  
  // Statistiques
  const [stats, setStats] = useState({
    totalAbonnements: 3,
    abonnementsActifs: 3,
    demandesEnCours: 3,
    demandesResolues: 2,
    depenseMensuelle: 80,
    depenseTotale: 240,
    dernierAcces: new Date()
  });
  
  // Abonnements
  const [abonnements, setAbonnements] = useState([
    {
      id: 1,
      nom: "Fibre Pro 50 Mbps",
      type: "FIBRE",
      prix: 45,
      statut: "ACTIF",
      dateRenouvellement: "15/03/2024",
      description: "Fibre optique 50 Mbps dédiée"
    },
    {
      id: 2,
      nom: "Forfait Mobile 25 Go",
      type: "MOBILE",
      prix: 25,
      statut: "ACTIF",
      dateRenouvellement: "15/02/2025",
      description: "Forfait mobile avec 25 Go internet"
    },
    {
      id: 3,
      nom: "Ligne Fixe Classique",
      type: "FIXE",
      prix: 10,
      statut: "ACTIF",
      dateRenouvellement: "01/06/2024",
      description: "Ligne fixe téléphonique classique"
    }
  ]);
  
  // Demandes
  const [demandes, setDemandes] = useState([
    {
      id: 1,
      numero: "DEM-001",
      titre: "Souscription Fibre 100 Mbps",
      type: "NOUVELLE_SOUSCRIPTION",
      statut: "APPROUVÉE",
      priorite: "NORMALE",
      dateCreation: "2024-01-15",
      description: "Demande de souscription à la fibre 100 Mbps"
    },
    {
      id: 2,
      numero: "DEM-002",
      titre: "Changement d'offre ADSL → Fibre",
      type: "MODIFICATION",
      statut: "EN_COURS",
      priorite: "NORMALE",
      dateCreation: "2024-01-18",
      description: "Migration ADSL 8 Mbps vers Fibre 20 Mbps"
    },
    {
      id: 3,
      numero: "DEM-003",
      titre: "Problème de connexion fibre",
      type: "SUPPORT",
      statut: "EN_ATTENTE",
      priorite: "HAUTE",
      dateCreation: "2024-01-19",
      description: "Connexion fibre intermittente"
    },
    {
      id: 4,
      numero: "DEM-004",
      titre: "Résiliation ligne fixe",
      type: "RESILIATION",
      statut: "EN_ATTENTE",
      priorite: "BASSE",
      dateCreation: "2024-01-20",
      description: "Demande de résiliation de la ligne fixe"
    },
    {
      id: 5,
      numero: "DEM-005",
      titre: "Problème facturation",
      type: "FACTURATION",
      statut: "TERMINEE",
      priorite: "NORMALE",
      dateCreation: "2024-01-10",
      description: "Erreur sur la dernière facture"
    }
  ]);
  
  // États pour les modals
  const [showDemandeModal, setShowDemandeModal] = useState(false);
  const [showProfilModal, setShowProfilModal] = useState(false);
  const [showAbonnementModal, setShowAbonnementModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState(null);
  
  // Filtres et pagination
  const [filterStatut, setFilterStatut] = useState("TOUS");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Types de demande
  const typesDemande = [
    "NOUVELLE_SOUSCRIPTION",
    "MODIFICATION",
    "RESILIATION",
    "SUPPORT",
    "FACTURATION",
    "RECLAMATION",
    "AUTRE"
  ];
  
  const statutsDemande = [
    "EN_ATTENTE",
    "EN_COURS",
    "APPROUVÉE",
    "REJETÉE",
    "TERMINEE"
  ];
  
  // Formulaires avec Formik
  const demandeForm = useFormik({
    initialValues: {
      type: "",
      titre: "",
      description: "",
      priorite: "NORMALE",
      abonnementId: ""
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Le type est requis"),
      titre: Yup.string()
        .min(5, "Le titre doit avoir au moins 5 caractères")
        .required("Le titre est requis"),
      description: Yup.string()
        .min(10, "La description doit avoir au moins 10 caractères")
        .required("La description est requise")
    }),
    onSubmit: (values) => {
      // Simulation d'envoi au serveur
      const nouvelleDemande = {
        id: demandes.length + 1,
        numero: `DEM-${String(demandes.length + 1).padStart(3, '0')}`,
        titre: values.titre,
        type: values.type,
        statut: "EN_ATTENTE",
        priorite: values.priorite,
        dateCreation: new Date().toISOString().split('T')[0],
        description: values.description
      };
      
      setDemandes([nouvelleDemande, ...demandes]);
      setStats(prev => ({
        ...prev,
        demandesEnCours: prev.demandesEnCours + 1
      }));
      
      alert("Demande créée avec succès!");
      setShowDemandeModal(false);
      demandeForm.resetForm();
    }
  });
  
  const editProfilForm = useFormik({
    initialValues: {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      adresse: user.adresse,
      ville: user.ville,
      codePostal: user.codePostal
    },
    validationSchema: Yup.object({
      nom: Yup.string().required("Le nom est requis"),
      prenom: Yup.string().required("Le prénom est requis"),
      email: Yup.string()
        .email("Email invalide")
        .required("L'email est requis"),
      telephone: Yup.string()
        .matches(/^\+?[\d\s\-\(\)]{8,}$/, "Numéro de téléphone invalide")
    }),
    onSubmit: (values) => {
      setUser(values);
      alert("Profil mis à jour avec succès!");
      setShowProfilModal(false);
    }
  });
  
  const editAbonnementForm = useFormik({
    initialValues: {
      type: "",
      prix: "",
      dateRenouvellement: "",
      statut: ""
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Le type est requis"),
      prix: Yup.number()
        .min(0, "Le prix ne peut pas être négatif")
        .required("Le prix est requis"),
      dateRenouvellement: Yup.date().required("La date de renouvellement est requise"),
      statut: Yup.string().required("Le statut est requis")
    }),
    onSubmit: (values) => {
      if (selectedAbonnement) {
        const updatedAbonnements = abonnements.map(abonnement => 
          abonnement.id === selectedAbonnement.id 
            ? { 
                ...abonnement, 
                type: values.type,
                prix: values.prix,
                dateRenouvellement: formatDateForDisplay(values.dateRenouvellement),
                statut: values.statut
              }
            : abonnement
        );
        
        setAbonnements(updatedAbonnements);
        
        // Recalculer les stats
        const abonnementsActifs = updatedAbonnements.filter(a => a.statut === "ACTIF").length;
        const depenseMensuelle = updatedAbonnements
          .filter(a => a.statut === "ACTIF")
          .reduce((sum, a) => sum + parseFloat(a.prix), 0);
        
        setStats(prev => ({
          ...prev,
          abonnementsActifs,
          depenseMensuelle
        }));
        
        alert("Abonnement mis à jour avec succès!");
        setShowAbonnementModal(false);
        editAbonnementForm.resetForm();
      }
    }
  });
  
  // Effets
  useEffect(() => {
    // Simuler le chargement des données
    const userFromStorage = localStorage.getItem("tt_user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);
  
  useEffect(() => {
    editProfilForm.setValues(user);
  }, [user]);
  
  // Fonctions utilitaires
  const getInitials = () => {
    return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };
  
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const getStatutBadgeClass = (statut) => {
    switch (statut) {
      case "ACTIF":
      case "APPROUVÉE":
      case "TERMINEE":
        return "badge-success";
      case "EN_ATTENTE":
        return "badge-warning";
      case "EN_COURS":
        return "badge-info";
      case "RESILIE":
      case "REJETÉE":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };
  
  const getPrioriteBadgeClass = (priorite) => {
    switch (priorite) {
      case "HAUTE":
        return "badge-danger";
      case "NORMALE":
        return "badge-warning";
      case "BASSE":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  };
  
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case "FIBRE":
        return "badge-primary";
      case "ADSL":
        return "badge-info";
      case "MOBILE":
        return "badge-success";
      case "FIXE":
        return "badge-secondary";
      default:
        return "badge-dark";
    }
  };
  
  // Filtrer les demandes
  const demandesFiltrees = demandes.filter(demande => {
    if (filterStatut === "TOUS") return true;
    return demande.statut === filterStatut;
  });
  
  // Pagination
  const totalPages = Math.ceil(demandesFiltrees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const demandesPaginees = demandesFiltrees.slice(startIndex, startIndex + itemsPerPage);
  
  const changerPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Gestion des abonnements
  const modifierAbonnement = (abonnement) => {
    setSelectedAbonnement(abonnement);
    editAbonnementForm.setValues({
      type: abonnement.type,
      prix: abonnement.prix,
      dateRenouvellement: abonnement.dateRenouvellement.split('/').reverse().join('-'),
      statut: abonnement.statut
    });
    setShowAbonnementModal(true);
  };
  
  const resilierAbonnement = (abonnementId) => {
    if (window.confirm("Êtes-vous sûr de vouloir résilier cet abonnement?")) {
      const updatedAbonnements = abonnements.map(abonnement => 
        abonnement.id === abonnementId 
          ? { ...abonnement, statut: "RESILIE" }
          : abonnement
      );
      
      setAbonnements(updatedAbonnements);
      
      // Recalculer les stats
      const abonnementsActifs = updatedAbonnements.filter(a => a.statut === "ACTIF").length;
      const depenseMensuelle = updatedAbonnements
        .filter(a => a.statut === "ACTIF")
        .reduce((sum, a) => sum + parseFloat(a.prix), 0);
      
      setStats(prev => ({
        ...prev,
        abonnementsActifs,
        depenseMensuelle
      }));
      
      alert("Abonnement résilié avec succès!");
    }
  };
  
  // Gestion des demandes
  const supprimerDemande = (demandeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande?")) {
      const updatedDemandes = demandes.filter(d => d.id !== demandeId);
      setDemandes(updatedDemandes);
      
      // Recalculer les stats
      const demandesEnCours = updatedDemandes.filter(d => 
        d.statut === "EN_ATTENTE" || d.statut === "EN_COURS"
      ).length;
      
      setStats(prev => ({
        ...prev,
        demandesEnCours
      }));
      
      alert("Demande supprimée avec succès!");
    }
  };
  
  // Navigation
  const allerVersAbonnements = () => {
    navigate("/subscriptions");
  };
  
  const allerVersDemandes = () => {
    navigate("/requests");
  };
  
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-tachometer-alt"></i> Tableau de Bord Client</h1>
          <p className="welcome-text">Bienvenue, {user.prenom} {user.nom}</p>
        </div>
        
        <div className="header-right">
          <div className="user-profile" onClick={() => setShowProfilModal(true)}>
            <div className="avatar">
              {getInitials()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.prenom} {user.nom}</span>
              <span className="user-role">Client</span>
            </div>
            <i className="fas fa-chevron-down"></i>
          </div>
          
          <button className="btn-primary" onClick={() => setShowDemandeModal(true)}>
            <i className="fas fa-plus"></i> Nouvelle Demande
          </button>
        </div>
      </header>
      
      {/* Cartes de Statistiques */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon bg-primary">
              <i className="fas fa-wifi"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalAbonnements}</h3>
              <p>Abonnements</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-success">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.abonnementsActifs}</h3>
              <p>Actifs</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-warning">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.demandesEnCours}</h3>
              <p>Demandes en cours</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon bg-info">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.depenseMensuelle} DT</h3>
              <p>Dépense mensuelle</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sections Principales */}
      <div className="main-content">
        {/* Abonnements Actifs */}
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-wifi"></i> Mes Abonnements</h3>
            <button className="btn-outline-primary" onClick={allerVersAbonnements}>
              Voir tous <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Type</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {abonnements.slice(0, 3).map((abonnement) => (
                    <tr key={abonnement.id}>
                      <td>
                        <strong>{abonnement.nom}</strong>
                        <small className="d-block text-muted">
                          Renouv. {abonnement.dateRenouvellement}
                        </small>
                      </td>
                      <td>
                        <span className={`badge ${getTypeBadgeClass(abonnement.type)}`}>
                          {abonnement.type}
                        </span>
                      </td>
                      <td><strong>{abonnement.prix} DT</strong></td>
                      <td>
                        <span className={`badge ${getStatutBadgeClass(abonnement.statut)}`}>
                          {abonnement.statut}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button 
                            className="btn-sm btn-outline-info"
                            onClick={() => modifierAbonnement(abonnement)}
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn-sm btn-outline-danger"
                            onClick={() => resilierAbonnement(abonnement.id)}
                            disabled={abonnement.statut !== "ACTIF"}
                            title="Résilier"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {abonnements.length === 0 && (
                    <tr>
                      <td colSpan="5" className="empty-row">
                        Aucun abonnement trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Demandes Récentes */}
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-tasks"></i> Demandes Récentes</h3>
            <div className="header-actions">
              <select 
                className="form-control form-control-sm" 
                value={filterStatut}
                onChange={(e) => {
                  setFilterStatut(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: '150px', marginRight: '10px' }}
              >
                <option value="TOUS">Tous les statuts</option>
                {statutsDemande.map((statut) => (
                  <option key={statut} value={statut}>
                    {statut}
                  </option>
                ))}
              </select>
              <button className="btn-outline-primary" onClick={allerVersDemandes}>
                Voir tous <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Type</th>
                    <th>Statut</th>
                    <th>Priorité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demandesPaginees.map((demande) => (
                    <tr key={demande.id}>
                      <td><small className="text-muted">{demande.numero}</small></td>
                      <td>
                        <strong>{demande.titre}</strong>
                        <small className="d-block text-muted">
                          {formatDate(demande.dateCreation)}
                        </small>
                      </td>
                      <td>{demande.type}</td>
                      <td>
                        <span className={`badge ${getStatutBadgeClass(demande.statut)}`}>
                          {demande.statut}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getPrioriteBadgeClass(demande.priorite)}`}>
                          {demande.priorite}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button className="btn-sm btn-outline-info" title="Voir">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="btn-sm btn-outline-danger" 
                            title="Supprimer"
                            onClick={() => supprimerDemande(demande.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {demandesFiltrees.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-row">
                        Aucune demande trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => changerPage(currentPage - 1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  <span className="page-info">
                    Page {currentPage} sur {totalPages}
                  </span>
                  
                  <button 
                    className="btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => changerPage(currentPage + 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Rapides */}
      <section className="quick-actions">
        <h3><i className="fas fa-bolt"></i> Actions Rapides</h3>
        <div className="actions-grid">
          <div className="action-card" onClick={() => setShowDemandeModal(true)}>
            <div className="action-icon bg-primary">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h4>Nouvelle Demande</h4>
            <p>Créer une nouvelle demande de support</p>
          </div>
          
          <div className="action-card" onClick={allerVersAbonnements}>
            <div className="action-icon bg-success">
              <i className="fas fa-chart-line"></i>
            </div>
            <h4>Améliorer Abonnement</h4>
            <p>Changer votre offre actuelle</p>
          </div>
          
          <div className="action-card" onClick={() => setShowProfilModal(true)}>
            <div className="action-icon bg-info">
              <i className="fas fa-user-edit"></i>
            </div>
            <h4>Modifier Profil</h4>
            <p>Mettre à jour vos informations</p>
          </div>
          
          <div className="action-card" onClick={() => navigate("/factures")}>
            <div className="action-icon bg-warning">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h4>Consulter Factures</h4>
            <p>Voir votre historique de paiement</p>
          </div>
        </div>
      </section>
      
      {/* Modal Nouvelle Demande */}
      {showDemandeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-plus-circle"></i> Nouvelle Demande</h3>
              <button className="close-btn" onClick={() => setShowDemandeModal(false)}>
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={demandeForm.handleSubmit}>
                <div className="form-group">
                  <label>Type de Demande *</label>
                  <select 
                    className="form-control" 
                    name="type"
                    value={demandeForm.values.type}
                    onChange={demandeForm.handleChange}
                    onBlur={demandeForm.handleBlur}
                  >
                    <option value="">Sélectionner un type</option>
                    {typesDemande.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {demandeForm.touched.type && demandeForm.errors.type && (
                    <div className="error-message">{demandeForm.errors.type}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Titre *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="titre"
                    value={demandeForm.values.titre}
                    onChange={demandeForm.handleChange}
                    onBlur={demandeForm.handleBlur}
                    placeholder="Ex: Problème de connexion fibre"
                  />
                  {demandeForm.touched.titre && demandeForm.errors.titre && (
                    <div className="error-message">{demandeForm.errors.titre}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    className="form-control" 
                    name="description"
                    rows="4"
                    value={demandeForm.values.description}
                    onChange={demandeForm.handleChange}
                    onBlur={demandeForm.handleBlur}
                    placeholder="Décrivez votre demande en détail..."
                  />
                  {demandeForm.touched.description && demandeForm.errors.description && (
                    <div className="error-message">{demandeForm.errors.description}</div>
                  )}
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Priorité</label>
                      <select 
                        className="form-control" 
                        name="priorite"
                        value={demandeForm.values.priorite}
                        onChange={demandeForm.handleChange}
                      >
                        <option value="BASSE">Basse</option>
                        <option value="NORMALE">Normale</option>
                        <option value="HAUTE">Haute</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Abonnement concerné</label>
                      <select 
                        className="form-control" 
                        name="abonnementId"
                        value={demandeForm.values.abonnementId}
                        onChange={demandeForm.handleChange}
                      >
                        <option value="">Sélectionner un abonnement</option>
                        {abonnements.map((abonnement) => (
                          <option key={abonnement.id} value={abonnement.id}>
                            {abonnement.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowDemandeModal(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!demandeForm.isValid || demandeForm.isSubmitting}
                  >
                    <i className="fas fa-paper-plane"></i> Envoyer la Demande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Modifier Profil */}
      {showProfilModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-user-edit"></i> Modifier le Profil</h3>
              <button className="close-btn" onClick={() => setShowProfilModal(false)}>
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={editProfilForm.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nom *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="nom"
                        value={editProfilForm.values.nom}
                        onChange={editProfilForm.handleChange}
                        onBlur={editProfilForm.handleBlur}
                      />
                      {editProfilForm.touched.nom && editProfilForm.errors.nom && (
                        <div className="error-message">{editProfilForm.errors.nom}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Prénom *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="prenom"
                        value={editProfilForm.values.prenom}
                        onChange={editProfilForm.handleChange}
                        onBlur={editProfilForm.handleBlur}
                      />
                      {editProfilForm.touched.prenom && editProfilForm.errors.prenom && (
                        <div className="error-message">{editProfilForm.errors.prenom}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={editProfilForm.values.email}
                    onChange={editProfilForm.handleChange}
                    onBlur={editProfilForm.handleBlur}
                  />
                  {editProfilForm.touched.email && editProfilForm.errors.email && (
                    <div className="error-message">{editProfilForm.errors.email}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Téléphone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="telephone"
                    value={editProfilForm.values.telephone}
                    onChange={editProfilForm.handleChange}
                    onBlur={editProfilForm.handleBlur}
                  />
                  {editProfilForm.touched.telephone && editProfilForm.errors.telephone && (
                    <div className="error-message">{editProfilForm.errors.telephone}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Adresse</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="adresse"
                    value={editProfilForm.values.adresse}
                    onChange={editProfilForm.handleChange}
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Ville</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="ville"
                        value={editProfilForm.values.ville}
                        onChange={editProfilForm.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Code Postal</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="codePostal"
                        value={editProfilForm.values.codePostal}
                        onChange={editProfilForm.handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowProfilModal(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!editProfilForm.isValid || editProfilForm.isSubmitting}
                  >
                    <i className="fas fa-save"></i> Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Modifier Abonnement */}
      {showAbonnementModal && selectedAbonnement && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-edit"></i> Modifier Abonnement</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowAbonnementModal(false);
                  setSelectedAbonnement(null);
                }}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={editAbonnementForm.handleSubmit}>
                <div className="form-group">
                  <label>Type *</label>
                  <select 
                    className="form-control" 
                    name="type"
                    value={editAbonnementForm.values.type}
                    onChange={editAbonnementForm.handleChange}
                    onBlur={editAbonnementForm.handleBlur}
                  >
                    <option value="FIBRE">Fibre</option>
                    <option value="ADSL">ADSL</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="FIXE">Fixe</option>
                  </select>
                  {editAbonnementForm.touched.type && editAbonnementForm.errors.type && (
                    <div className="error-message">{editAbonnementForm.errors.type}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Prix (DT) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="prix"
                    min="0"
                    step="0.01"
                    value={editAbonnementForm.values.prix}
                    onChange={editAbonnementForm.handleChange}
                    onBlur={editAbonnementForm.handleBlur}
                  />
                  {editAbonnementForm.touched.prix && editAbonnementForm.errors.prix && (
                    <div className="error-message">{editAbonnementForm.errors.prix}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Date de renouvellement *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="dateRenouvellement"
                    value={editAbonnementForm.values.dateRenouvellement}
                    onChange={editAbonnementForm.handleChange}
                    onBlur={editAbonnementForm.handleBlur}
                  />
                  {editAbonnementForm.touched.dateRenouvellement && editAbonnementForm.errors.dateRenouvellement && (
                    <div className="error-message">{editAbonnementForm.errors.dateRenouvellement}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Statut *</label>
                  <select 
                    className="form-control" 
                    name="statut"
                    value={editAbonnementForm.values.statut}
                    onChange={editAbonnementForm.handleChange}
                    onBlur={editAbonnementForm.handleBlur}
                  >
                    <option value="ACTIF">Actif</option>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="RESILIE">Résilié</option>
                  </select>
                  {editAbonnementForm.touched.statut && editAbonnementForm.errors.statut && (
                    <div className="error-message">{editAbonnementForm.errors.statut}</div>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setShowAbonnementModal(false);
                      setSelectedAbonnement(null);
                    }}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!editAbonnementForm.isValid || editAbonnementForm.isSubmitting}
                  >
                    <i className="fas fa-save"></i> Mettre à jour
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
