import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Login() {
  return (
   <>
   <Navbar />
   <LoginForm />
   <Footer />
   </>
  )
}

export default Login