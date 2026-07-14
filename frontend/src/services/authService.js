import api from "../api/api";

const authService = {
  register: async (userData) => {
    const response = await api.post("register/", userData);
    return response.data;
  },

  login: async (userData) => {
    const response = await api.post("login/", userData);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
    },

  getProfile: async () => {
    const token = localStorage.getItem("access");
    const response = await api.get("profile/", { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};

export default authService;