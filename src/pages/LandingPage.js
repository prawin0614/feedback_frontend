// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { toast } from "react-toastify";
import "./LandingPage.css"; // optional for custom styles

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate("/student");
  };

  const handleManagementClick = () => {
    const password = prompt("Enter management password:");
    if (password === "2006") {
      localStorage.setItem("mgmtAuthed", "true");
      navigate("/management");
    } else {
      localStorage.removeItem("mgmtAuthed");
      toast.error("Incorrect password!");
    }
  };

  return (
    <div className="landing-page">
      <ParticleBackground />
      <div className="landing-content">
        <h1 className="landing-title">Smart Complaint & Feedback Management System</h1>
        <p className="landing-subtitle">
          Submit, Track, and Resolve Complaints Seamlessly
        </p>
        <div className="landing-buttons">
          <button className="btn-student" onClick={handleStudentClick}>
            Student
          </button>
          <button className="btn-management" onClick={handleManagementClick}>
            Management
          </button>
        </div>
      </div>
    </div>
  );
}
