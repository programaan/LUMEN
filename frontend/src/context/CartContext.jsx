import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

import productService from "../services/productService";

export const CartContext = createContext();

function CartProvider({ children }) {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const data = await productService.getCart();
      setCart(data);
    } 
    catch (error) {
      console.error(error);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();

    window.addEventListener("storage", fetchCart);

    return () => {
      window.removeEventListener("storage",fetchCart);
    };
  }, []);

  useEffect(() => {
    if (showCart) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } 
    else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCart]);

  async function addToCart(id) {
    try {
      await productService.addToCart(id);
      toast.success("Added to cart!");
      await fetchCart();
    } 
    catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to continue.");
        navigate("/account");
        return;
      }

      toast.error(error.response?.data?.detail || "Failed to add item to cart.");
      console.error(error);
    }
  }

  async function increaseQuantity(id) {
    try {
      await productService.updateCart(id, "increase");
      await fetchCart();
    } 
    catch (error) {
      toast.error(error.response?.data?.detail || "Failed to update cart.");
    }
  }

  async function decreaseQuantity(id) {
    try {
      await productService.updateCart(id, "decrease");
      await fetchCart();
    } 
    catch (error) {
      toast.error(error.response?.data?.detail || "Failed to update cart.");
    }
  }

  async function removeFromCart(id) {
    try {
      await productService.removeFromCart(id);
      toast.success("Item removed.");
      await fetchCart();
    } 
    catch (error) {
      toast.error(error.response?.data?.detail || "Failed to remove item.");
    }
  }

  return (
    <CartContext.Provider value={{cart, setCart, fetchCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, showCart, setShowCart,}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;