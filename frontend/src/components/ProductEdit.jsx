import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = ({ product }) => {
const navigate = useNavigate();
const { productId } = useParams();

const [success, setSuccess] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    imgURL: product.imgURL
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      //const response =//
       await axios.put(   
        `http://localhost:8080/api/products/${productId}`,
        editedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/admin'); 
      }, 1000);

      // Reset the form
       setEditedProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        imgURL: ''
      });

      //console.log(response);
      //console.log(productId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Edit Product</h3>
      <div className="form-control">
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Title:</label>
            <input 
            type="text" 
            name="name"
            id="name" 
            className="form-control"
            value={editedProduct.name} 
            onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              value={editedProduct.description}
              onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
            type="text"
            name="name"
            id="category"
            className='form-control'
            value={editedProduct.category}
            onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input 
            type="number" 
            id="price" 
            name="price"
            className="form-control"
            value={editedProduct.price} 
            onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="imgURL">Image URL:</label>
            <input 
            type="text" 
            id="imgURL" 
            name="imgURL"
            className="form-control"
            value={editedProduct.imgURL} 
            onChange={handleChange} 
            />
          </div>

         
          <button className="btn btn-primary mt-3">Save Changes</button>
        </form>

        {success && <p>Product updated successfully!</p>}
      </div>
    </>
  );
};

export default ProductEdit;
