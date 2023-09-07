import axios from "axios";
import { API_BASE_URL } from "../helpers/data";


export const createUser = (data: {
    email: string,
    password: string;
    username: string;
    birthDate: string;
    firstName?: string;
    lastName?: string;

}) => {
    return axios.post(`${API_BASE_URL}/auth/register`, data);
};

export const loginUser = (data: {
    email: string,
    password: string
}) => {
    return axios.post(`${API_BASE_URL}/auth/login`, data);
};


export const getUserData = () => {
    return axios.get(`${API_BASE_URL}/users/me`);
};

export const updateUserData = (data: any) => {
    return axios.put(`${API_BASE_URL}/users/me`, data);
};

