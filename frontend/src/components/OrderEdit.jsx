import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderEdit = ({ order }) => {
const navigate = useNavigate();
const { orderId } = useParams();

const [success, setSuccess] = useState(false);

  const [editedOrder, setEditedOrder] = useState({
    status: order.status,
    });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      //const response =//
       await axios.put(   
        `http://localhost:8080/api/orders/${orderId}`,
        editedOrder,
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
       setEditedOrder({
        status: '',
      });

      //console.log(response);
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Edit Status of order</h3>
      <div className="form-control">
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input 
            type="text" 
            name="status"
            id="status" 
            className="form-control"
            value={editedOrder.status} 
            onChange={handleChange} 
            />
          </div>
          <button className="btn btn-primary mt-3">Save Changes</button>
        </form>

        {success && <p>Order status updated successfully!</p>}
      </div>
    </>
  );
};

export default OrderEdit;
