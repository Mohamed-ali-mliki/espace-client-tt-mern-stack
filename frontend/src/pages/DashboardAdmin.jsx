// DashboardAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/DashboardAdmin.css';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  
  // États
  const [stats, setStats] = useState({
    totalClients: 1250,
    totalAbonnements: 0,
    demandesEnCours: 42,
    revenuMensuel: 75250,
    revenuAnnuel: 0,
    tauxConversion: 0,
    satisfaction: 92.3
  });
  
  const [clients, setClients] = useState([
    {
      id: 1,
      prenom: 'Mohamed',
      nom: 'Ben Ali',
      email: 'mohamed@example.com',
      telephone: '22 123 456',
      dateInscription: '1/15/24',
      statut: 'ACTIF',
      abonnementsActifs: 3,
      derniereConnexion: '1/26/24, 1:00 AM'
    },
    {
      id: 2,
      prenom: 'Fatima',
      nom: 'Ben Ahmed',
      email: 'fatima@example.com',
      telephone: '22 654 321',
      dateInscription: '1/16/24',
      statut: 'ACTIF',
      abonnementsActifs: 2,
      derniereConnexion: '1/25/24, 2:00 PM'
    },
    {
      id: 3,
      prenom: 'Ali',
      nom: 'Ben Salah',
      email: 'ali@example.com',
      telephone: '22 789 123',
      dateInscription: '1/17/24',
      statut: 'INACTIF',
      abonnementsActifs: 1,
      derniereConnexion: '1/20/24, 10:30 AM'
    }
  ]);
  
  const [demandesRecent, setDemandesRecent] = useState([
    {
      id: '1',
      numero: 'DEM-2024-003',
      titre: 'Résiliation ligne fixe',
      statut: 'EN_ATTENTE',
      createdBy: { nom: 'Mohamed Ben Ali' },
      dateCreation: '1/20/24, 10:00 AM'
    },
    {
      id: '2',
      numero: 'DEM-2024-002',
      titre: 'Problème de connexion fibre',
      statut: 'EN_COURS',
      createdBy: { nom: 'Fatima Ben Ahmed' },
      dateCreation: '1/19/24, 2:30 PM'
    },
    {
      id: '3',
      numero: 'DEM-2024-001',
      titre: 'Changement d\'offre ADSL → Fibre',
      statut: 'TERMINEE',
      createdBy: { nom: 'Ali Ben Salah' },
      dateCreation: '1/18/24, 11:15 AM'
    }
  ]);
  
  const [filterClientStatut, setFilterClientStatut] = useState('TOUS');
  const [filterDate, setFilterDate] = useState('7j');
  const [currentPageClients, setCurrentPageClients] = useState(1);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showOffreModal, setShowOffreModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const itemsPerPage = 10;
  
  // Fonctions de formatage
  const formatNombre = (nombre) => {
    return nombre.toLocaleString('fr-FR');
  };
  
  const formatMontant = (montant) => {
    return `${montant.toLocaleString('fr-FR')} DT`;
  };
  
  const formatDate = (dateString) => {
    return dateString; // Pour simplifier, on retourne la date telle quelle
  };
  
  // Méthodes CRUD
  const modifierClient = (client) => {
    setSelectedClient(client);
    setShowClientModal(true);
  };
  
  const supprimerClient = (clientId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
  };
  
  const bloquerClient = (clientId) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, statut: 'BLOQUE' } : client
    ));
  };
  
  const creerOffre = () => {
    setShowOffreModal(true);
  };
  
  // Navigation
  const allerVersGestionClients = () => {
    navigate('/admin/clients');
  };
  
  const allerVersGestionDemandes = () => {
    navigate('/admin/demandes');
  };
  
  // Filtrage et pagination
  const clientsFiltres = clients.filter(client => {
    if (filterClientStatut === 'TOUS') return true;
    return client.statut === filterClientStatut;
  });
  
  const clientsPagine = clientsFiltres.slice(
    (currentPageClients - 1) * itemsPerPage,
    currentPageClients * itemsPerPage
  );
  
  // Rendu des badges de statut
  const renderBadge = (statut, text) => {
    let className = 'badge ';
    switch(statut) {
      case 'EN_ATTENTE':
      case 'INACTIF':
        className += 'badge-warning';
        break;
      case 'EN_COURS':
        className += 'badge-info';
        break;
      case 'TERMINEE':
      case 'ACTIF':
        className += 'badge-success';
        break;
      case 'BLOQUE':
        className += 'badge-danger';
        break;
      default:
        className += 'badge-info';
    }
    return <span className={className}>{text}</span>;
  };

  // Fermer les modales
  const closeModal = () => {
    setShowClientModal(false);
    setShowOffreModal(false);
    setSelectedClient(null);
  };

  return (
    <div className="dashboard-admin">
      {/* En-tête Admin */}
      <header className="admin-header">
        <div className="header-left">
          <h1><i className="fas fa-user-shield"></i> Tableau de Bord Administrateur</h1>
          <p className="welcome-text">Bienvenue, Administrateur</p>
        </div>
        <div className="header-right">
          <button className="btn btn-export">
            <i className="fas fa-file-export"></i> Exporter Rapport
          </button>
          <button className="btn btn-primary" onClick={creerOffre}>
            <i className="fas fa-plus"></i> Nouvelle Offre
          </button>
        </div>
      </header>
      
      {/* Statistiques Principales */}
      <section className="admin-stats-grid">
        <div className="row">
          {/* Carte Clients */}
          <div className="col-md-3 col-sm-6">
            <div className="stat-card stat-card-primary">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>{formatNombre(stats.totalClients)}</h3>
                <p>Clients Totaux</p>
                <span className="stat-trend positive">
                  <i className="fas fa-arrow-up"></i> 12% ce mois
                </span>
              </div>
            </div>
          </div>
          
          {/* Carte Revenus */}
          <div className="col-md-3 col-sm-6">
            <div className="stat-card stat-card-success">
              <div className="stat-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="stat-content">
                <h3>{formatMontant(stats.revenuMensuel)}</h3>
                <p>Revenu Mensuel</p>
                <span className="stat-trend positive">
                  <i className="fas fa-arrow-up"></i> 8% vs mois dernier
                </span>
              </div>
            </div>
          </div>
          
          {/* Carte Demandes */}
          <div className="col-md-3 col-sm-6">
            <div className="stat-card stat-card-warning">
              <div className="stat-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.demandesEnCours}</h3>
                <p>Demandes en Cours</p>
                <span className="stat-trend negative">
                  <i className="fas fa-arrow-up"></i> 5 nouvelles aujourd'hui
                </span>
              </div>
            </div>
          </div>
          
          {/* Carte Satisfaction */}
          <div className="col-md-3 col-sm-6">
            <div className="stat-card stat-card-info">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-content">
                <h3>{stats.satisfaction}%</h3>
                <p>Satisfaction Client</p>
                <span className="stat-trend positive">
                  <i className="fas fa-arrow-up"></i> 2.3% ce trimestre
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Graphiques et Tableaux */}
      <div className="row admin-content">
        {/* Graphique des revenus */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-chart-line"></i> Performance Mensuelle</h3>
              <select 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)}
                className="form-control form-control-sm"
              >
                <option value="7j">7 derniers jours</option>
                <option value="30j">30 derniers jours</option>
                <option value="90j">3 derniers mois</option>
              </select>
            </div>
            <div className="card-body">
              <div className="chart-placeholder">
                <i className="fas fa-chart-bar fa-3x"></i>
                <p>Graphique des revenus et abonnements</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Demandes Récentes */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-clock"></i> Demandes Récentes</h3>
              <button 
                className="btn btn-sm btn-outline-primary" 
                onClick={allerVersGestionDemandes}
              >
                Toutes <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="card-body">
              <div className="demandes-list">
                {demandesRecent.length > 0 ? (
                  demandesRecent.map((demande) => (
                    <div key={demande.id} className="demande-item">
                      <div className="demande-header">
                        <span className="demande-numero">{demande.numero}</span>
                        {renderBadge(demande.statut, demande.statut)}
                      </div>
                      <p className="demande-titre">{demande.titre}</p>
                      <div className="demande-footer">
                        <small>{demande.createdBy.nom}</small>
                        <small>{formatDate(demande.dateCreation)}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3">
                    <p className="text-muted">Aucune demande récente</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Liste des Clients */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3><i className="fas fa-user-friends"></i> Gestion des Clients</h3>
              <div className="header-actions">
                <select 
                  value={filterClientStatut} 
                  onChange={(e) => setFilterClientStatut(e.target.value)}
                  className="form-control form-control-sm"
                >
                  <option value="TOUS">Tous les statuts</option>
                  <option value="ACTIF">Actifs</option>
                  <option value="INACTIF">Inactifs</option>
                  <option value="BLOQUE">Bloqués</option>
                </select>
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={allerVersGestionClients}
                >
                  <i className="fas fa-cog"></i> Gérer
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Date Inscription</th>
                      <th>Statut</th>
                      <th>Abonnements</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsPagine.length > 0 ? (
                      clientsPagine.map((client) => (
                        <tr key={client.id}>
                          <td>#{client.id}</td>
                          <td>
                            <strong>{client.prenom} {client.nom}</strong>
                            <small className="d-block text-muted">
                              Dernière connexion: {client.derniereConnexion}
                            </small>
                          </td>
                          <td>{client.email}</td>
                          <td>{client.telephone}</td>
                          <td>{client.dateInscription}</td>
                          <td>
                            {renderBadge(client.statut, client.statut)}
                          </td>
                          <td>
                            <span className="badge badge-info">{client.abonnementsActifs}</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info" 
                                onClick={() => modifierClient(client)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-outline-warning" 
                                onClick={() => bloquerClient(client.id)}
                              >
                                <i className="fas fa-ban"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger" 
                                onClick={() => supprimerClient(client.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center">
                          Aucun client trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="pagination">
                  <button 
                    className="btn btn-sm" 
                    disabled={currentPageClients === 1}
                    onClick={() => setCurrentPageClients(prev => Math.max(prev - 1, 1))}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span>Page {currentPageClients} de {Math.ceil(clientsFiltres.length / itemsPerPage)}</span>
                  <button 
                    className="btn btn-sm"
                    onClick={() => setCurrentPageClients(prev => prev + 1)}
                    disabled={currentPageClients * itemsPerPage >= clientsFiltres.length}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Rapides Admin */}
      <section className="admin-quick-actions mt-4">
        <h3><i className="fas fa-bolt"></i> Actions Rapides</h3>
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="action-card" onClick={creerOffre}>
              <div className="action-icon bg-primary">
                <i className="fas fa-plus-circle"></i>
              </div>
              <h4>Nouvelle Offre</h4>
              <p>Créer un nouvel abonnement</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="action-card" onClick={() => navigate('/admin/demandes')}>
              <div className="action-icon bg-warning">
                <i className="fas fa-headset"></i>
              </div>
              <h4>Support Client</h4>
              <p>Gérer les demandes de support</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="action-card" onClick={() => navigate('/admin/rapports')}>
              <div className="action-icon bg-success">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h4>Rapports</h4>
              <p>Générer des rapports analytiques</p>
            </div>
          </div>
          
          <div className="col-md-3 col-sm-6">
            <div className="action-card" onClick={() => navigate('/admin/parametres')}>
              <div className="action-icon bg-info">
                <i className="fas fa-cogs"></i>
              </div>
              <h4>Paramètres</h4>
              <p>Configurer le système</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modale Offre */}
      {showOffreModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-plus-circle"></i> Créer une Nouvelle Offre</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Formulaire de création d'offre à implémenter...</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Annuler
              </button>
              <button className="btn btn-primary">
                Créer l'offre
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modale Client */}
      {showClientModal && selectedClient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-edit"></i> Modifier Client</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Modification de {selectedClient.prenom} {selectedClient.nom}</p>
              <p>Formulaire de modification à implémenter...</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Annuler
              </button>
              <button className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;