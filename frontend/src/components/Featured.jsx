import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import productService from "../services/productService";
import Loader from "./Loader";

function Featured() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await productService.getFeaturedProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="featured">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Featured;