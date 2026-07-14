import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CollectionCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="item">
      <Link to={`/details/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <h3>
        <Link to={`/details/${product.slug}`}>
          {product.name}
        </Link>
      </h3>

      <div className="price">
        ${product.price}
      </div>

      <button className="addCart" onClick={() => addToCart(product.id)}>
        Add To Cart
      </button>
    </div>
  );
}

export default CollectionCard;