import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

import productService from "../services/productService";

import { Helmet } from "react-helmet-async";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }

    try {
      await productService.forgotPassword(email);

      toast.success("Password reset link sent to your email.");
      setEmail("");
    } 
    catch (error) {
      toast.error(error.response?.data?.detail || "Something went wrong.");
    }
  }

  return (
    <section className="account-page">

      <Helmet>
        <title>Forgot Password | LUMEN</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="account-card">
        <h2>Forgot Password</h2>

        <p className="account-text">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form className="account-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />

          <button type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="account-divider"></div>

        <NavLink to="/account" className="account-link">
          Back to Sign In
        </NavLink>
      </div>
    </section>
  );
}

export default ForgotPassword;