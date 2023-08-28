export default function schoolReducer(school, action) {
  switch (action.type) {
    case "set_school":
      return action.school
    case "update_class":
      const id = action.class._id
      return {
        ...school,
        classes: school.classes.map((cls) =>
          cls._id === id ? action.class : cls
        )
      }
    case "add_year":
      // dispatch - year: {name: xxx, _id: xxx}
      return { ...school, years: [...school.years, action.year] }
    default:
      throw Error("Unknown action: " + action.type)
  }
}
