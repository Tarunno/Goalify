const BASE_URL = 'http://localhost:5000/api/users'

export const isLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user){
    return user
  }
  return false
}

export const userLogin = async(userInfo) => {
  const res = await fetch(BASE_URL + '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  const data = await res.json()
  if(!data['message']) localStorage.setItem('user', JSON.stringify(data))
  return data
}

export const userRegister = async(userInfo) => {
  const res = await fetch(BASE_URL + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  const data = await res.json()
  if(!data['message']) localStorage.setItem('user', JSON.stringify(data))
  return data
}