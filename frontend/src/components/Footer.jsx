import { useState } from "react";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

import productService from "../services/productService";


const navLinks = [
  {
    name: "Shop",
    path: "/",
  },
  {
    name: "Collections",
    path: "/collection",
  },
  {
    name: "About",
    path: "/about",
  },
];

const footerImage = "https://ik.imagekit.io/kjwgmmtvi/Footer.jpg";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Please enter your email.");
      return;
    }

    try {
      await productService.subscribeNewsletter(email);

      toast.success("Subscribed successfully!");

      setSubscribed(true);
      setEmail("");
    } 
    catch (error) {
      if (error.response?.data?.email?.[0]) {
        toast.error(error.response.data.email[0]);
      } 
      else {
        toast.error("You are already subscribed.");
      }
    }
  };

  return (
    <section className="philosophy">
      <div className="top">
        <div className="left">
          <h2>Our Philosophy</h2>
          <p>We create thoughtfully crafted pieces designed to elevate youreveryday wardrobe. Our designs blend timeless silhouettes with amodern edge, offering style that transcends trends.</p>
        </div>

        <div className="center">
          <img src={footerImage} alt="Model" />
        </div>

        <div className="right">
          <form className="signup" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Newsletter"
              value={email}
              disabled={subscribed}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" disabled={subscribed}>
              {subscribed ? "Subscribed" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <div className="middle">
        <nav className="navbar">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? "active" : ""}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="socials">
          <span>
            <i className="fa-brands fa-facebook-f"></i>
          </span>

          <span>
            <i className="fa-brands fa-instagram"></i>
          </span>

          <span>
            <i className="fa-brands fa-youtube"></i>
          </span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="bottom">
        <p>© 2026 LUMEN. All rights reserved.</p>

        <div className="payments">
          <span>
            <i className="fa-brands fa-cc-visa"></i>
          </span>

          <span>
            <i className="fa-brands fa-cc-mastercard"></i>
          </span>

          <span>
            <i className="fa-brands fa-cc-paypal"></i>
          </span>

          <span>
            <i className="fa-brands fa-cc-amex"></i>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Footer;