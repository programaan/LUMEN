import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import "./styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <HelmetProvider>
          <App />
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={2500}
          />
          </HelmetProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);