import React, { useState } from "react";
import "./StaffManagement.css";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Shield,
  X,
  MoreVertical,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext.jsx";

export function StaffManagement() {
  const { users, registerStaff, deleteStaff, updateStaffStatus } = useAuth();
  const [showAdd, setShowAdd] = useState(false);

  // Form State
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "pharmacist",
    password: ""
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    registerStaff(newStaff);
    setShowAdd(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      role: "pharmacist",
      password: ""
    });
  };


  const handleDeleteStaff = (staff) => {
    if (window.confirm(`Are you sure you want to remove ${staff.name}?`)) {
      deleteStaff(staff.id);
      toast.success(`${staff.name} has been removed`);
    }
  };

  const toggleStatus = (id, name, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    updateStaffStatus(id, newStatus);
    toast.success(`${name} is now ${newStatus}`);
  };

  return (
    <div className="staff-management-container">
      <div className="staff-header-modern">
        <div className="header-info">
          <h1>Staff Management</h1>
          <p>Manage your pharmacy team, roles, and permissions</p>
        </div>
        <button className="btn-primary-premium" onClick={() => setShowAdd(true)}>
          <Plus size={18} /> Add New Staff
        </button>
      </div>

      <div className="staff-stats-grid">
        <div className="staff-stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Members</span>
            <span className="stat-value">{users.length}</span>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon-wrapper green">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Now</span>
            <span className="stat-value">{users.filter(s => s.status === "Active").length}</span>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon-wrapper orange">
            <Shield size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Admin Roles</span>
            <span className="stat-value">{users.filter(s => s.role === "admin").length}</span>
          </div>
        </div>
      </div>

      <div className="staff-table-card">
        <div className="table-header-row">
          <h3>Team Directory</h3>
          <div className="table-actions-mini">
            <button className="icon-btn-ghost"><MoreVertical size={18} /></button>
          </div>
        </div>

        <div className="modern-table-container">
          <table className="staff-table-modern">
            <thead>
              <tr>
                <th>Member</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <div className="staff-profile">
                      <div className="profile-avatar">{staff.name[0]}</div>
                      <div className="profile-info">
                        <span className="profile-name">{staff.name}</span>
                        <span className="profile-id">ID: PC-{String(staff.id).padStart(3, '0')}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-details">
                      <div className="contact-item"><Mail size={12} /> {staff.email}</div>
                      <div className="contact-item"><Phone size={12} /> {staff.phone || '-'}</div>
                    </div>
                  </td>
                  <td><span className="role-tag">{staff.role}</span></td>
                  <td><div className="join-date">{staff.joinDate || '-'}</div></td>
                  <td>
                    <span className={`status-badge ${(staff.status || 'Active').toLowerCase()}`}>
                      {staff.status || 'Active'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-button-group">
                      <button
                        className="action-icon-btn status"
                        onClick={() => toggleStatus(staff.id, staff.name, staff.status)}
                        title="Toggle Status"
                      >
                        {staff.status === "Active" ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button
                        className="action-icon-btn delete"
                        onClick={() => handleDeleteStaff(staff)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <div className="modal-header-premium">
              <div>
                <h2>Add Staff Member</h2>
                <p>Register a new member to the pharmacy team</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAdd(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-premium">
              <div className="form-grid-premium">
                <div className="form-group-premium">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <Users size={18} className="field-icon" />
                    <input
                      type="text"
                      placeholder="e.g. Robert Smith"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input
                      type="email"
                      placeholder="robert@pharmacare.com"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="field-icon" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Role</label>
                  <div className="input-with-icon">
                    <Shield size={18} className="field-icon" />
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    >
                      <option value="admin">Admin</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="inventory">Inventory Manager</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-premium full-width">
                  <label> Password</label>
                  <div className="input-with-icon">
                    <Check size={18} className="field-icon" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newStaff.password}
                      onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer-premium">
              <button className="btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleAddStaff}>Create Member</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

