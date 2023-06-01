import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData); 
      console.log(response);
      
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setUser(formData.email); 

        if (state) {
          navigate(state.from);
        } else {
          navigate('/admin');
        }
      } else {
        
        console.log('Login failed');
      }
    } catch (error) {
     
      console.log('Something is wrong', error);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
    <div className="form-control mb-5">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default Login;


