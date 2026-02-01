import React, { useEffect, useState } from "react";
import {
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../services/api";
import ComplaintCard from "./ComplaintCard";

const ComplaintList = ({ isManagement }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComplaints = () => {
    getAllComplaints()
      .then((res) => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatusChange = (id, status) => {
    updateComplaintStatus(id, status).then(() => {
      loadComplaints();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this complaint?")) {
      deleteComplaint(id).then(() => {
        loadComplaints();
      });
    }
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div>
      {complaints.length === 0 && <p>No complaints found.</p>}

      {complaints.map((c) => (
        <ComplaintCard
          key={c.id}
          complaint={c}
          isManagement={isManagement}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ComplaintList;
