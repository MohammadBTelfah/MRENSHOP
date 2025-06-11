
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

 export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        address: '',
        phone: '',
    });


    return (
<Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
    <Typography variant="h4" gutterBottom>
        Register
    </Typography>
    <form onSubmit={async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/users/register', userData, )
            console.log("Registration successful:", res.data);
            alert("Registration successful! Please log in.");
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration error:", error);
        }
    }}>
        <input type ='text' placeholder='Username' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })}  />
        <input type='email' placeholder='Email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type='password'  placeholder='Password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}  />
        <input type='text'  placeholder='Full Name' value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
        <input type='text'  placeholder='Address' value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
        <input type='text'  placeholder='Phone' value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })}  />
        <input type='submit' value='Register' />
    </form>
</Box>
    );
}