const baseURL = "http://127.0.0.1:5175"

export const getHelper = async (endpoint, token) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  return data
}

export const postHelper = async (endpoint, body, token) => {
  console.log("token", token)
  console.log("body", body)
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(body)
  })
  const data = await res.json()
  return data
}

export const deleteHelper = async (endpoint, id) => {
  const res = await fetch(`${baseURL}${endpoint}${id}`, {
    method: "DELETE"
  })
  // const data = await res.json()
  return res
}

export const putHelper = async (endpoint, collection) => {
  const res = await fetch(`${baseURL}${endpoint}${collection._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collection)
  })
  const data = await res.json() //return updated item
  return data
}