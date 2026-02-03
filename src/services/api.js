import axios from "axios";

const API = axios.create({
  baseURL: "https://feedback-backend-u96e.onrender.com",
});

// 🔹 Student & Management - Get all complaints
export const getAllComplaints = () => {
  return API.get("/api/complaints");
};

export const getComplaints = getAllComplaints;

// 🔹 Student - Submit new complaint
export const createComplaint = (complaint) => {
  return API.post("/api/complaints", complaint);
};

export const postComplaint = createComplaint;

// 🔹 Student / Management - Update status
export const updateComplaintStatus = (id, status) => {
  return API.put(`/api/complaints/${id}/status`, null, {
    params: { status },
  });
};

export const updateStatus = updateComplaintStatus;

// 🔹 Management - Delete complaint
export const deleteComplaint = (id) => {
  return API.delete(`/api/complaints/${id}`);
};
