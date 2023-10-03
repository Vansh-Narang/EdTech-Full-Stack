import './App.css';
import Home from "./Pages/Home"
import Navbar from "./components/Common/Navbar"
import { Route, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from './Pages/Signup';
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
