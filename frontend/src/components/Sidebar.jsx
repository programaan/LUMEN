function Sidebar({
  category,
  setCategory,
}) {
  const categories = [
    {
      label: "All Products",
      value: "all",
    },
    {
      label: "Men",
      value: "men",
    },
    {
      label: "Women",
      value: "women",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="filter-group">
        <p className="filter-title">
          Categories
        </p>

        <ul>
          {categories.map((item) => (
            <li
              key={item.value}
              className={
                category === item.value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCategory(item.value)
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;