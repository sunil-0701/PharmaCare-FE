import React, { useState } from "react";
import "./StaffManagement.css";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { toast } from "sonner";


const staffMembers = [
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
    toast.success("Staff member added");
    setShowAdd(false);
  };

  const handleEditStaff = () => {
    toast.success("Staff updated");
    setShowEdit(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (name) => {
    toast.success(`${name} removed`);
  };

  const toggleStatus = (name, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    toast.success(`${name} is now ${newStatus}`);
  };

  return (
    <div className="staff-page">
      {/* Header */}
      <div className="staff-header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage user accounts and roles</p>
        </div>
        <button className="btn primary" onClick={() => setShowAdd(true)}>
          <Plus /> Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="staff-stats">
        <div className="stat-card">
          <Users />
          <div>
            <strong>{staffMembers.length}</strong>
            <span>Total Staff</span>
          </div>
        </div>

        <div className="stat-card green">
          <UserCheck />
          <div>
            <strong>{staffMembers.filter(s => s.status === "Active").length}</strong>
            <span>Active</span>
          </div>
        </div>

        <div className="stat-card gray">
          <UserX />
          <div>
            <strong>{staffMembers.filter(s => s.status !== "Active").length}</strong>
            <span>Inactive</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td><span className="badge">{staff.role}</span></td>
                <td>{staff.joinDate}</td>
                <td>
                  <span className={`badge ${staff.status === "Active" ? "success" : "muted"}`}>
                    {staff.status}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="icon-btn"
                    onClick={() => {
                      setSelectedStaff(staff);
                      setShowEdit(true);
                    }}
                  >
                    <Edit />
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => toggleStatus(staff.name, staff.status)}
                  >
                    {staff.status === "Active" ? <UserX /> : <UserCheck />}
                  </button>
                  <button
                    className="icon-btn danger"
                    onClick={() => handleDeleteStaff(staff.name)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Staff Member</h2>
            <input placeholder="Full Name" />
            <input placeholder="Email" />
            <input placeholder="Phone" />
            <select>
              <option>Admin</option>
              <option>Pharmacist</option>
              <option>Inventory Manager</option>
            </select>
            <input type="password" placeholder="Temporary Password" />
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn primary" onClick={handleAddStaff}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && selectedStaff && (
        <div className="modal">
          <div className="modal-box">
            <h2>Edit Staff</h2>
            <input defaultValue={selectedStaff.name} />
            <input defaultValue={selectedStaff.email} />
            <input defaultValue={selectedStaff.phone} />
            <select defaultValue={selectedStaff.role}>
              <option>Pharmacist</option>
              <option>Inventory Manager</option>
            </select>
            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="btn primary" onClick={handleEditStaff}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
