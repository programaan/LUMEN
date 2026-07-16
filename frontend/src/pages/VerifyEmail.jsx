import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import productService from "../services/productService";
import Loader from "../components/Loader";

function VerifyEmail() {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || !token) return;

    async function verify() {
      try {
        await productService.verifyEmail(uid, token);
        toast.success("Email verified successfully!");
        navigate("/account");
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Verification failed."
        );
        navigate("/account");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [uid, token, navigate]);

  if (loading) {
      return <Loader />;
    }

  return (
    <section className="account-page">
      <div className="account-card">
        <h2>Verifying Email...</h2>

        <p className="account-text">
          Please wait while we verify your account.
        </p>
      </div>
    </section>
  );
}

export default VerifyEmail;