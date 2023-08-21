import { Routes, Route } from "react-router-dom"
import Navbar from "./components/NavBar"
// import "./css/App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Classes from "./pages/Classes"
import Yearbook from "./pages/Yearbook"
import StudentProfile from "./pages/StudentProfile"
import ResetPassword from "./pages/ResetPassword"
import Account from "./pages/Account"
import UpdateProfile from "./pages/UpdateProfile"
import SignUp from "./pages/SignUp"
import AddStudents from "./pages/AddStudents"
import ManageClasses from "./pages/ManageClasses"
import ManageStudents from "./pages/ManageStudents"
import BackgroundImage from "./components/BackgroundImage"
import { useState } from "react"
import RedirectMessage from "./components/RedirectMessage"

function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    isAdmin: false
  })

  return (
    <>
      <Navbar isLoggedIn={userState.isLoggedIn} isAdmin={userState.isAdmin} />
      <Routes>
        {/* landing, log in and sign up pages; they share the same background image, thus grouped together  */}
        <Route path="/" element={<BackgroundImage />}>
          <Route index element={<Landing />} />
          <Route path="/login">
            <Route index element={<Login />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/classes">
          <Route index element={<Classes />} />
          <Route path=":id" element={<Yearbook />} />
        </Route>
        <Route path="/students">
          <Route path=":id" element={<StudentProfile />} />
          {/* update profile page for both student and admin, with different props */}
          <Route path=":id/edit" element={<UpdateProfile />} />
        </Route>
        {/* student account */}
        <Route path="/account" element={<Account />} />
        {/* admin account */}
        <Route path="/admin">
          <Route index element={<Account />} />
          <Route path="invite" element={<AddStudents />} />
          <Route path="classes" element={<ManageClasses />} />
          <Route path="students" element={<ManageStudents />} />
        </Route>
        {/* <Route path="/message" element={<RedirectMessage />} /> */}
      </Routes>
    </>
  )
}

export default App
