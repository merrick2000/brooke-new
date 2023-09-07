import axios from "axios";
import { API_BASE_URL } from "../helpers/data";

export const getRewards = (params = {}) => {
  return axios.get(`${API_BASE_URL}/rewards`, {
    params,
  });
};

export const createReward = (data: any) => {
  return axios.post(`${API_BASE_URL}/rewards`, data);
};

export const updateReward = (data: any) => {
  return axios.put(`${API_BASE_URL}/rewards/${data.id}`, data);
};

export const deleteReward = (id: string) => {
  return axios.delete(`${API_BASE_URL}/rewards/${id}`);
};
