import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesComponent from "./ArticlesComponent";
import { AppState, UserFeed } from "./types";

function Main() {
  const dispatch = useDispatch();
  const userName = localStorage.getItem("userName");
  const userFeed = useSelector((state: AppState) => state.userFeed);
  const [titleValue, setTitleValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "INIT_FEEDS", payload: { userName } });
  }, []);

  if (!userName) {
    return <a href="/login">please login</a>;
  }

  return (
    <div className="main">
      <div>You are logged in!</div>
      <nav className="feeds">
        {userFeed.map((item: UserFeed) => (
          <ul>
            <li>
              <a href={"#" + item.title}>{item.title}</a>
            </li>
            <button
              onClick={() => {
                dispatch({
                  type: "DELETE_FEED",
                  payload: item.id,
                });
              }}
            >
              delete
            </button>

            <button
              onClick={() => {
                dispatch({
                  type: "UPDATE_FEED",
                  payload: {
                    id: item.id, 
                    feed: {
                      title: titleValue,
                      URL: urlValue,
                    },
                  },
                });
                dispatch({ type: "INIT_FEEDS", payload: { userName } });
              }}
            >
              update
            </button>
          </ul>
        ))}

        <input
          type="text"
          placeholder="Title"
          value={titleValue}
          onChange={handleTitleChange}
        />

        <input
          type="text"
          placeholder="Url"
          value={urlValue}
          onChange={handleUrlChange}
        />

        <button
          onClick={() => {
            dispatch({
              type: "ADD_FEED",
              payload: {
                feed: {
                  title: titleValue,
                  URL: urlValue,
                },
              },
            });
            dispatch({ type: "INIT_FEEDS", payload: { userName } });
          }}
        >
          Create
        </button>
      </nav>
      <ul>
        {userFeed.map((item: UserFeed, index: number) => (
          <li key={index}>
            <ArticlesComponent
              feedTitle={item.title}
              rssUrl={item.URL as string}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Main);
