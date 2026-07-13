import { NavLink, useNavigate } from "react-router-dom";
import {
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import profileIcon from "../assets/icons/profile.png";
import cartIcon from "../assets/icons/cart.png";

function Navbar() {
  const { cart, setShowCart } =
    useContext(CartContext);

  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate("/");
  };

  return (
    <header className="header">

      <button
        className={`menu-toggle ${
          showMenu ? "active" : ""
        }`}
        onClick={() =>
          setShowMenu(!showMenu)
        }
      >
        <span></span>
        <span></span>
      </button>

      <NavLink
        to="/"
        className="logo"
        onClick={() => {
          setShowMenu(false);
          setShowProfile(false);
        }}
      >
        LUMEN
      </NavLink>

      <nav
        className={`nav ${
          showMenu ? "active" : ""
        }`}
      >
        <NavLink
          to="/"
          onClick={() =>
            setShowMenu(false)
          }
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/collection"
          onClick={() =>
            setShowMenu(false)
          }
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Collections
        </NavLink>

        <NavLink
          to="/about"
          onClick={() =>
            setShowMenu(false)
          }
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          About
        </NavLink>
      </nav>

      {showMenu && (
        <div
          className="nav-overlay"
          onClick={() => setShowMenu(false)}
        ></div>
      )}

        <div className="actions">
          <div
            className="profile-menu"
            ref={menuRef}
          >
            <button
              className={`profile-btn ${showProfile ? "active" : ""}`}
              onClick={() => {
                setShowMenu(false);

                if (user) {
                  setShowProfile(!showProfile);
                } else {
                  navigate("/account");
                }
              }}
            >
              <img
                src={profileIcon}
                alt="Profile"
                className="profile-icon"
              />
            </button>

            {user && showProfile && (
              <div className="profile-dropdown">
                <NavLink
                  to="/orders"
                  onClick={() => setShowProfile(false)}
                >
                  My Orders
                </NavLink>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <span
            className="icon-cart"
            onClick={() => {
              setShowMenu(false);
              setShowProfile(false);
              setShowCart(true);
            }}
          >
            <img
              src={cartIcon}
              alt="Cart"
              className="cart-icon"
            />

            <span>{cart.length}</span>
          </span>
        </div>

    </header>
  );
}

export default Navbar;