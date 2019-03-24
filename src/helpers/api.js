/*export const login = (username, password) => fetch("192.168.43.212:8000/api/authentication")
  .then(res => res.json())
  .catch(console.log)*/

const apiUrl = "http://192.168.43.212:8000"

export const getEvent = id => fetch(`${apiUrl}/api/events/${id}`)
  .then(res => res.json())
  .catch(console.log)

export const getEventPartecipants = id => fetch(`${apiUrl}/api/events/${id}/users`)
  .then(res => res.json())
  .catch(console.log)

export const getEventAssets = id => fetch(`${apiUrl}/api/events/${id}/assets`)
  .then(res => res.json())
  .catch(console.log)

export const postAsset = (eventId, assetId) => fetch(`${apiUrl}/api/events/${eventId}/assets/${assetId}`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ"
  }
})
  .then(res => res.json())
  .catch(console.log)

export const attendEvent = eventId => fetch(`${apiUrl}/api/events/${eventId}/users`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ"
  }
})
  .then(res => res.json())
  .catch(console.log)

export const createEvent = event => fetch(`${apiUrl}/api/events`, {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTUzMzk2ODE1fQ.mWTbKPlTAmCXDVLa-jPHEkGCPSXpu3dnVijx58lDIFPoVB8SChMXTo-gAOr4mS1Up6wB0ihyr_U9qcJUE1zuDQ",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(event)
})
  .then(res => res.json())
  .catch(console.log)
