export function setLoggedIn(isLoggedIn){
  return {
    type: 'SET_LOGGED_IN',
    isLoggedIn,
  }
}

export function setUser(user){
  return {
    type: 'SET_USER',
    user,
  }
}