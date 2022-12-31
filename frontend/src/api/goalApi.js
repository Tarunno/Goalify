const BASE_URL = 'http://localhost:5000/api/goals'

export const getGoals = async(user) => {
  const res = await fetch(BASE_URL + '/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    }
  })
  const data = await res.json()
  return data
}

export const addGoals = async(user, text) => {
  const res = await fetch(BASE_URL + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    },
    body: JSON.stringify({'text': text})
  })
  const data = await res.json()
  return data
}

export const deleteGoals = async(user, id) => {
  const res = await fetch(BASE_URL + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    }
  })
  const data = await res.json()
  return data
}

export const updateGoals = async(user, id, text) => {
  const res = await fetch(BASE_URL + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    },
    body: JSON.stringify({id: id, text: text})
  })
  const data = await res.json()
  return data
}