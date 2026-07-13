import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";

import productService from "../services/productService";

import Loader from "../components/Loader";
import NotFound from "./NotFound";

import { Helmet } from "react-helmet-async";

function Details() {
  const { slug } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] =
  useState([]);

  const [loading, setLoading] =
    useState(true);

  const [mainImage, setMainImage] =
    useState("");

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [selectedColor, setSelectedColor] =
    useState("black");

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const data =
            await productService.getProduct(slug);

          setProduct(data);

          setMainImage(data.image);

          const products =
            await productService.getProducts();

          setRelatedProducts(
            products.filter(
              (item) =>
                item.slug !== slug &&
                item.category === data.category
            )
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();

      window.scrollTo(0, 0);
    }, [slug]);

    const thumbnails = [
      product?.image,
      product?.thumbnail1,
      product?.thumbnail2,
      product?.thumbnail3,
      product?.thumbnail4,
    ].filter(Boolean);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | LUMEN</title>

        <meta
          name="description"
          content={product.description.slice(0, 150)}
        />
      </Helmet>

      <Navbar />

      <div className="lmn-product-wrap">
        <div className="lmn-product-container">
          <div className="lmn-gallery">

            <img
              src={mainImage}
              alt={product.name}
              className="lmn-main-img"
            />

            <div className="lmn-thumbnails">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name}-${index}`}
                  className={`lmn-thumb ${
                    mainImage === img ? "active" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

          </div>

          <div className="lmn-info">
            <h4 className="lmn-label">
              DESCRIPTION
            </h4>

            <h1 className="lmn-title">
              {product.name}
            </h1>

            <p className="lmn-price">
              ${product.price}
            </p>

            {product.stock === 0 ? (
              <p className="stock-out">
                Out of Stock
              </p>
            ) : product.stock <= 5 ? (
              <p className="stock-low">
                Only {product.stock} left
              </p>
            ) : (
              <p className="stock-in">
                In Stock
              </p>
            )}

            <p className="lmn-desc">
              {product.description}
            </p>

            <div className="lmn-size-box">
              <p>Size</p>

              <select
                className="lmn-select"
                value={selectedSize}
                onChange={(e) =>
                  setSelectedSize(
                    e.target.value
                  )
                }
              >
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            <div className="lmn-color-box">
              <p>Color</p>

              <div className="lmn-colors">
                {[
                  "black",
                  "beige",
                  "gray",
                ].map((color) => (
                  <span
                    key={color}
                    className={`lmn-color ${
                      selectedColor === color
                        ? "active"
                        : ""
                    }`}
                    data-color={color}
                    onClick={() =>
                      setSelectedColor(
                        color
                      )
                    }
                  ></span>
                ))}
              </div>
            </div>

            <button
              className="lmn-btn"
              disabled={product.stock === 0}
              onClick={() => addToCart(product.id)}
            >
              {product.stock === 0
                ? "Out of Stock"
                : "Add To Bag"}
            </button>

            <p className="lmn-shipping">
              Free shipping on orders over
              $500
            </p>
          </div>
        </div>
      </div>

      <div className="lmn-related">
        <h2 className="lmn-related-title">
          You may also like
        </h2>

        <div className="lmn-related-grid">
          {relatedProducts
            .slice(0, 3)
            .map((item) => (
              <Link
                to={`/details/${item.slug}`}
                className="lmn-card"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="lmn-card-img"
                />

                <p className="lmn-card-name">
                  {item.name}
                </p>

                <p className="lmn-card-price">
                  ${item.price}
                </p>
              </Link>
            ))}
        </div>
      </div>

      <Cart />

      <Footer />
    </>
  );
}

export default Details;