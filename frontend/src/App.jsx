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
          <Route path="/addProduct" element={<AddProduct/>} /> {/* Lagt till detta */}
          <Route path="/productDetails/:productId" element={<ProductDetails/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

