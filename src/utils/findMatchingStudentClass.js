import UserContext from "../contexts/UserContext"
import SchoolContext from "../contexts/SchoolContext"
import { useContext } from "react"

function findMatchingStudentClass() {
  const { user } = useContext(UserContext)
  const { isAdmin, isLoggedIn } = user
  const { school } = useContext(SchoolContext)

  const student =
    isLoggedIn &&
    !isAdmin &&
    school.students.find((s) => s._id === user.student)
  const studentClass =
    student && school.classes.find((c) => c._id === student.class)

  return [student, studentClass]
}

export default findMatchingStudentClass
