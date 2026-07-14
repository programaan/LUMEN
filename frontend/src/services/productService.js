import api from "../api/api";

const productService = {
  getProducts: async () => {
    const response = await api.get("products/");
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get("products/featured/");
    return response.data;
  },

  getLatestProducts: async () => {
    const response = await api.get("products/latest/");
    return response.data;
  },

  getProduct: async (slug) => {
    const response = await api.get(`products/${slug}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("categories/");
    return response.data;
  },

  getCart: async () => {
    const token = localStorage.getItem("access");
    const response = await api.get(
      "cart/", 
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  addToCart: async (productId) => {
    const token = localStorage.getItem("access");
    const response = await api.post(
      "cart/add/", 
      { product_id: productId }, 
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  updateCart: async (productId, action) => {
    const token = localStorage.getItem("access");
    const response = await api.patch(
      "cart/update/", 
      { product_id: productId, action }, 
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const token = localStorage.getItem("access");
    await api.delete(
      `cart/remove/${productId}/`, 
      { headers: { Authorization: `Bearer ${token}` } });
  },

  createPayment: async () => {
    const token = localStorage.getItem("access");
    const response = await api.post(
      "orders/create-payment/", 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  verifyPayment: async (payment_id, order_id, signature) => {
    const token = localStorage.getItem("access");
    const response = await api.post(
      "orders/verify-payment/",
      { payment_id, order_id, signature },
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  getOrders: async () => {
    const token = localStorage.getItem("access");
    const response = await api.get(
      "orders/", 
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  getOrder: async (id) => {
    const token = localStorage.getItem("access");
    const response = await api.get(
      `orders/${id}/`,
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post(
      "forgot-password/",
      { email });
    return response.data;
  },

  resetPassword: async (uid, token, password, confirmPassword) => {
    const response = await api.post(
      `reset-password/${uid}/${token}/`,
      { password, confirm_password: confirmPassword });
    return response.data;
  },


  verifyEmail: async (uid, token) => {
    const response = await api.get(
      `verify-email/${uid}/${token}/`);
    return response.data;
  },

  subscribeNewsletter: async (email) => {
    const response = await api.post(
      "newsletter/",
      { email });
    return response.data;
  },

  cancelOrder: async (id) => {
    const token = localStorage.getItem("access");
    const response = await api.patch(
      `orders/${id}/cancel/`,
      {},
      { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
};

export default productService;