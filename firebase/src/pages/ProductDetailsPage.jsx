import React, { useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailsPage;
