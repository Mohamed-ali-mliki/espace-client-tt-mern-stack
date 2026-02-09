import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Login.css";

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const testUsers = {
    'client@tunisietelecom.tn': {
      password: 'password',
      role: 'client',
      name: 'Client Utilisateur'
    },
    'admin@tunisietelecom.tn': {
      password: 'password',
      role: 'admin',
      name: 'Administrateur'
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    if (!formData.email) {
      setErrorMessage("L'email est requis");
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Veuillez entrer un email valide");
      return false;
    }
    
    if (!formData.password) {
      setErrorMessage("Le mot de passe est requis");
      return false;
    }
    
    if (formData.password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    setTimeout(() => {
      const { email, password } = formData;
      
      if (testUsers[email]) {
        const user = testUsers[email];
        
        if (user.password === password) {
          setSuccessMessage(`Connexion réussie! Bienvenue ${user.name}`);
          
          setTimeout(() => {
            if (user.role === 'admin') {
              navigate('/dashboard-admin');
            } else {
              navigate('/dashboard-client');
            }
          }, 1500);
        } else {
          setErrorMessage("Mot de passe incorrect");
        }
      } else {
        setErrorMessage("Email non reconnu. Veuillez réessayer.");
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      remember: false
    });
    setErrorMessage("");
    setSuccessMessage("");
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <p>Accédez à votre espace personnel</p>
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

        <form className="login-form" onSubmit={handleSubmit}>
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
                required
                disabled={isLoading}
              />
            </div>
            {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
              <div className="validation-error">
                <small>Veuillez entrer un email valide</small>
              </div>
            )}
          </div>

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
                required
                disabled={isLoading}
              />
            </div>
            {formData.password && formData.password.length < 6 && (
              <div className="validation-error">
                <small>Le mot de passe doit contenir au moins 6 caractères</small>
              </div>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forget Password?
            </Link>
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn-login"
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? "Connexion en cours..." : "Submit"}
            </button>
            <button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/inscription">Register</Link></p>
        </div>

        <div className="bottom-logo">
          <i className="fas fa-satellite-dish"></i>
          <span>Tunisie Telecom</span>
        </div>
      </div>
    </div>
  );
};

export default Login;