import { useState, useReducer, useEffect } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
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
import { apiGet } from "./utils/apiHelper"

function App() {
  const nav = useNavigate()

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
          const students = await apiGet("/students", token)
          const classes = await apiGet("/classes", token)
          const years = await apiGet("/years", token)

          // set school state with fetched data
          dispatch({
            type: "set_school",
            school: { students, classes, years }
          })
        }
      } catch (e) {
        console.log(e)
        // if error fetching data, remove user info and direct to error page
        localStorage.removeItem("user")
        setEmptyUser()
        nav("/user-error")
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
              <Route index element={<RedirectRoute page={Landing} />} />
              <Route path="/login">
                <Route index element={<RedirectRoute page={Login} />} />
              </Route>
              <Route path="/signup" element={<RedirectRoute page={SignUp} />} />
            </Route>

            {/* yearbooks pages */}
            <Route path="/classes">
              <Route index element={<LoggedInRoute page={Classes} />} />
              <Route
                path=":id"
                element={<LoggedInRoute page={YearbookWrapper} />}
              />
            </Route>

            {/* student pages */}
            <Route path="/students">
              <Route
                path=":id"
                element={<LoggedInRoute page={StudentProfileWrapper} />}
              />
              {/* update profile page for both student and admin, with different props */}
              <Route
                path=":id/edit"
                element={<LoggedInRoute page={UpdateProfileWrapper} />}
              />
            </Route>

            {/* account pages */}
            <Route path="/account">
              <Route index element={<LoggedInRoute page={Account} />} />
              <Route
                path="classes"
                element={<AdminRoute page={ManageClasses} />}
              />
              <Route
                path="classes/new"
                element={<AdminRoute page={AddClass} />}
              />
              <Route
                path="students"
                element={<AdminRoute page={ManageStudents} />}
              />
              <Route
                path="students/new"
                element={<AdminRoute page={AddStudents} />}
              />
            </Route>
            <Route
              path="/user-error"
              element={<RedirectMessage type={"userError"} />}
            />
            <Route path="*" element={<RedirectMessage type={"notFound"} />} />
          </Routes>
        </SchoolContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
