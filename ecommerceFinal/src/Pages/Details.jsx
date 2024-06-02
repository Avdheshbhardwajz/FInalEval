import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products`
      )
      .then((res) => {
        const product = res.data.data.find((item) => item.id === parseInt(id));
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-5xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-5xl">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-5xl">Product not found</div>;
  }

  return (
    <div className="p-4 bg-slate-400 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-4 border-2 border-black">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="mb-2">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="mb-2">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> ${product.price}
        </p>
      </div>
    </div>
  );
};

export default Details;
