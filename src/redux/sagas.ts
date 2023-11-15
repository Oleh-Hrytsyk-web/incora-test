import { call, put, takeEvery } from "redux-saga/effects";
import {
  setLoggedIn,
  setUserArticles,
  setUserFeed,
  setUserId,
} from "./actions";
import { ArticlesComponentProps, ArticlesItem, User, UserFeed } from "../types";

const userName = localStorage.getItem("userName");

const fetchFeeds = async () => {
  console.log(userName);

  const response = await fetch(`http://localhost:8000/${userName}/`);
  return response.json();
};
const fetchUser = async () => {
  const response = await fetch("http://localhost:8000/users");
  return response.json();
};

const fetchArticles = async (rssUrl: string) => {
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`
  );
  return response.json();
};

const addUserFeed = async (newFeed: UserFeed) => {
  try {
    fetch(`http://localhost:8000/${userName}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeed),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserFeed = async (id: string, updatedFeed: UserFeed) => {
  try {
    fetch(`http://localhost:8000/${userName}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFeed),
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserFeed = async (id: string) => {
  try {
    fetch(`http://localhost:8000/${userName}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

function* addUserFeedSaga(action: {
  payload: { feed: UserFeed };
  type: string;
}) {
  yield call(addUserFeed, action.payload.feed);
}

function* updateUserFeedSaga(action: {
  payload: { id: string; feed: UserFeed };
  type: string;
}) {
  yield call(updateUserFeed, action.payload.id, action.payload.feed);
}

function* deleteUserFeedSaga(action: { payload: string; type: string }) {
  yield call(deleteUserFeed, action.payload);
}

function* handleLoginSaga(action: {
  payload: { userName: string; password: string };
  type: string;
}) {
  try {
    const userData: User[] = yield call(fetchUser);

    const user = userData.find(
      (u: User) =>
        u.name === action.payload.userName &&
        u.password === action.payload.password
    );

    if (user) {
      yield put(setLoggedIn(true));
      yield put(setUserId(user.id));
      console.log(user);

      localStorage.setItem("userName", user.name);
    } else {
      console.log("Invalid username or password");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function* initFeeds() {
  try {
    const userFeed: UserFeed[] = yield call(fetchFeeds);
    yield put(setUserFeed(userFeed));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function* initArticles({ type, payload }: { type: string; payload: ArticlesComponentProps }) {
  try {
    const userArticles: ArticlesItem[] = yield call(fetchArticles, payload.rssUrl);

    console.log(userArticles);

    yield put(setUserArticles(userArticles));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default function* rootSaga() {
  yield takeEvery("LOGIN_REQUEST", handleLoginSaga);
  yield takeEvery("ADD_FEED", addUserFeedSaga);
  yield takeEvery("UPDATE_FEED", updateUserFeedSaga);
  yield takeEvery("DELETE_FEED", deleteUserFeedSaga);
  yield takeEvery("INIT_FEEDS", initFeeds);
  yield takeEvery("INIT_ARTICLES", initArticles);
}
