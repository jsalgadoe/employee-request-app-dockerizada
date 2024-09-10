const initialState = {
  status: "checking", // 'checking', 'authenticated', 'not-authenticated'
  user: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        status: "authenticated",
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        status: "not-authenticated",
        user: null,
        token: null,
      };
    case "CHECKING":
      return {
        ...state,
        status: "checking",
      };
    default:
      return state;
  }
};
