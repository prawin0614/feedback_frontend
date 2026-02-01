import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  const getBadge = () => {
    switch (status) {
      case "Application Submitted":
        return { color: "#3498db", text: "Application Submitted", spinner: false };
      case "Viewed":
        return { color: "#f1c40f", text: "Viewed", spinner: false };
      case "In Progress":
        return { color: "#e67e22", text: "In Progress", spinner: true };
      case "Resolved":
        return { color: "#2ecc71", text: "Resolved", spinner: false, stars: true };
      default:
        return { color: "#95a5a6", text: status, spinner: false };
    }
  };

  const badge = getBadge();

  return (
    <div
      className="status-badge"
      style={{ backgroundColor: badge.color }}
    >
      {badge.spinner ? (
        <ClipLoader size={15} color="#fff" />
      ) : badge.stars ? (
        <span className="stars">⭐</span>
      ) : null}
      <span className="badge-text">{badge.text}</span>
    </div>
  );
}
