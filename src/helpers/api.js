export const login = (username, password) => fetch("192.168.43.212:8000/api/authentication")
  .then(res => res.json())
  .catch(console.log)