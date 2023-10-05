import { AT_SIGNUP, AT_LOGIN } from "./Action";
const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT_SIGNUP:
      state = {
        ...state,
        userList: action.payload,
      };
      break;

    case AT_LOGIN:
      state = {
        ...state,
        userList: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default userReducer;