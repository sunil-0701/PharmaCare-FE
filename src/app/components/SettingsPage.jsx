import React, { useState } from "react";
import { Settings, Bell } from "lucide-react";
import { toast } from "sonner";
import "./SettingsPage.css";

export function SettingsPage() {
  const [tab, setTab] = useState("general");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <h1>System Settings</h1>
        <p>Configure application preferences and system settings</p>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        <button
          className={tab === "general" ? "tab active" : "tab"}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          className={tab === "notifications" ? "tab active" : "tab"}
          onClick={() => setTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {/* GENERAL SETTINGS */}
      {tab === "general" && (
        <div className="card">
          <div className="card-header">
            <div className="icon-box green">
              <Settings />
            </div>
            <div>
              <h2>General Settings</h2>
              <p>Configure basic application settings</p>
            </div>
          </div>

          <div className="card-body">
            <label>Pharmacy Name</label>
            <input defaultValue="PharmaCare" />

            <label>Business Address</label>
            <input defaultValue="123 Medical Street, Health City" />

            <div className="two-col">
              <div>
                <label>Phone Number</label>
                <input defaultValue="+1 234-567-8900" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" defaultValue="contact@pharmacare.com" />
              </div>
            </div>

            <hr />

            <label>Currency</label>
            <select defaultValue="inr">
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="inr">INR (₹)</option>
            </select>

            <label>Time Zone</label>
            <select defaultValue="ist">
              <option value="est">EST</option>
              <option value="pst">PST</option>
              <option value="cst">CST</option>
              <option value="mst">MST</option>
              <option value="ist">IST</option>
            </select>

            <button className="btn primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* NOTIFICATION SETTINGS */}
      {tab === "notifications" && (
        <div className="card">
          <div className="card-header">
            <div className="icon-box blue">
              <Bell />
            </div>
            <div>
              <h2>Notification Settings</h2>
              <p>Manage alert and notification preferences</p>
            </div>
          </div>

          <div className="card-body">
            {[
              "Low Stock Alerts",
              "Expiry Alerts",
              "New Order Notifications",
              "Daily Sales Report",
            ].map((label, index) => (
              <div key={index} className="switch-row">
                <span>{label}</span>
                <input type="checkbox" defaultChecked={index < 3} />
              </div>
            ))}

            <hr />

            <label>Low Stock Threshold</label>
            <input type="number" defaultValue="50" />

            <label>Expiry Warning Period (days)</label>
            <input type="number" defaultValue="90" />

            <button className="btn primary" onClick={handleSave}>
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
