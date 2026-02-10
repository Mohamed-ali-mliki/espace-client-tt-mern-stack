import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Login.css";
import { authService } from "../services/authService";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await authService.login(
        formData.email,
        formData.password
      );

      if (result.success) {
        setSuccessMessage("Connexion réussie ! Redirection...");

        setTimeout(() => {
          const user = authService.getCurrentUser();
          if (user.role === "admin") {
            navigate("/dashboard-admin");
          } else {
            navigate("/dashboard-client");
          }
        }, 1500);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>Connexion</h1>
          <p>Accédez à votre espace personnel</p>
        </div>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Se souvenir de moi
            </label>

            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </div>

          <button className="btn-login" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        <div className="login-footer">
          <p>
            Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
