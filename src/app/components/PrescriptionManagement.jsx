import React, { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye,
  Plus,
  Calendar,
  UserCheck,
} from "lucide-react";
import "./PrescriptionManagement.css";

const initialPrescriptions = [
  {
    id: "RX001",
    patientName: "John Smith",
    patientId: "PT001",
    doctorName: "Dr. Sarah Johnson",
    uploadDate: "2024-12-16 10:30 AM",
    status: "Verified",
    medicines: ["Amoxicillin 500mg", "Paracetamol 650mg"],
    linkedBill: "BILL-2024-001",
    prescriptionImage: "prescription1.jpg",
  },
  {
    id: "RX002",
    patientName: "Emma Davis",
    patientId: "PT002",
    doctorName: "Dr. Michael Brown",
    uploadDate: "2024-12-16 11:15 AM",
    status: "Pending",
    medicines: ["Metformin 500mg", "Atorvastatin 20mg"],
    prescriptionImage: "prescription2.jpg",
  },
  {
    id: "RX003",
    patientName: "Robert Wilson",
    patientId: "PT003",
    doctorName: "Dr. Emily White",
    uploadDate: "2024-12-16 09:45 AM",
    status: "Rejected",
    medicines: ["Controlled substance"],
    prescriptionImage: "prescription3.jpg",
  },
];

const patientHistory = [
  {
    id: "RX005",
    date: "2024-11-10",
    doctor: "Dr. Sarah Johnson",
    medicines: ["Amoxicillin 500mg"],
    status: "Completed",
  },
];

export function PrescriptionManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [pageAll, setPageAll] = useState(1);
  const [rowsAll, setRowsAll] = useState(10);
  const [pageHistory, setPageHistory] = useState(1);
  const [rowsHistory, setRowsHistory] = useState(10);
  
  // Form state for adding prescription
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    patientName: "",
    doctorName: "",
    medicines: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return `${date} ${time}`;
  };

  const handleAddPrescription = () => {
    if (!newPrescription.patientId || !newPrescription.patientName || !newPrescription.doctorName || !newPrescription.medicines) {
      alert("Please fill all required fields");
      return;
    }

    const newId = `RX${String(prescriptions.length + 1).padStart(3, '0')}`;
    const newRx = {
      id: newId,
      patientName: newPrescription.patientName,
      patientId: newPrescription.patientId,
      doctorName: newPrescription.doctorName,
      uploadDate: getCurrentDateTime(),
      status: "Pending",
      medicines: newPrescription.medicines.split('\n').filter(m => m.trim()),
      prescriptionImage: selectedFile ? selectedFile.name : "prescription.jpg",
    };

    setPrescriptions([...prescriptions, newRx]);
    setNewPrescription({
      patientId: "",
      patientName: "",
      doctorName: "",
      medicines: "",
    });
    setSelectedFile(null);
    setShowAddModal(false);
    alert("Prescription added successfully!");
  };

  const handleViewPrescription = (rx) => {
    setSelectedPrescription(rx);
    setShowViewModal(true);
  };

  const handleVerifyPrescription = (id) => {
    setPrescriptions(prescriptions.map(rx => 
      rx.id === id ? { ...rx, status: "Verified" } : rx
    ));
  };

  const handleRejectPrescription = (id) => {
    setPrescriptions(prescriptions.map(rx => 
      rx.id === id ? { ...rx, status: "Rejected" } : rx
    ));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    if (activeTab === "pending") return rx.status === "Pending";
    if (activeTab === "verified") return rx.status === "Verified";
    if (activeTab === "rejected") return rx.status === "Rejected";
    return true;
  });

  const pagedPrescriptions = filteredPrescriptions.slice(
    (pageAll - 1) * rowsAll,
    pageAll * rowsAll
  );

  return (
    <div className="rx">
      {/* Header */}
      <div className="rx-header">
        <div>
          <h1>Prescription Management</h1>
          <p>Add, verify, and manage prescriptions</p>
        </div>
        <button className="btn primary" onClick={() => setShowAddModal(true)}>
          <Plus /> Add Prescription
        </button>
      </div>

      {/* Stats */}
      <div className="rx-stats">
        <div className="rx-stat">
          <FileText />
          <div>
            <strong>{prescriptions.length}</strong>
            <span>Total</span>
          </div>
        </div>
        <div className="rx-stat warning">
          <Clock />
          <div>
            <strong>{prescriptions.filter(p => p.status === "Pending").length}</strong>
            <span>Pending</span>
          </div>
        </div>
        <div className="rx-stat success">
          <CheckCircle />
          <div>
            <strong>{prescriptions.filter(p => p.status === "Verified").length}</strong>
            <span>Verified</span>
          </div>
        </div>
        <div className="rx-stat danger">
          <XCircle />
          <div>
            <strong>{prescriptions.filter(p => p.status === "Rejected").length}</strong>
            <span>Rejected</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rx-tabs">
        {["all", "pending", "verified", "rejected", "history"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* All Prescriptions */}
      {activeTab !== "history" && (
        <div className="rx-card">
          <table className="rx-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Medicines</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedPrescriptions.map(rx => (
                <tr key={rx.id}>
                  <td>{rx.id}</td>
                  <td>
                    <strong>{rx.patientName}</strong>
                    <div className="muted">{rx.patientId}</div>
                  </td>
                  <td>{rx.doctorName}</td>
                  <td>{rx.uploadDate}</td>
                  <td>
                    <div className="medicines-list">
                      {rx.medicines.map((m, idx) => (
                        <div key={idx} className="medicine-item">{m}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${rx.status.toLowerCase()}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn small view-btn" 
                        onClick={() => handleViewPrescription(rx)}
                        title="View Prescription"
                      >
                        <Eye size={14} /> View
                      </button>
                      {rx.status === "Pending" && (
                        <>
                          <button 
                            className="btn small verify-btn" 
                            onClick={() => handleVerifyPrescription(rx.id)}
                          >
                            <CheckCircle size={14} /> Verify
                          </button>
                          <button 
                            className="btn small reject-btn" 
                            onClick={() => handleRejectPrescription(rx.id)}
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </>
                      )}
                      {rx.linkedBill && (
                        <span className="linked-bill">{rx.linkedBill}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <div>Showing {((pageAll - 1) * rowsAll) + 1}-{Math.min(pageAll * rowsAll, filteredPrescriptions.length)} of {filteredPrescriptions.length}</div>
            <div className="rows-per-page">
              <span>Rows per page:</span>
              <select 
                value={rowsAll}
                onChange={(e) => setRowsAll(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Patient History */}
      {activeTab === "history" && (
        <div className="rx-card">
          <div className="rx-patient">
            <UserCheck size={24} />
            <div>
              <strong>John Smith</strong>
              <span className="muted">PT001</span>
            </div>
          </div>

          <table className="rx-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Medicines</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientHistory
                .slice((pageHistory - 1) * rowsHistory, pageHistory * rowsHistory)
                .map(h => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.date}</td>
                    <td>{h.doctor}</td>
                    <td>{h.medicines.join(", ")}</td>
                    <td>
                      <span className="badge secondary">{h.status}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="pagination">
            <div>Showing 1-{patientHistory.length} of {patientHistory.length}</div>
            <div className="rows-per-page">
              <span>Rows per page:</span>
              <select 
                value={rowsHistory}
                onChange={(e) => setRowsHistory(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add New Prescription</h2>
            
            <div className="form-group">
              <label>Patient ID *</label>
              <input 
                placeholder="Enter patient ID (e.g., PT001)" 
                value={newPrescription.patientId}
                onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Patient Name *</label>
              <input 
                placeholder="Enter patient name" 
                value={newPrescription.patientName}
                onChange={(e) => setNewPrescription({...newPrescription, patientName: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Doctor Name *</label>
              <input 
                placeholder="Enter doctor name" 
                value={newPrescription.doctorName}
                onChange={(e) => setNewPrescription({...newPrescription, doctorName: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Prescription Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="file-info">Selected: {selectedFile.name}</div>
              )}
            </div>
            
            <div className="form-group">
              <label>Medicines * (one per line)</label>
              <textarea 
                rows="4" 
                placeholder="Enter medicines, one per line"
                value={newPrescription.medicines}
                onChange={(e) => setNewPrescription({...newPrescription, medicines: e.target.value})}
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn primary" onClick={handleAddPrescription}>
                <Plus /> Add Prescription
              </button>
              <button className="btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {showViewModal && selectedPrescription && (
        <div className="modal">
          <div className="modal-box view-modal">
            <h2>View Prescription - {selectedPrescription.id}</h2>
            
            <div className="prescription-details">
              <div className="detail-row">
                <span className="detail-label">Patient:</span>
                <span className="detail-value">{selectedPrescription.patientName} ({selectedPrescription.patientId})</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{selectedPrescription.doctorName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedPrescription.uploadDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`badge ${selectedPrescription.status.toLowerCase()}`}>
                  {selectedPrescription.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Medicines:</span>
                <div className="detail-value">
                  {selectedPrescription.medicines.map((m, idx) => (
                    <div key={idx} className="medicine-item">{m}</div>
                  ))}
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Prescription Image:</span>
                <div className="prescription-image-preview">
                  <FileText size={48} />
                  <div>{selectedPrescription.prescriptionImage}</div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn primary" onClick={() => window.open(`#${selectedPrescription.prescriptionImage}`, '_blank')}>
                <Eye /> View Full Image
              </button>
              <button className="btn" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}