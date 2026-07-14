import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {useContext, useState} from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import productService from "../services/productService";


function Checkout() {
  const { cart, fetchCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const [form, setForm] = useState({firstName: "", lastName: "", email: "", phone: "", address: "", city: "", country: ""});

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity, 0);

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handlePlaceOrder() {
    if (processing) return;

    const nameRegex = /^[A-Za-z ]+$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(
        form.firstName.trim()
      )
    ) {
      toast.error("Enter a valid first name.");
      return;
    }

    if (!nameRegex.test(
        form.lastName.trim()
      )
    ) {
      toast.error("Enter a valid last name.");
      return;
    }

    if (!emailRegex.test(
        form.email.trim()
      )
    ) {
      toast.error("Enter a valid email.");
      return;
    }

    if (!phoneRegex.test(
        form.phone.trim()
      )
    ) {
      toast.error("Phone number must contain exactly 10 digits.");
      return;
    }

    if (form.address.trim().length < 10) {
      toast.error("Address must be at least 10 characters.");
      return;
    }

    if (!nameRegex.test(
        form.city.trim()
      )
    ) {
      toast.error("Enter a valid city.");
      return;
    }

    if (!nameRegex.test(
        form.country.trim()
      )
    ) {
      toast.error("Enter a valid country.");
      return;
    }

    setProcessing(true);

    try {
      const payment = await productService.createPayment();

      const options = {
        key: payment.key,
        amount: payment.amount,
        currency: "INR",
        name: "LUMEN",
        description: "Order Payment",
        order_id: payment.order_id,
        handler: async function (
          response
        ) {
          try {
            await productService.verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            toast.success("Payment Successful!");
            await fetchCart();
            setProcessing(false);
            navigate("/success");
          } 
          catch (error) {
            console.log(error);
            setProcessing(false);
            toast.error("Payment verification failed.");
          }
        },

        modal: {ondismiss: function () {
            setProcessing(false);
            toast.warning("Payment cancelled.");
          },
        },

        prefill: {name: `${form.firstName} ${form.lastName}`, email: form.email, contact: form.phone},
        theme: {color: "#000000"},
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } 
    catch (error) {
      console.log(error);
      setProcessing(false);
      toast.error("Unable to start payment.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Checkout | LUMEN</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Navbar />

      <div className="checkout-page">
        <div className="checkout-left">
          <h2>Billing Details</h2>

          <form className="checkout-form">
            <input
              type="text"
              name="firstName"
              maxLength={30}
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />

            <input
              type="text"
              name="lastName"
              maxLength={30}
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <input
              type="text"
              name="address"
              maxLength={150}
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />

            <input
              type="text"
              name="city"
              maxLength={30}
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />

            <input
              type="text"
              name="country"
              maxLength={30}
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </form>
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="summary-item" key={item.id}>
                  <span>
                    {item.product.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    $
                    {Number(
                      item.product.price
                    ) *
                      item.quantity}
                  </span>
                </div>
              ))}

              <hr />

              <div className="summary-total">
                <strong>Total</strong>
                <strong>${totalPrice}</strong>
              </div>

              <button
                className="place-order"
                disabled={processing}
                onClick={
                  handlePlaceOrder
                }
              >
                {processing
                  ? "Processing..."
                  : "Place Order"}
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;