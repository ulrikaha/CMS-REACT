import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProductAdd = ({setNewProduct}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const [success, setSuccess] = useState(false);

  const [newProduct, setNewProductState] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    imgURL: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProductState((prevProd) => ({
      ...prevProd,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', newProduct, {
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
      setNewProductState({
        name: '',
        category: '',
        description: '',
        price: '',
        imgURL: ''
      });

      setNewProduct(newProduct);

    } catch (error) {
      console.error(error);
    }
  };

  
    
   
    return (
    <div className="form-control">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
             name="name"
             id="name"
            className="form-control"
            value={newProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={newProduct.category}
            onChange={handleChange}
          />
        </div>
        <div className= "form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={newProduct.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={newProduct.price}
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
            value={newProduct.imgURL}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <button className= "btn btn-primary" type="submit">Submit</button>
      </form>

      {success && <p>Product added successfully!</p>}
    </div>
  );
};

export default ProductAdd;
