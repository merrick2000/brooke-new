import axios from "axios";
import { API_BASE_URL } from "../helpers/data";
import { ITeamData } from "@/types/IUser";

export const getUsers = (params = {}) => {
  return axios.get(`${API_BASE_URL}/admin/users`, {
    params,
  });
};

export const getTeams = (params = {}) => {
  return axios.get(`${API_BASE_URL}/admin/teams`, {
    params,
  });
};

export const createTeam = (data: ITeamData) => {
  return axios.post(`${API_BASE_URL}/admin/teams`, data);
};

export const updateTeam = (data: ITeamData) => {
  return axios.put(`${API_BASE_URL}/admin/teams/${data.id}`, data);
};

export const deleteTeam = (id: string) => {
  return axios.delete(`${API_BASE_URL}/admin/teams/${id}`);
};

export const getMatches = (params = {}) => {
  return axios.get(`${API_BASE_URL}/admin/games`, { params });
};

export const createMatch = (data: any) => {
  return axios.post(`${API_BASE_URL}/admin/games`, data);
};

export const updateMatch = (data: any) => {
  return axios.put(`${API_BASE_URL}/admin/games/${data.id}`, data);
};

export const deleteMatch = (id: string) => {
  return axios.delete(`${API_BASE_URL}/admin/games/${id}`);
};


export const saveMatchResult = (data: any) => {
  return axios.post(`${API_BASE_URL}/admin/bets`, data);
};