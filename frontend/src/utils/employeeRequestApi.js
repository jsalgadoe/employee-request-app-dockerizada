import axios from "axios";

const employeeRequestApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

employeeRequestApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { employeeRequestApi };
