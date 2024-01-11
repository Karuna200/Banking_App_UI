import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css'; 
const API_BASE_URL = 'http://localhost:8088';
const Registration = () => {
  

 async function addCustomer(customerData) {
  const response = await fetch(`${API_BASE_URL}/auth/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to add customer');
  }
}
const handleSubmit = async (event) => {
  event.preventDefault();

  const password = event.target.password.value;
  const confirmPassword = event.target.confirm_password.value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  const customerData = {
    name: event.target.user_name.value,
    email: event.target.email.value,
    aadhar: event.target.aadhar.value,
    password: password,
  };

  try {
    const addedCustomer = await addCustomer(customerData);
    alert(`Successfully registered ${addedCustomer.name || addedCustomer.email}`);
    redirectToSignIn();
  } catch (error) {
    console.error('Failed to add customer:', error);
  }
};


  const navigate = useNavigate()
  const redirectToSignIn = () => {
    
    navigate('/SignIn')
  };

  return (
    <div>
    
    <div id="forms-contain">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register Here</h2>
        <label htmlFor="user_name">Name:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
        />
        <label htmlFor="aadhar">Aadhar:</label>
        <input
          type="aadhar"
          id="aadhar"
          name="aadhar"
          pattern="[0-9]{12}"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
        />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="confirm_password"
          id="confirm_password"
          name="confirm_password"
          required
        />
        <button type="submit">Register</button>
        <p>
          Already Have an Account?{' '}
          <Link to="/SignIn" id="link">
            Sign In
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Registration;
