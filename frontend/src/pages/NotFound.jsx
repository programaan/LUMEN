import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | LUMEN</title>
        <meta name="description" content="Page not found."/>
      </Helmet>


      <div className="notfound-page">
        <div className="notfound-card">
          <h1>404</h1>

          <h2>Oops! Page Not Found</h2>

          <p>
            The page you are looking for doesn't exist or has been moved.
          </p>

          <Link to="/" className="notfound-btn">
            Back Home
          </Link>
        </div>
      </div>

    </>
  );
}

export default NotFound;