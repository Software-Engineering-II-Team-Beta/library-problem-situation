export function setToken(token){
  return {
    type: 'SET_TOKEN',
    token,
  }
}

export function setUser(user){
  return {
    type: 'SET_USER',
    user,
  }
}