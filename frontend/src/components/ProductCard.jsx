import { Link } from "react-router-dom";

function ProductCard({ product }) {

  return (
    <div className="product-card">
      <Link to={`/details/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <h3>
        <Link to={`/details/${product.slug}`}>
          {product.name}
        </Link>
      </h3>

      <p className="price">${product.price}</p>
      
      
    </div>
  );
}

export default ProductCard;