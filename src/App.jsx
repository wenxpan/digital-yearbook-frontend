import { useState, useReducer, useEffect } from "react"
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
import ManageStudents from "./pages/ManageStudents"
import AddStudents from "./pages/AddStudents"
import ManageClasses from "./pages/ManageClasses"
import AddClass from "./pages/AddClass"
import BackgroundImage from "./components/BackgroundImage"

import UserContext from "./contexts/UserContext"
import SchoolContext from "./contexts/SchoolContext"
import schoolReducer from "./utils/schoolReducer"
import sampleSchool from "./utils/sampleSchool"

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, isAdmin: false })

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (loggedInUser && token) {
      foundUser = JSON.parse(loggedInUser)
      setUser({ foundUser })
    }
  }, [user])

  // state for whole school - including years, classes and students
  const [school, dispatch] = useReducer(schoolReducer, sampleSchool)

  //TODO: make 3 wrapper functions dry
  function YearbookWrapper() {
    const { id } = useParams()
    // find class by class id
    const yearbook = school.classes.find((c) => c._id === id)
    return <Yearbook yearbook={yearbook} />
  }

  function StudentProfileWrapper() {
    const { id } = useParams()
    // find student by student id
    const student = school.students.find((s) => s._id === id)
    return <StudentProfile student={student} />
  }

  function UpdateProfileWrapper() {
    const { id } = useParams()
    // find student by student id
    const student = school.students.find((s) => s._id === id)
    return <UpdateProfile student={student} />
  }

  return (
    <>
      {/* passed in user and school as global states */}
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
            {/* yearbooks pages */}
            <Route path="/classes">
              <Route index element={<Classes />} />
              <Route path=":id" element={<YearbookWrapper />} />
            </Route>
            {/* student pages */}
            <Route path="/students">
              <Route path=":id" element={<StudentProfileWrapper />} />
              {/* update profile page for both student and admin, with different props */}
              <Route path=":id/edit" element={<UpdateProfileWrapper />} />
            </Route>
            {/* account pages */}
            <Route path="/account">
              <Route index element={<Account />} />
              <Route path="classes" element={<ManageClasses />} />
              <Route path="classes/new" element={<AddClass />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="students/new" element={<AddStudents />} />
            </Route>
            {/* <Route path="/message" element={<RedirectMessage />} /> */}
          </Routes>
        </SchoolContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
