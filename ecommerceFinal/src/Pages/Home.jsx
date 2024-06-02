import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=price&order=${sortOrder}`;

    if (categoryFilter) {
      url += `&filter=${categoryFilter}`;
    }

    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [sortOrder, categoryFilter]);

  if (loading) {
    return <div className="text-5xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-5xl">Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-slate-400 min-h-screen">
      <div className="max-w-lg mx-auto mb-4">
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="sortOrder" className="mr-2">
              Sort by Price:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border-2 border-black p-1"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label htmlFor="categoryFilter" className="mr-2">
              Filter by Category:
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border-2 border-black p-1"
            >
              <option value="">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="homedecor">Home Decor</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((card) => (
          <div
            key={card.id}
            className="w-[300px] h-[400px] border-2 border-black p-4 bg-white"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[200px] object-cover mb-2"
            />
            <h5 className="font-bold mb-1">Title: {card.title}</h5>
            <p className="mb-1">Brand: {card.brand}</p>
            <p className="mb-1">Category: {card.category}</p>
            <p>Price: ${card.price}</p>
            <Link className="border-2 border-black p-1" to={`/home/${card.id}`}>
              More Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
