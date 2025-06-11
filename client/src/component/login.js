
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


    return (
<Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
    <Typography variant="h4" gutterBottom>
        Login 
    </Typography>
    <form onSubmit={async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/users/login', userData, )
            console.log("login successful:", res.data);
            alert(" login successful");
            navigate('/home'); // Redirect to login page after successful registration
        } catch (error) {
            console.error("login  error:", error);
        }
    }}>
        <input type='email' placeholder='Email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type='password'  placeholder='Password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}  />
        <input type='submit' value='login' />
    </form>
</Box>
    );
}