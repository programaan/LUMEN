import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

function Success() {
  const orderNumber = "#" + Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <Helmet>
        <title>Order Confirmed | LUMEN</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Navbar />

      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>Order Confirmed</h1>

          <p className="success-message">
            Thank you for shopping with{" "}
            <strong>LUMEN</strong>.
          </p>

          <p>
            Your payment was successful and your order has been placed.
          </p>

          <div className="success-info">
            <div>
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="success-status">Confirmed</strong>
            </div>

            <div>
              <span>Estimated Delivery</span>
              <strong>3–5 Business Days</strong>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/orders" className="view-orders">
              View My Orders
            </Link>

            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Success;