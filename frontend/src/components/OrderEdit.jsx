import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderEdit = ({ order }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [success, setSuccess] = useState(false);

  const [editedOrder, setEditedOrder] = useState({
    pending: order.pending,
  });

  const handleChange = (e) => {
    const { checked } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      pending: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.patch(
        `http://localhost:8080/api/orders/${orderId}`,
        { pending: editedOrder.pending },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/orderList');
      }, 1000);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h5>Edit Status of order</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="pending"
            id="pending"
            checked={editedOrder.pending}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="pending">
          {editedOrder.pending ? 'Delivered' : 'Pending'}
          </label>
        </div>
        <button className="btn btn-primary mt-3">Save Changes</button>
      </form>
      {success && <p>Order status updated successfully!</p>}
</div>
  );
};

export default OrderEdit;
