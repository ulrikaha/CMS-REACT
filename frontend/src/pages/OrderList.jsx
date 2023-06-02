import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';



const OrderList = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


    
  useEffect(() => {
    axios.get("http://localhost:8080/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
        setOrders(res.data);
    }).catch((error) => {
        console.error("Error retrieving orders:", error);
    });
  }, []);
    


  const handleEdit = (orderId) => {
    //Navigate to the orders details page with the selected orders's ID
    navigate(`/orderDetails/${orderId}`);
  };

  






  return (
    <div>
    <h2 className='text-center'>Order List</h2>
    <div className="list-group">
      {orders &&
        orders.map((order) => (
          <div className="list-group-item" key={order._id}>
            <p className="card-text"><span className="text-primary">Order ID:</span> <span className="text-dark">{order._id}</span></p>
            <button onClick={() => handleEdit(order._id)} className="btn btn-primary me-2">
                  Order Details
                </button>
              </div>
            ))}
            </div>
            </div>
   
   
);

};


export default OrderList;