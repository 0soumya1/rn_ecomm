import { AT_ITEM_LIST, AT_ADD_ITEM, AT_DELETE_ITEM, AT_GET_ITEM_BY_ID, AT_UPDATE_ITEM } from "./Action";
const initialState = {
  itemList: [],
  itemDetail: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT_ITEM_LIST:
      state = {
        ...state,
        itemList: action.payload,
      };
      break;

    case AT_ADD_ITEM:
      state = {
        ...state,
      };
      break;

    case AT_DELETE_ITEM:
      state = {
        ...state,
      };
      break;

    case AT_GET_ITEM_BY_ID:
      state = {
        ...state,
        itemDetail: action.payload,
      };
      break;

    case AT_UPDATE_ITEM:
      state = {
        ...state,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default itemReducer;
