import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Inscription.css";

const Inscription = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur spécifique quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validation Nom
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    } else if (formData.nom.length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    }
    
    // Validation Prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    } else if (formData.prenom.length < 2) {
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
    }
    
    // Validation Email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }
    
    // Validation Téléphone
    if (!formData.telephone) {
      newErrors.telephone = "Le numéro de téléphone est requis";
    } else if (!/^\+?[\d\s\-\(\)]{8,}$/.test(formData.telephone)) {
      newErrors.telephone = "Veuillez entrer un numéro de téléphone valide";
    }
    
    // Validation Mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
    }
    
    // Validation Confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    // Validation Conditions
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Vous devez accepter les conditions d'utilisation";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrorMessage("Veuillez corriger les erreurs dans le formulaire");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    // Simulation d'envoi au serveur
    setTimeout(() => {
      // Stocker les données utilisateur (en pratique, on enverrait à une API)
      const userData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        dateInscription: new Date().toISOString(),
        role: 'client'
      };
      
      // Sauvegarder dans localStorage (simulation)
      localStorage.setItem('tt_user', JSON.stringify(userData));
      localStorage.setItem('tt_user_email', formData.email);
      
      setSuccessMessage(`Inscription réussie ! Bienvenue ${formData.prenom} ${formData.nom}`);
      
      setTimeout(() => {
        navigate('/dashboard-client');
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false
    });
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
  };
  
  return (
    <div className="inscription-page">
      <div className="inscription-container">
        <div className="inscription-header">
          <h1>Inscription</h1>
          <p>Créez votre compte Tunisie Telecom</p>
        </div>

        {errorMessage && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i> {successMessage}
          </div>
        )}

        <form className="inscription-form" onSubmit={handleSubmit}>
          {/* Nom et Prénom sur la même ligne */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="form-control"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  disabled={isLoading}
                />
              </div>
              {errors.nom && (
                <div className="validation-error">
                  <small>{errors.nom}</small>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  className="form-control"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  disabled={isLoading}
                />
              </div>
              {errors.prenom && (
                <div className="validation-error">
                  <small>{errors.prenom}</small>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <div className="validation-error">
                <small>{errors.email}</small>
              </div>
            )}
          </div>

          {/* Téléphone */}
          <div className="form-group">
            <label htmlFor="telephone">Numéro de téléphone</label>
            <div className="input-with-icon">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                className="form-control"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="+216 99 999 999"
                disabled={isLoading}
              />
            </div>
            {errors.telephone && (
              <div className="validation-error">
                <small>{errors.telephone}</small>
              </div>
            )}
          </div>

          {/* Mot de passe et Confirmation */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Votre mot de passe"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <div className="validation-error">
                  <small>{errors.password}</small>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <div className="validation-error">
                  <small>{errors.confirmPassword}</small>
                </div>
              )}
            </div>
          </div>

          {/* Conditions d'utilisation */}
          <div className="form-options">
            <div className="terms-conditions">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="termsAccepted">
                J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer">conditions d'utilisation</a>
              </label>
            </div>
            {errors.termsAccepted && (
              <div className="validation-error">
                <small>{errors.termsAccepted}</small>
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn-register"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </button>
            <button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              disabled={isLoading}
            >
              Réinitialiser
            </button>
          </div>
        </form>

        <div className="inscription-footer">
          <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
        </div>

        <div className="bottom-logo">
          <i className="fas fa-satellite-dish"></i>
          <span>Tunisie Telecom - Service Client</span>
        </div>
      </div>
    </div>
  );
};

export default Inscription;