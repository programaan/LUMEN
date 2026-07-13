import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    showCart,
    setShowCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.product.price) *
        item.quantity,
    0
  );

  return (
    <>
      {showCart && (
        <div
          className="overlay"
          onClick={() =>
            setShowCart(false)
          }
        ></div>
      )}

      <div
        className={`cartTab ${
          showCart ? "active" : ""
        }`}
      >
        <h1>Shopping Cart</h1>

        <div className="listCart">
          {cart.length === 0 ? (
            <p className="emptyCart">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                className="item"
                key={item.id}
              >
                <div className="img">
                  <img
                    src={item.product.image || ""}
                    alt={item.product.name}
                  />
                </div>

                <div>
                  <div className="name">
                    {item.product.name}
                  </div>

                  <div className="totalPrice">
                    $
                    {(
                      Number(
                        item.product.price
                      ) * item.quantity
                    ).toFixed(2)}
                  </div>
                </div>

                <div className="quantity">
                  <span
                    className="minus"
                    onClick={() =>
                      decreaseQuantity(
                        item.product.id
                      )
                    }
                  >
                    -
                  </span>

                  <span>
                    {item.quantity}
                  </span>

                  <span
                    className="plus"
                    onClick={() =>
                      increaseQuantity(
                        item.product.id
                      )
                    }
                  >
                    +
                  </span>
                </div>

                <button
                  className="remove"
                  onClick={() =>
                    removeFromCart(
                      item.product.id
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cartTotal">
          <h3>
            Total: $
            {totalPrice.toFixed(2)}
          </h3>
        </div>

        <div className="btn">
          <button
            className="close"
            onClick={() =>
              setShowCart(false)
            }
          >
            CLOSE
          </button>

          <button
            className="checkout"
            onClick={() => {
              setShowCart(false);
              navigate("/checkout");
            }}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;