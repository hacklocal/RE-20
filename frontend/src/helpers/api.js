const apiUrl = "http://192.168.43.212:8000"

export const login = (email, password) => fetch(`${apiUrl}/api/authentication`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email,
    password
  })
})
  .then(res => res.json())
  .catch(console.error)

export const signup = (user, jwt) => fetch(`${apiUrl}/api/users`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
})
  .then(res => res.json())
  .catch(console.error)

export const getEvent = id => fetch(`${apiUrl}/api/events/${id}`)
  .then(res => res.json())
  .catch(console.error)

export const getEventPartecipants = id => fetch(`${apiUrl}/api/events/${id}/users`)
  .then(res => res.json())
  .catch(console.error)

export const getEventAssets = id => fetch(`${apiUrl}/api/events/${id}/assets`)
  .then(res => res.json())
  .catch(console.error)

export const postAsset = (eventId, assetId, jwt) => fetch(`${apiUrl}/api/events/${eventId}/assets/${assetId}`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`
  }
})
  .then(res => res.json())
  .catch(console.error)

export const attendEvent = (eventId, jwt) => fetch(`${apiUrl}/api/events/${eventId}/users`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`
  }
})
  .then(res => res.json())
  .catch(console.error)

export const createEvent = (event, jwt) => fetch(`${apiUrl}/api/events`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(event)
})
  .then(res => res.json())
  .catch(console.error)
