import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import productService from "../services/productService";
import Loader from "./Loader";

function Latest() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const data =
          await productService.getLatestProducts();

        setProducts(data);
      } 
      catch (error) {
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="latest">
      <h2>Latest Products</h2>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (<ProductCard key={product.id} product={product}/>))}
      </div>
    </section>
  );
}

export default Latest;