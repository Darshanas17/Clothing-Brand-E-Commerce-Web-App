const Filters = ({ category, setCategory, search, setSearch }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="T-Shirts">T-Shirts</option>
        <option value="Jeans">Jeans</option>
        <option value="Hoodies">Hoodies</option>
        <option value="Jackets">Jackets</option>
      </select>
    </div>
  );
};

export default Filters;
