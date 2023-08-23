import { useState, useReducer } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/NavBar"
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

import UserContext from "./contexts/UserContext"
import SchoolContext from "./contexts/SchoolContext"
import schoolReducer from "./utils/schoolReducer"
import sampleSchool from "./utils/sampleSchool"

function App() {
  // placeholder user state
  const [user, setUser] = useState({
    isLoggedIn: true,
    isAdmin: true,
    name: "John",
    email: "john.smith@gmail.com",
    _id: "64e56dc04aa128eeda489277"
  })

  const [school, dispatch] = useReducer(schoolReducer, sampleSchool)

  function YearbookWrapper() {
    const { id } = useParams()
    // find class and return id
    const yearbook = school.classes.find((c) => c._id === id)
    return <Yearbook yearbook={yearbook} />
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SchoolContext.Provider value={{ school, dispatch }}>
          <Navbar />
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
              <Route path=":id" element={<YearbookWrapper />} />
            </Route>
            <Route path="/students">
              <Route path=":id" element={<StudentProfile />} />
              {/* update profile page for both student and admin, with different props */}
              <Route path=":id/edit" element={<UpdateProfile />} />
            </Route>
            <Route path="/account">
              <Route index element={<Account />} />
              <Route path="invite" element={<AddStudents />} />
              <Route path="classes" element={<ManageClasses />} />
              <Route path="students" element={<ManageStudents />} />
            </Route>
            {/* <Route path="/message" element={<RedirectMessage />} /> */}
          </Routes>
        </SchoolContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
