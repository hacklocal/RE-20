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

export const signup = user => fetch(`${apiUrl}/api/users`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ",
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

export const postAsset = (eventId, assetId) => fetch(`${apiUrl}/api/events/${eventId}/assets/${assetId}`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ"
  }
})
  .then(res => res.json())
  .catch(console.error)

export const attendEvent = eventId => fetch(`${apiUrl}/api/events/${eventId}/users`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ"
  }
})
  .then(res => res.json())
  .catch(console.error)

export const createEvent = event => fetch(`${apiUrl}/api/events`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(event)
})
  .then(res => res.json())
  .catch(console.error)
