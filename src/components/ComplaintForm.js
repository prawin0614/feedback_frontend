import React, { useState } from "react";
import { createComplaint } from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";

const ComplaintForm = ({ onSuccess, onSubmit, loading: loadingProp = false }) => {
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);

  const isControlled = typeof onSubmit === "function";
  const effectiveLoading = isControlled ? loadingProp : loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaintType || !description) {
      alert("Complaint type and description are required");
      return;
    }

    const payload = {
      studentName: studentName.trim() || "Anonymous Student",
      complaintType,
      description,
    };

    if (isControlled) {
      await onSubmit(payload);
      setComplaintType("");
      setDescription("");
      setStudentName("");
      return;
    }

    setLoading(true);

    createComplaint(payload)
      .then(() => {
        setComplaintType("");
        setDescription("");
        setStudentName("");
        setLoading(false);
        onSuccess?.(); // reload list
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
      <h3>Submit Complaint</h3>

      <input
        type="text"
        placeholder="Student Name (optional)"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      <select
        value={complaintType}
        onChange={(e) => setComplaintType(e.target.value)}
      >
        <option value="">Select Complaint Type</option>
        <option value="Classroom">Classroom</option>
        <option value="Hostel">Hostel</option>
        <option value="Transport">Transport</option>
        <option value="Library">Library</option>
        <option value="Others">Others</option>
      </select>

      <textarea
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit" disabled={effectiveLoading}>
        {effectiveLoading ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <ClipLoader size={16} color="#fff" />
            Submitting...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default ComplaintForm;
