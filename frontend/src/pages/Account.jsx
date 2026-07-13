import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

function Account() {
  const { login, register } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [passwordStrength, setPasswordStrength] =
  useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.warning("Please fill all fields.");
      return;
    }

    try {
      await login(loginData);

      toast.success("Welcome back!");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "Invalid email or password."
      );
    }
  }

  function checkPasswordStrength(password) {
  if (!password) {
    setPasswordStrength("");
    return;
  }

  if (password.length < 8) {
    setPasswordStrength("Too Short");
    return;
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial =
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let score = 0;

  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;
  if (password.length >= 12) score++;

  if (score <= 2) {
    setPasswordStrength("Weak");
  } else if (score <= 4) {
    setPasswordStrength("Medium");
  } else {
    setPasswordStrength("Strong");
  }
}

  async function handleRegister(e) {
    e.preventDefault();

    if (
      !registerData.full_name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (
      registerData.password !==
      registerData.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register({
        full_name: registerData.full_name,
        email: registerData.email,
        password: registerData.password,
      });

      toast.success(
        "Account created. Please verify your email."
      );

      setRegisterData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setPasswordStrength("");

      setIsLogin(true);
    } catch (err) {
      toast.error(
        err.response?.data?.email?.[0] ||
          err.response?.data?.detail ||
          "Registration failed."
      );
    }
  }

  return (
    <section className="account-page">

      <Helmet>
        <title>Account | LUMEN</title>

        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="account-card">
        {isLogin ? (
          <>
            <h2>Welcome Back</h2>

            <form
              className="account-form"
              onSubmit={handleLogin}
            >
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
              />

              <button type="submit">
                Sign In
              </button>
            </form>

            <Link
              to="/forgot-password"
              className="account-link"
            >
              Forgot Password?
            </Link>

            <div className="account-divider"></div>

            <h3>New to LUMEN?</h3>

            <p className="account-text">
              Create an account to save your
              favorites and checkout faster.
            </p>

            <button
              className="secondary-btn"
              onClick={() => {
                setIsLogin(false);

                setRegisterData({
                  full_name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });

                setPasswordStrength("");
              }}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h2>Create Account</h2>

            <form
              className="account-form"
              onSubmit={handleRegister}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={registerData.full_name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    full_name:
                      e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  });

                  checkPasswordStrength(
                    e.target.value
                  );
                }}
              />

              {passwordStrength && (
                <p
                  className={`password-strength ${passwordStrength.toLowerCase().replace(
                    " ",
                    "-"
                  )}`}
                >
                  Strength: {passwordStrength}
                </p>
              )}

              <input
                type="password"
                placeholder="Confirm Password"
                value={
                  registerData.confirmPassword
                }
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword:
                      e.target.value,
                  })
                }
              />

              <button type="submit">
                Create Account
              </button>
            </form>

            <div className="account-divider"></div>

            <p className="account-text">
              Already have an account?
            </p>

            <button
              className="secondary-btn"
              onClick={() => {
                setIsLogin(true);

                setLoginData({
                  email: "",
                  password: "",
                });

                setPasswordStrength("");
              }}
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Account;