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

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        navigate("/not-found"); // Redirect if ID is missing

        return;
      }

      
      setLoading(true);
      try {
        const productRef = doc(db, "products", id); // Get document reference
        const productSnap = await getDoc(productRef); // Fetch document

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
