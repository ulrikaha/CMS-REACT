import React, { useState } from 'react';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            setErrorMessage('Please enter your email.');
            return;
          }
          if (password === '') {
            setErrorMessage('Please enter your password.');
            return;
          }
          // Perform login logic here
          console.log('Email:', email);
          console.log('Password:', password);
          // Reset the form
          setEmail('');
          setPassword('');
          setErrorMessage('');
        };
      
        return (
            <div className="card">
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        );
      };  
      export default LoginForm;
