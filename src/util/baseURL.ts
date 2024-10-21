import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const apiBackend = "http://localhost:8000";

async function fetchToken(): Promise<string | undefined> {
  try {
    const response = await axios.get('/api/getToken');
    return response.data.token;
  } catch (error) {
    console.error("Failed to fetch token", error);
    return undefined;
  }
}

export async function createApiInstances(): Promise<{ apiLogin: AxiosInstance; apiInstance: AxiosInstance }> {
  let token = localStorage.getItem('authToken') || "";

  if (!token) {
    token = await fetchToken() || "";
  }

  const apiLogin = axios.create({
    baseURL: `${apiBackend}/api/v1/auth/login`,
  });

  apiLogin.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const apiInstance = axios.create({
    baseURL: apiBackend,
  });

  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return { apiLogin, apiInstance };
}
