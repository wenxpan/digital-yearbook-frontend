import { useState, useReducer, useEffect } from "react"
import { Routes, Route, useParams } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/NavBar"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Classes from "./pages/Classes"
import Yearbook from "./pages/Yearbook"
import StudentProfile from "./pages/StudentProfile"
import Account from "./pages/Account"
import UpdateProfile from "./pages/UpdateProfile"
import SignUp from "./pages/SignUp"
import ManageStudents from "./pages/ManageStudents"
import AddStudents from "./pages/AddStudents"
import ManageClasses from "./pages/ManageClasses"
import AddClass from "./pages/AddClass"
import BackgroundImage from "./components/BackgroundImage"
import RedirectMessage from "./components/RedirectMessage"

import UserContext from "./contexts/UserContext"
import SchoolContext from "./contexts/SchoolContext"
import schoolReducer from "./utils/schoolReducer"
import sampleSchool from "./utils/sampleSchool"
import { getHelper } from "./utils/apiHelper"
import LoggedInRoute from "./pages/LoggedInRoute"
import AdminRoute from "./pages/AdminRoute"
import RedirectRoute from "./pages/RedirectRoute"

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, isAdmin: false })

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  // state for whole school - including years, classes and students
  const [school, dispatch] = useReducer(schoolReducer, {})

  useEffect(() => {
    async function setSchoolData() {
      if (user.isLoggedIn) {
        const token = user.token
        const students = await getHelper("/students", token)
        const classes = await getHelper("/classes", token)
        const years = await getHelper("/years", token)
        dispatch({ type: "set_school", school: { students, classes, years } })
      }
    }
    setSchoolData()
  }, [user])

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
              <Route
                index
                element={
                  <RedirectRoute>
                    <Landing />
                  </RedirectRoute>
                }
              />
              <Route path="/login">
                <Route
                  index
                  element={
                    <RedirectRoute>
                      <Login />
                    </RedirectRoute>
                  }
                />
              </Route>
              <Route
                path="/signup"
                element={
                  <RedirectRoute>
                    <SignUp />
                  </RedirectRoute>
                }
              />
            </Route>

            {/* yearbooks pages */}
            <Route path="/classes">
              <Route
                index
                element={
                  <LoggedInRoute>
                    <Classes />
                  </LoggedInRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <LoggedInRoute>
                    <YearbookWrapper />
                  </LoggedInRoute>
                }
              />
            </Route>

            {/* student pages */}
            <Route path="/students">
              <Route
                path=":id"
                element={
                  <LoggedInRoute>
                    <StudentProfileWrapper />
                  </LoggedInRoute>
                }
              />
              {/* update profile page for both student and admin, with different props */}
              <Route
                path=":id/edit"
                element={
                  <LoggedInRoute>
                    <UpdateProfileWrapper />
                  </LoggedInRoute>
                }
              />
            </Route>

            {/* account pages */}
            <Route path="/account">
              <Route
                index
                element={
                  <LoggedInRoute>
                    <Account />
                  </LoggedInRoute>
                }
              />
              <Route
                path="classes"
                element={
                  <AdminRoute>
                    <ManageClasses />
                  </AdminRoute>
                }
              />
              <Route
                path="classes/new"
                element={
                  <AdminRoute>
                    <AddClass />
                  </AdminRoute>
                }
              />
              <Route
                path="students"
                element={
                  <AdminRoute>
                    <ManageStudents />
                  </AdminRoute>
                }
              />
              <Route
                path="students/new"
                element={
                  <AdminRoute>
                    <AddStudents />
                  </AdminRoute>
                }
              />
            </Route>
            <Route path="*" element={<RedirectMessage type={"NOT FOUND"} />} />
          </Routes>
        </SchoolContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
