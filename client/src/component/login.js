import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/users/login', userData);
      console.log("login successful:", res.data);

      // ✅ 1. خزن التوكن في localStorage
      localStorage.setItem('token', res.data.token || 'mock-token' );
      localStorage.setItem('role', res.data.role || 'user'); // خزن الدور إذا كان موجودًا

      alert("Login successful");

      // ✅ 2. وجّه المستخدم إلى لوحة التحكم
      navigate('/home', { replace: true });

    } catch (error) {
      console.error("login error:", error);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
        />
        <input type='submit' value='Login' />
      </form>
    </Box>
  );
}
