export default function schoolReducer(school, action) {
  switch (action.type) {
    case "set_school": {
      return action.school
    }
  }
  throw Error("Unknown action: " + action.type)
}
