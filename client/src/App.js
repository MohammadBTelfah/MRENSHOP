
import './App.css';
import DashboardLayoutSlots from './component/dashboard';
import Register from './component/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<DashboardLayoutSlots />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
