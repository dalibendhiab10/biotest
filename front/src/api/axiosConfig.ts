import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

// Define the base URL from environment variables
export const baseURL = import.meta.env.VITE_NODE_SERVER_HOST;

// Create an axios instance
const Client = axios.create({
  baseURL,
});

// Define the type for the JWT claims
interface JwtClaims {
  exp: number;
  [key: string]: any;
}

// Define the config for axios requests
const config = (token: string): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// POST action
const post = async (url: string, data: any): Promise<any> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = token
      ? await Client.post(url, data, config(token))
      : await Client.post(url, data);
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

// GET action
const get = async (url: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = token
      ? await Client.get(url, config(token))
      : await Client.get(url);
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

// PATCH action
const patch = async (url: string, data: any): Promise<any> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = token
      ? await Client.patch(url, data, config(token))
      : await Client.patch(url, data);
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

// PUT (Update) action
const update = async (url: string, data: any): Promise<any> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = token
      ? await Client.put(url, data, config(token))
      : await Client.put(url, data);
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

// DELETE action
const remove = async (url: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = token
      ? await Client.delete(url, config(token))
      : await Client.delete(url);
    return response.data;
  } catch (err: any) {
    console.error({ err });
    throw err.response?.data || err;
  }
};

// Authentication check
const isAuth = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || "";
    if (!token) return false;

    try {
      const claims = jwtDecode<JwtClaims>(token);
      const expirationTimeInSeconds = claims.exp * 1000;
      const now = new Date();

      return expirationTimeInSeconds >= now.getTime();
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return false;
    }
  }
  return false;
};

// Logout function
const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
};

export { get, post, remove, patch, update, isAuth, logout };
