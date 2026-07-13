import { useEffect, useState } from "react";

import CollectionCard from "./CollectionCard";
import productService from "../services/productService";
import Loader from "./Loader";

function ProductGrid({
  search,
  sort,
  category,
}) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await productService.getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let filteredProducts = [...products];

  if (category !== "all") {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.category
            .toLowerCase() ===
          category.toLowerCase()
      );
  }

  filteredProducts =
    filteredProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  switch (sort) {
    case "low-high":
      filteredProducts.sort(
        (a, b) => a.price - b.price
      );
      break;

    case "high-low":
      filteredProducts.sort(
        (a, b) => b.price - a.price
      );
      break;

    case "a-z":
      filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "z-a":
      filteredProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;

    default:
      break;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product-section">
      <p className="product-count">
        Showing {filteredProducts.length}{" "}
        {filteredProducts.length === 1
          ? "Product"
          : "Products"}
      </p>

      <div className="listProduct">
        {filteredProducts.length ===
        0 ? (
          <h3 className="no-products">
            No products found.
          </h3>
        ) : (
          filteredProducts.map(
            (product) => (
              <CollectionCard
                key={product.id}
                product={product}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default ProductGrid;