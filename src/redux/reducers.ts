import { UserFeed } from "../types";

const initialState = {
  isLoggedIn: false,
  userId: null,
  userFeed: [],
  articles: [],
};

const rootReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_USER_FEED":
      return { ...state, userFeed: action.payload };
    case "DELETE_FEED":
      return {
        ...state,
        userFeed: state.userFeed.filter(
          (item: UserFeed) => item.id !== action.payload
        ),
      };
    case "UPDATE_FEED":
      const updatedUserFeed = state.userFeed.map((item: UserFeed) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.feed };
        }
        return item;
      });

      return { ...state, userFeed: updatedUserFeed };
    case "ADD_FEED":

    console.log(action.payload);
    
      return { ...state, userFeed: [...state.userFeed, action.payload.feed] };
    case "SET_USER_ARTICLES":
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
