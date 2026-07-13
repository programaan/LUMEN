import { NavLink } from "react-router-dom";

function CollectionHeader() {
  return (
    <div className="container">
      <div className="breadcrumb">
        <NavLink to="/">Shop</NavLink>
        <span>/</span>
        <span className="current">Collections</span>
      </div>

      <h1 className="title">Collections</h1>
    </div>
  );
}

export default CollectionHeader;