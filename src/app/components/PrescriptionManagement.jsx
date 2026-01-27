import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrescriptions } from "../contexts/PrescriptionContext.jsx";
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
import { Pagination } from "./Pagination.jsx";
import "./PrescriptionManagement.css";

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
  const navigate = useNavigate();
  const { prescriptions, updatePrescriptionStatus } = usePrescriptions();
  const [activeTab, setActiveTab] = useState("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [pageAll, setPageAll] = useState(1);
  const [rowsAll, setRowsAll] = useState(10);
  const [pageHistory, setPageHistory] = useState(1);
  const [rowsHistory, setRowsHistory] = useState(10);

  const handleViewPrescription = (rx) => {
    setSelectedPrescription(rx);
    setShowViewModal(true);
  };

  const handleVerifyPrescription = (id) => {
    updatePrescriptionStatus(id, "Verified");
  };

  const handleRejectPrescription = (id) => {
    updatePrescriptionStatus(id, "Rejected");
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
      <div className="rx-header">
        <div>
          <h1>Prescription Management</h1>
          <p>Add, verify, and manage prescriptions</p>
        </div>
        <button className="btn primary" onClick={() => navigate('/prescriptions/add')}>
          <Plus /> Add Prescription
        </button>
      </div>

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

          <Pagination
            currentPage={pageAll}
            totalItems={filteredPrescriptions.length}
            rowsPerPage={rowsAll}
            onPageChange={setPageAll}
            onRowsPerPageChange={(rows) => {
              setRowsAll(rows);
              setPageAll(1);
            }}
          />
        </div>
      )}

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

          <Pagination
            currentPage={pageHistory}
            totalItems={patientHistory.length}
            rowsPerPage={rowsHistory}
            onPageChange={setPageHistory}
            onRowsPerPageChange={(rows) => {
              setRowsHistory(rows);
              setPageHistory(1);
            }}
          />
        </div>
      )}

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