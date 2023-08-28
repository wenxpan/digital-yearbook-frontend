export default function schoolReducer(school, action) {
  switch (action.type) {
    case "set_school":
      return action.school
    case "update_class":
      return {
        ...school,
        classes: school.classes.map((cls) =>
          cls._id === action.class._id ? action.class : cls
        )
      }
    case "update_student":
      console.log(
        "updated array",
        school.students.map((stu) =>
          stu._id === action.student._id ? action.student : stu
        )
      )
      return {
        ...school,
        students: school.students.map((stu) =>
          stu._id === action.student._id ? action.student : stu
        )
      }
    case "add_year":
      // dispatch - year: {name: xxx, _id: xxx}
      return { ...school, years: [...school.years, action.year] }
    default:
      throw Error("Unknown action: " + action.type)
  }
}
