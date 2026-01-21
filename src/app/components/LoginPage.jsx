import React, { useState } from "react";
import { Pill, Lock, Mail, Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./LoginPage.css";

export function LoginPage({ onNavigateBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Login successful - no need for alert, app will redirect
    } catch (error) {
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-background">
        <div className="login-blob login-blob-1" />
        <div className="login-blob login-blob-2" />
      </div>

      {/* Logo */}
      <div className="login-logo-header">
        <div className="login-logo-box">
          <Pill className="login-logo-pill" />
        </div>
        <div className="login-logo-text">
          <h1 className="login-logo-title">PharmaCare</h1>
          <p className="login-logo-subtitle">Healthcare Management</p>
        </div>
      </div>

      {/* Back Button */}
      {onNavigateBack && (
        <div className="login-back-btn-wrapper">
          <button
            className="login-back-btn"
            onClick={onNavigateBack}
            type="button"
          >
            <ArrowLeft className="login-back-icon" />
            <span>Back</span>
          </button>
        </div>
      )}

      {/* Login Card */}
      <div className="login-card">
        <div className="login-card-header">
          <div className="login-card-icon-wrapper">
            <div className="login-card-icon-box">
              <Sparkles className="login-card-icon" />
            </div>
          </div>
          <h2 className="login-card-title">Welcome Back</h2>
          <p className="login-card-description">
            Sign in to access your pharmacy dashboard
          </p>
        </div>

        <div className="login-card-content">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Error Message */}
            {error && (
              <div className="login-error-box">
                <p className="login-error-text">⚠️ {error}</p>
              </div>
            )}

            {/* Email */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">
                Email / Username
              </label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon" />
                <input
                  id="email"
                  type="text"
                  className="login-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <div className="login-label-row">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <button
                  type="button"
                  className="login-forgot-pwd"
                  onClick={() =>
                    alert("Please contact your administrator to reset your password")
                  }
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon" />
                <input
                  id="password"
                  type="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading || !email || !password}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Info */}
            <div className="login-info-box">
              <p className="login-info-text">
                <span className="login-info-emoji">ℹ️</span>
                <span>
                  User accounts are created and managed by the system administrator.
                </span>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="login-demo-section">
            <div className="login-demo-box">
              <p className="login-demo-title">Demo Credentials:</p>
              <div className="login-demo-items">
                <p className="login-demo-item">
                  <span className="login-demo-dot login-demo-dot-admin" />
                  <span>admin@pharmacare.com • Admin</span>
                </p>
                <p className="login-demo-item">
                  <span className="login-demo-dot login-demo-dot-pharmacist" />
                  <span>pharmacist@pharmacare.com • Pharmacist</span>
                </p>
                <p className="login-demo-item">
                  <span className="login-demo-dot login-demo-dot-inventory" />
                  <span>inventory@pharmacare.com • Inventory Manager</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}