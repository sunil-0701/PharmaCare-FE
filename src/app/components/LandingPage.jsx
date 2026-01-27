import React from "react";
import {
  Pill,
  ShoppingCart,
  Package,
  BarChart3,
  FileText,
  Shield,
  Bell,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";

import "./LandingPage.css";

export function LandingPage({ onNavigateToLogin }) {
  const features = [
    {
      icon: ShoppingCart,
      title: "Point of Sale",
      description:
        "Fast and efficient billing system with barcode scanning, cart management, and instant receipt generation.",
      colorClass: "landing-feature-color-0"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description:
        "Real-time stock tracking with low stock alerts, expiry date monitoring, and batch management.",
      colorClass: "landing-feature-color-1"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description:
        "Comprehensive sales reports, profit analysis, and staff performance metrics with visual charts.",
      colorClass: "landing-feature-color-2"
    },
    {
      icon: FileText,
      title: "Prescription Management",
      description:
        "Digital prescription upload, verification workflow, and patient history tracking.",
      colorClass: "landing-feature-color-3"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description:
        "Secure access control with Admin, Pharmacist, and Inventory Manager roles.",
      colorClass: "landing-feature-color-4"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Automated notifications for low stock, expiring medicines, and important updates.",
      colorClass: "landing-feature-color-5"
    }
  ];

  return (
    <div className="landing-page">
      <div className="landing-background-blobs">
        <div className="landing-blob landing-blob-1" />
        <div className="landing-blob landing-blob-2" />
        <div className="landing-blob landing-blob-3" />
      </div>
      <header className="landing-header">
        <div className="landing-header-container">
          <div className="landing-header-content">
            <div className="landing-logo">
              <div className="landing-logo-icon">
                <Pill className="landing-pill-icon" />
              </div>
              <div className="landing-logo-text">
                <h1 className="landing-logo-title">PharmaCare</h1>
                <p className="landing-logo-subtitle">Healthcare Management</p>
              </div>
            </div>
            <div className="landing-header-buttons">
              <button
                className="landing-login-btn"
                onClick={onNavigateToLogin}
              >
                Login
              </button>
              <button
                className="landing-getstarted-btn"
                onClick={onNavigateToLogin}
              >
                Get Started
                <ArrowRight className="landing-btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-container">
          <div className="landing-hero-content">
            <div className="landing-hero-icon-wrapper">
              <div className="landing-hero-icon-background" />
              <div className="landing-hero-icon-box">
                <Pill className="landing-hero-icon" />
              </div>
            </div>
            <div className="landing-hero-text">
              <div className="landing-hero-badge">
                <Sparkles className="landing-badge-icon" />
                <span>Enterprise Healthcare SaaS</span>
              </div>
              <h1 className="landing-hero-title">
                PharmaCare – Pharmacy
                <span className="landing-hero-title-highlight">
                  Management System
                </span>
              </h1>
              <p className="landing-hero-description">
                A comprehensive solution for modern pharmacies featuring
                inventory tracking, intelligent billing, expiry alerts,
                and role-based access control.
              </p>
            </div>
            <div className="landing-hero-buttons">
              <button
                className="landing-hero-primary-btn"
                onClick={onNavigateToLogin}
              >
                Login to Dashboard
                <ArrowRight className="landing-btn-icon-lg" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features-container">
          <div className="landing-features-header">
            <div className="landing-features-badge">
              <Sparkles className="landing-badge-icon" />
              <span>Key Features</span>
            </div>
            <h2 className="landing-features-title">
              Everything You Need to Manage Your Pharmacy
            </h2>
            <p className="landing-features-subtitle">
              Powerful tools designed for healthcare professionals
            </p>
          </div>
          <div className="landing-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="landing-feature-card">
                <div className="landing-feature-header">
                  <div className={`landing-feature-icon ${feature.colorClass}`}>
                    <feature.icon className="landing-feature-icon-svg" />
                  </div>
                  <h3 className="landing-feature-title">{feature.title}</h3>
                </div>
                <p className="landing-feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-container">
          <div className="landing-cta-background" />
          <div className="landing-cta-content">
            <h2 className="landing-cta-title">
              Ready to Transform Your Pharmacy?
            </h2>
            <p className="landing-cta-description">
              Join healthcare professionals who trust PharmaCare
            </p>
            <button
              className="landing-cta-btn"
              onClick={onNavigateToLogin}
            >
              Get Started Now
              <ArrowRight className="landing-btn-icon-lg" />
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="landing-footer-content">
            <div className="landing-footer-brand">
              <div className="landing-footer-logo">
                <Pill className="landing-footer-icon" />
              </div>
              <div className="landing-footer-text">
                <p className="landing-footer-name">PharmaCare</p>
                <p className="landing-footer-subtitle">
                  Healthcare Management System
                </p>
              </div>
            </div>
            <p className="landing-footer-copyright">
              © 2024 PharmaCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

