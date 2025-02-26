import axios from "axios";

const API_URL = "http://localhost:8080/api/timers";

export const fetchTimers = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export const createTimer = async (data) => {
  const response = await axios.post(API_URL, data, { withCredentials: true });
  return response.data;
};

export const deleteTimer = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export const updateTimer = async (id, data) => {
  await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
};
