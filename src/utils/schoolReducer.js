export default function schoolReducer(school, action) {
  switch (action.type) {
    case "set_school":
      const sortedYears = [...action.school.years].sort(
        (a, b) => parseInt(b.name) - parseInt(a.name)
      )
      return { ...action.school, years: sortedYears }

    // Classes CRUD
    case "update_class":
      return {
        ...school,
        classes: school.classes.map((cls) =>
          cls._id === action.class._id ? action.class : cls
        )
      }

    case "delete_class":
      return {
        ...school,
        classes: school.classes.filter((cls) => cls._id !== action.classId)
      }

    case "add_class":
      return { ...school, classes: [...school.classes, action.class] }

    // Students CRUD
    case "add_students":
      return {
        ...school,
        students: [...school.students, ...action.students]
      }

    case "update_student":
      return {
        ...school,
        students: school.students.map((stu) =>
          stu._id === action.student._id ? action.student : stu
        )
      }

    case "delete_student":
      return {
        ...school,
        students: school.students.filter((stu) => stu._id !== action.studentId)
      }

    // Years CRUD
    case "add_year":
      // in dispatch - year: {name: xxx, _id: xxx}
      return { ...school, years: [...school.years, action.year] }

    case "delete_year":
      return {
        ...school,
        years: school.years.filter((y) => y._id !== action.yearId)
      }

    default:
      throw Error("Unknown action: " + action.type)
  }
}
