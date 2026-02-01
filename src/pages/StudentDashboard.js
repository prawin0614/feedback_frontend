// src/pages/StudentDashboard.js
import React, { useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintCard from "../components/ComplaintCard";
import { getComplaints, postComplaint, updateStatus } from "../services/api";
import ParticleBackground from "../components/ParticleBackground";
import "../pages/StudentDashboard.css";
import { toast } from "react-toastify";

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);

  // Fetch complaints for the student
  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data);
      setLoadedOnce(true);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      const isNetworkError =
        error?.code === "ERR_NETWORK" ||
        error?.message?.toLowerCase?.().includes("network") ||
        error?.message?.toLowerCase?.().includes("failed to fetch");
      toast.error(
        isNetworkError
          ? "Backend not reachable. Start Spring Boot (localhost:8080) and try again."
          : "Failed to fetch complaints"
      );
    }
  };

  // Handle submit complaint
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await postComplaint(data);
      toast.success("Complaint submitted successfully!");
      if (res?.data) {
        setComplaints((prev) => [res.data, ...prev]);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  // Handle mark resolved by student
  const handleMarkResolved = async (id) => {
    try {
      setLoading(true);
      await updateStatus(id, "Resolved");
      toast.success("Marked as Resolved!");
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: "Resolved" } : c))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <ParticleBackground />
      <div className="page-content">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <ComplaintForm onSubmit={handleSubmit} loading={loading} />

        <div className="toolbar">
          <button
            type="button"
            className="refresh-btn"
            onClick={fetchComplaints}
            disabled={loading}
          >
            {loadedOnce ? "Refresh Complaints" : "Load My Complaints"}
          </button>
        </div>

        <div className="complaints-grid">
          {!loadedOnce && complaints.length === 0 ? (
            <p>Click “Load My Complaints” to view status.</p>
          ) : complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            complaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                isManagement={false}
                onStatusChange={(id) => handleMarkResolved(id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
