export default function schoolReducer(school, action) {
  console.log("reducing")
  switch (action.type) {
    case "set_school":
      return action.school
    default:
      throw Error("Unknown action: " + action.type)
  }
}
