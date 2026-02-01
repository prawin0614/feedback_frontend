import axios from "axios";

const BASE_URL = "/api/complaints";

// 🔹 Student & Management - Get all complaints
export const getAllComplaints = () => {
  return axios.get(BASE_URL);
};

// Backward/alternate naming used in pages
export const getComplaints = getAllComplaints;

// 🔹 Student - Submit new complaint
export const createComplaint = (complaint) => {
  return axios.post(BASE_URL, complaint);
};

// Backward/alternate naming used in pages
export const postComplaint = createComplaint;

// 🔹 Student / Management - Update status
export const updateComplaintStatus = (id, status) => {
  return axios.put(`${BASE_URL}/${id}/status`, null, {
    params: { status },
  });
};

// Backward/alternate naming used in pages
export const updateStatus = updateComplaintStatus;

// 🔹 Management - Delete complaint
export const deleteComplaint = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
