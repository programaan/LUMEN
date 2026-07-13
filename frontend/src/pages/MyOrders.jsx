import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import productService from "../services/productService";

import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      await productService.cancelOrder(orderId);

      const data = await productService.getOrders();
      setOrders(data);

      toast.success("Order cancelled successfully.");
    } catch (error) {
        console.error(error);
        toast.error("Failed to cancel order.");
      }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data =
          await productService.getOrders();

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders | LUMEN</title>

        <meta name="robots" content="noindex" />
      </Helmet>

      <Navbar />

      <div className="orders-page">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">
              📦
            </div>

            <h3>No Orders Yet</h3>

            <p>
              Looks like you haven't placed
              an order yet.
            </p>

            <Link
              to="/collection"
              className="empty-btn"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h3>
                Order #{order.id}
              </h3>

              <p>
                Status:
                <span className="status-badge">
                  {order.status}
                </span>
              </p>

              <p>
                Date:{" "}
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

              <hr />

              {order.items.map((item) => (
                <div
                  className="order-item"
                  key={item.id}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    width="80"
                  />

                  <div>
                    <h4>
                      {item.product.name}
                    </h4>

                    <p>
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <p>
                      Price: $
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}

              <hr />

              <div className="order-footer">
                <h3>
                  Total: ${order.total_price}
                </h3>

                {order.status.toLowerCase() === "pending" && (
                  <button
                    className="cancel-order-btn"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;