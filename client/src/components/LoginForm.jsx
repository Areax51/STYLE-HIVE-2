import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', user, {
        headers: { 'Content-Type': 'application/json' }
      });

      localStorage.setItem('token', res.data.token);
      setMessage('✅ Logged in successfully');
      // Redirect or navigate to another page if needed
    } catch (err) {
      setMessage('❌ Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {message && <p className="text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
