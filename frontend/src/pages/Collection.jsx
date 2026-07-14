import { useState } from "react";

import Navbar from "../components/Navbar";
import CollectionHeader from "../components/CollectionHeader";
import FilterBar from "../components/FilterBar";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

import { Helmet } from "react-helmet-async";

function Collection() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Helmet>
        <title>Collection | LUMEN</title>
        <meta name="description" content="Browse the latest clothing collection from LUMEN."/>
      </Helmet>

      <Navbar />

      <CollectionHeader />

      <FilterBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="page">

        <aside className={`sidebar-wrapper ${showFilters ? "active" : ""}`}>
          <Sidebar
            category={category}
            setCategory={setCategory}
          />
        </aside>

        {showFilters && (
          <div className="sidebar-overlay" onClick={() => setShowFilters(false)}>            
          </div>
        )}

        <ProductGrid
          search={search}
          sort={sort}
          category={category}
        />

      </div>

      <Cart />

      <Footer />
    </>
  );
}

export default Collection;