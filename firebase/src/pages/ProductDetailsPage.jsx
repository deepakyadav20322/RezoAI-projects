import React, { useEffect, useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import {  useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase"; // Firebase config
import { doc, getDoc } from "firebase/firestore";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 


  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
