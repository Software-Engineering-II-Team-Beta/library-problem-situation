const initialState = {
  isLoggedIn: false,
  user: {},
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
      
    default:
      return state;
  }
}
