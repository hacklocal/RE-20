/*export const login = (username, password) => fetch("192.168.43.212:8000/api/authentication")
  .then(res => res.json())
  .catch(console.log)*/

export const getEvent = id => fetch(`http://192.168.43.212:8000/api/events/${id}`)
  .then(res => res.json())
  .catch(console.log)

export const getEventPartecipants = id => fetch(`http://192.168.43.212:8000/api/events/${id}/users`)
  .then(res => res.json())
  .catch(console.log)

export const getEventAssets = id => fetch(`http://192.168.43.212:8000/api/events/${id}/assets`)
  .then(res => res.json())
  .catch(console.log)
