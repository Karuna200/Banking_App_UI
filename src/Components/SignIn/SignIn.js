import { useNavigate } from 'react-router-dom';
import '../Registration/Registration.css'



const SignIn = () => {
  const API_BASE_URL = 'http://localhost:8088';
 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const loggedInCustomer = await login(email, password);
      if (loggedInCustomer != null) {
        navigate('/dashboard');
      }else{
        navigate('/Registration')
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const loggedInCustomer = await response.json();
      console.log(loggedInCustomer);
      localStorage.setItem('jwtToken', loggedInCustomer.jwtToken);
      return loggedInCustomer;
    } else {
      alert("invalid email or password");
    }
  }

  return (
    <div>
     
    <div id="forms-contain">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
    </div>
  );
};

export default SignIn;

