import './App.css';
import Home from "./Pages/Home"
import Navbar from "./components/Common/Navbar"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import OpenRoute from "./components/core/Auth/OpenRoute"
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='login' element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path='signup' element={<OpenRoute>
          <Signup />
        </OpenRoute>} />
        <Route path='forgot-password' element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
