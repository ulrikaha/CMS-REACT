import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductEdit from '../components/ProductEdit';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.log('Error fetching product', error);
    }
  };

  const handleEdit = () => {
    setShowInputs(true);
  };

  if (!product) {

    return <h1>Loading...</h1>;
  }

  return (
    <>
   <div className="container">
  <h1 className="text-center">Product Details</h1>
  <div className="card mb-4">
    <div className="row g-0">
      <div className="col-md-5">
        <img src={product.imgURL} className="img-fluid rounded-start" alt={product.name} />
      </div>

<div className="col-md-5">
<div className="card-body">
<p className="card-text"><span className="text-primary">Product ID:</span> <span className="text-dark">{product._id}</span></p>
<p className="card-text"><span className="text-primary">Product Name:</span> <span className="text-dark">{product.name}</span></p>
<p className="card-text"><span className="text-primary">Category:</span> <span className="text-dark">{product.category}</span></p>
<p className="card-text"><span className="text-primary">Description:</span> <span className="text-dark">{product.description}</span></p>
<p className="card-text"><span className="text-primary">Price:</span> <span className="text-dark">€ {product.price}</span></p>
<p className="card-text"><span className="text-primary">Created at:</span> <span className="text-dark">{new Date(product.createdAt).toLocaleString()}</span></p>
<p className="card-text"><span className="text-primary">Updated at:</span> <span className="text-dark">{new Date(product.updatedAt).toLocaleString()}</span></p>
    <button onClick={handleEdit} className="btn btn-primary mt-4">
          Edit Product
          </button>
         </div>
      </div>
    </div>
  </div>
</div>
 {showInputs && (
        <ProductEdit product={product} setShowInputs={setShowInputs} />
      )}
    </>
  );
};

export default ProductDetails;
