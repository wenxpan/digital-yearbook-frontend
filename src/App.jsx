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

import LoggedInRoute from "./pages/LoggedInRoute"
import AdminRoute from "./pages/AdminRoute"
import RedirectRoute from "./pages/RedirectRoute"

import UserContext from "./contexts/UserContext"
import SchoolContext from "./contexts/SchoolContext"
import schoolReducer from "./utils/schoolReducer"
import { getHelper } from "./utils/apiHelper"

function App() {
  // set state for user; loaded means not yet searched for existing user in storage
  const [user, setUser] = useState({
    loaded: false
  })

  function setEmptyUser() {
    // to set initial empty state for user
    // used when there is no user in storage, or user chooses to log out
    const loadedEmptyUser = { isLoggedIn: false, isAdmin: false, loaded: true }
    setUser(loadedEmptyUser)
  }

  // set state for the whole school - years, classes and students
  const [school, dispatch] = useReducer(schoolReducer, {})

  useEffect(() => {
    // for every on mount, check if there is existing user in localstorage
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      // if user exists, set user with the state
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    } else {
      // if no user, set default (not logged in) user state
      setEmptyUser()
    }
  }, [])

  useEffect(() => {
    // for every on mount and when user state changes
    async function setSchoolData() {
      try {
        if (user.isLoggedIn) {
          // if user is logged in, fetch school data using token
          const token = user.token
          const students = await getHelper("/students", token)
          const classes = await getHelper("/classes", token)
          const years = await getHelper("/years", token)

          // set school state with fetched data
          dispatch({
            type: "set_school",
            school: { students, classes, years }
          })
        }
      } catch (e) {
        console.log(e)
        // if error fetching data, remove user info and return to home page
        localStorage.removeItem("user")
        setEmptyUser()
        nav("/")
      }
    }
    setSchoolData()
  }, [user])

  function YearbookWrapper() {
    // find class by class id in params
    const yearbook = findParamsMatching(school.classes)
    return <Yearbook yearbook={yearbook} />
  }

  function StudentProfileWrapper() {
    // find student by student id in params
    const student = findParamsMatching(school.students)
    return <StudentProfile student={student} />
  }

  function UpdateProfileWrapper() {
    // find student by student id in params
    const student = findParamsMatching(school.students)
    return <UpdateProfile student={student} />
  }

  function findParamsMatching(arr) {
    const { id } = useParams()
    const result = arr.find((item) => item._id === id)
    return result
  }

  return (
    <>
      {/* passed in user and school as global states */}
      <UserContext.Provider value={{ user, setUser, setEmptyUser }}>
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
