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
  Calendar,
  Shield,
  X,
  MoreVertical,
  Check
} from "lucide-react";
import { toast } from "sonner";

const initialStaffMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@pharmacare.com",
    role: "Pharmacist",
    status: "Active",
    joinDate: "2023-01-15",
    phone: "+1 234-567-8900",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@pharmacare.com",
    role: "Inventory Manager",
    status: "Active",
    joinDate: "2023-03-20",
    phone: "+1 234-567-8901",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@pharmacare.com",
    role: "Pharmacist",
    status: "Active",
    joinDate: "2023-05-10",
    phone: "+1 234-567-8902",
  },
];

export function StaffManagement() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleAddStaff = () => {
    toast.success("Staff member added successfully");
    setShowAdd(false);
  };

  const handleEditStaff = () => {
    toast.success("Staff details updated");
    setShowEdit(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      toast.success(`${name} has been removed`);
    }
  };

  const toggleStatus = (name, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
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
            <span className="stat-value">{initialStaffMembers.length}</span>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon-wrapper green">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Now</span>
            <span className="stat-value">{initialStaffMembers.filter(s => s.status === "Active").length}</span>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="stat-icon-wrapper orange">
            <Shield size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Admin Roles</span>
            <span className="stat-value">2</span>
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
              {initialStaffMembers.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <div className="staff-profile">
                      <div className="profile-avatar">{staff.name[0]}</div>
                      <div className="profile-info">
                        <span className="profile-name">{staff.name}</span>
                        <span className="profile-id">ID: PC-{staff.id.padStart(3, '0')}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-details">
                      <div className="contact-item"><Mail size={12} /> {staff.email}</div>
                      <div className="contact-item"><Phone size={12} /> {staff.phone}</div>
                    </div>
                  </td>
                  <td><span className="role-tag">{staff.role}</span></td>
                  <td><div className="join-date">{staff.joinDate}</div></td>
                  <td>
                    <span className={`status-badge ${staff.status.toLowerCase()}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-button-group">
                      <button
                        className="action-icon-btn edit"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowEdit(true);
                        }}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-icon-btn status"
                        onClick={() => toggleStatus(staff.name, staff.status)}
                        title="Toggle Status"
                      >
                        {staff.status === "Active" ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                      <button
                        className="action-icon-btn delete"
                        onClick={() => handleDeleteStaff(staff.name)}
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
                    <input type="text" placeholder="e.g. Robert Smith" />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input type="email" placeholder="robert@pharmacare.com" />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="field-icon" />
                    <input type="tel" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label>Role</label>
                  <div className="input-with-icon">
                    <Shield size={18} className="field-icon" />
                    <select>
                      <option value="Admin">Admin</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Inventory Manager">Inventory Manager</option>
                      <option value="Cashier">Cashier</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-premium full-width">
                  <label>Temporary Password</label>
                  <div className="input-with-icon">
                    <Check size={18} className="field-icon" />
                    <input type="password" placeholder="••••••••" />
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

      {showEdit && selectedStaff && (
        <div className="premium-modal-overlay">
          <div className="premium-modal">
            <div className="modal-header-premium">
              <div>
                <h2>Edit Staff Profile</h2>
                <p>Modify details for {selectedStaff.name}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowEdit(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-premium">
              <div className="form-grid-premium">
                <div className="form-group-premium">
                  <label>Full Name</label>
                  <input type="text" defaultValue={selectedStaff.name} />
                </div>

                <div className="form-group-premium">
                  <label>Email Address</label>
                  <input type="email" defaultValue={selectedStaff.email} />
                </div>

                <div className="form-group-premium">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue={selectedStaff.phone} />
                </div>

                <div className="form-group-premium">
                  <label>Role</label>
                  <select defaultValue={selectedStaff.role}>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer-premium">
              <button className="btn-cancel" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleEditStaff}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

