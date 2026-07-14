import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import productService from "../services/productService";
import Loader from "../components/Loader";

import { Helmet } from "react-helmet-async";

function ResetPassword() {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.warning("Please fill all fields.");
      return;
    }

    try {
      await productService.resetPassword(uid, token, password, confirmPassword);

      toast.success("Password changed successfully.");
      navigate("/account");
    } 
    catch (error) {
      toast.error(error.response?.data?.detail || "Reset link is invalid.");
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="account-page">

      <Helmet>
        <title>Reset Password | LUMEN</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="account-card">
        <h2>Create New Password</h2>

        <form className="account-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;