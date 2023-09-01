// base URL for all api requests
// const baseURL = "http://127.0.0.1:5175"
const baseURL = "https://student-year-book.onrender.com"

// perform a fetch request with headers and error handling
async function fetchWithHeaders(endpoint, options = {}, token) {
  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined
    }
  })

  // check for failed request
  if (!res.ok) {
    const message = await res.text()
    throw new Error(
      `Request failed, status: ${res.status}, message: ${message}`
    )
  }

  // for DELETE request, only res will be returned
  if (options?.method === "DELETE") {
    return res
  }

  // for other requests, return parsed data
  return await res.json()
}

// helper function to perform GET request
export const apiGet = async (endpoint, token) => {
  try {
    return await fetchWithHeaders(endpoint, {}, token)
  } catch (e) {
    console.error(`GET ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform POST request
export const apiPost = async (endpoint, body, token) => {
  try {
    return await fetchWithHeaders(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(body)
      },
      token
    )
  } catch (e) {
    console.error(`POST ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform DELETE request
export const apiDelete = async (endpoint, token) => {
  try {
    return await fetchWithHeaders(endpoint, { method: "DELETE" }, token)
  } catch (e) {
    console.error(`DELETE ${endpoint} failed: ${e.message}`)
    throw e
  }
}

// helper function to perform PUT request
export const apiPut = async (endpoint, body, token) => {
  try {
    return await fetchWithHeaders(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(body)
      },
      token
    )
  } catch (e) {
    console.error(`PUT ${endpoint} failed: ${e.message}`)
    throw e
  }
}
