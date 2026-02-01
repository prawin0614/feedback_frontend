import React from "react";
import StatusBadge from "./StatusBadge";
import "./ComplaintCard.css";

export default function ComplaintCard({ complaint, isManagement=false, onStatusChange, onDelete }) {
  return (
    <div className="complaint-card">
      <h3>{complaint.complaintType}</h3>
      {complaint.studentName && <p><strong>Student:</strong> {complaint.studentName}</p>}
      <p>{complaint.description}</p>
      
      <div className="card-bottom">
        <StatusBadge status={complaint.status} />
        
        {isManagement && (
          <div className="actions">
            <select
              value={complaint.status}
              onChange={(e) => onStatusChange(complaint.id, e.target.value)}
            >
              {complaint.status !== "In Progress" && complaint.status !== "Resolved" && (
                <option value={complaint.status} disabled>
                  {complaint.status}
                </option>
              )}
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <button className="delete-btn" onClick={() => onDelete(complaint.id)}>
              🗑 Delete
            </button>
          </div>
        )}

        {!isManagement && complaint.status !== "Resolved" && (
          <button
            className="resolve-btn"
            onClick={() => onStatusChange(complaint.id, "Resolved")}
          >
            Mark Resolved
          </button>
        )}
      </div>
    </div>
  );
}
