const baseURL = "http://127.0.0.1:5175"

export const getHelper = async (endpoint, token) => {
  try {
    const res = await fetch(`${baseURL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const postHelper = async (endpoint, body, token) => {
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

export const deleteHelper = async (endpoint, token) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  return res
}

export const putHelper = async (endpoint, body, token) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  const data = await res.json() //return updated item
  return data
}
