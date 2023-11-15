import { ArticlesItem, UserFeed } from "../types";

export const setLoggedIn = (isLoggedIn : boolean) => ({
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  });
  
  export const setUserId = (userId : string) => ({
    type: 'SET_USER_ID',
    payload: userId,
  });

  export const setUserFeed = (userFeed : UserFeed[]) => ({
    type: 'SET_USER_FEED',
    payload: userFeed,
  });

  export const setUserArticles = (articles : ArticlesItem[]) => ({
    type: 'SET_USER_ARTICLES',
    payload: articles,
  });

  export const addFeed = (feed : UserFeed) => ({
    type: 'ADD_FEED',
    payload: feed,
  });
  export const deleteFeed = (articles : ArticlesItem) => ({
    type: 'DELETE_FEED',
    payload: articles,
  });
  export const updateFeed = (id : string) => ({
    type: 'UPDATE_FEED',
    payload: id,
  });