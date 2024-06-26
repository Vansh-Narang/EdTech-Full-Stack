import './App.css';
import Error from "./Pages/Error"
import Home from "./Pages/Home"
import EditCourse from "./components/core/Dashboard/EditCourse";
import Navbar from "./components/Common/Navbar"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./Pages/Login"
import Settings from "./components/core/Settings/settings"
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
import Catalog from './Pages/Catalog';
import ViewCourse from './Pages/ViewCourse';
import CourseDetails from './Pages/CourseDetails';
function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
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
        <Route path='about' element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

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
        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {/* {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          } */}

        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
