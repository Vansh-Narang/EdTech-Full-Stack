import './App.css';
import Error from "./Pages/Error"
import Home from "./Pages/Home"
import Navbar from "./components/Common/Navbar"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./Pages/Login"
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import OpenRoute from "./components/core/Auth/OpenRoute"
import UpdatePassword from './Pages/UpdatePassword';
import VerfiyEmail from './Pages/VerfiyEmail';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import About from './Pages/About';
import Contact from "./Pages/Contact";
import Dashboard from './Pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import Cart from "./components/core/Dashboard/Cart/index"
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import AddCourse from './components/core/Dashboard/AddCourse';
function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile)
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
        <Route path='update-password/:id' element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path='verify-email' element={
          <OpenRoute>
            <VerfiyEmail />
          </OpenRoute>
        } />
        <Route path='about' element={
          <OpenRoute>
            <About />
          </OpenRoute>
        } />
        <Route path="contact" element={<Contact />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          {/* <Route path="dashboard/setting" element={<MyProfile />} /> */}

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )
          }


          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
              </>
            )
          }
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
