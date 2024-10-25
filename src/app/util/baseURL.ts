import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const apiBackend = "https://localhost:8000";

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
  const token = await fetchToken() || "";

  const apiLogin = axios.create({
    baseURL: `${apiBackend}/api/v1/auth/login`,
  });

  apiLogin.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const apiInstance = axios.create({
    baseURL: apiBackend,
  });

  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token) {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { apiLogin, apiInstance };
}
