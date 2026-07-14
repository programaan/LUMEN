function FilterBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="top-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="sort-box">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="a-z">Name: A-Z</option>
          <option value="z-a">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;