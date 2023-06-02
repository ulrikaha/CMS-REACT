import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderEdit from '../components/OrderEdit';

const OrderDetails = () => {
 const token = localStorage.getItem('token');
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}` , {
      headers: {
        Authorization: `Bearer ${token}`,
        },
        });
      setOrder(response.data);
    } catch (error) {
      console.log('Error fetching order by id', error);
    }
  };

  const handleEdit = () => {
    setShowInputs(true);
  };

  if (!order) {

    return <h1>Loading...</h1>;
  }

  return (
    <>
<div className="container">
<h1 className="text-center">Order Details</h1>
<div className="col-md-5">
<div className="card-body">
<p className="card-text"><span className="text-primary">Order ID:</span> <span className="text-dark">{order._id}</span></p>
<p className="card-text"><span className="text-primary">User ID:</span> <span className="text-dark">{order.user}</span></p>
<p className="card-text"><span className="text-primary">Created at:</span> <span className="text-dark">{new Date(order.createdAt).toLocaleString()}</span></p>
<p className="card-text"><span className="text-primary">Updated at:</span> <span className="text-dark">{new Date(order.updatedAt).toLocaleString()}</span></p>
<p className="card-text"><span className="text-primary">Total Price:</span> <span className="text-dark">€ {order.totalPrice}</span></p>
<p className="card-text"><span className="text-primary">Status:</span> <span className="text-dark">{order.pending ? "Pending" : "Delivered"}</span></p>
{order.orderLines &&
          order.orderLines.map((orderLine) => (
            <div className="card-text" key={orderLine._id} >
            </div>
          ))}
    <button onClick={handleEdit} className="btn btn-primary mt-4">
          Edit Status
          </button>
         </div>
      </div>
    </div>
{showInputs && (
        <OrderEdit order={order} setShowInputs={setShowInputs} /> 
      )}
    </>
  );
};

export default OrderDetails;