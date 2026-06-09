import axios from "axios";

const apiKey = process.env.REQRES_API_KEY;

export const serverApiClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    ...(apiKey ? { "x-api-key": apiKey } : {}),
  },
});

serverApiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.error || err.message || "Request failed";
    return Promise.reject(new Error(msg));
  },
);
