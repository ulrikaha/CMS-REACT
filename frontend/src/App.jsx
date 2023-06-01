import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import OrderList from './pages/OrderList';
import OrderDetails from './pages/OrderDetails';



const App = () => {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/admin" element={<Admin user={user}/>} />
          <Route path="/addProduct" element={<AddProduct/>} /> 
          <Route path="/orderList" element={<OrderList/>} />
          <Route path="/productDetails/:productId" element={<ProductDetails/>} />
          <Route path="/orderDetails/:orderId" element={<OrderDetails/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

