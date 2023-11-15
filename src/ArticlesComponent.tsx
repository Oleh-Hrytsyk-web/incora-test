import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppState,
  ArticlesComponentProps,
  ArticlesFeed,
  ArticlesItem,
} from "./types";

const ArticlesComponent: React.FC<ArticlesComponentProps> = ({
  rssUrl,
  feedTitle,
}) => {
  const dispatch = useDispatch();

  const articles = useSelector((state: AppState) => state.articles);

  const filteredArticles: ArticlesFeed[] = articles.filter(
    (article: ArticlesFeed) => article.feed && article.feed.url === rssUrl
  );

  console.log(filteredArticles[0]);

  const fetchArticles = () => {
    if (
      articles.some((article: ArticlesFeed) => article.feed?.url === rssUrl)
    ) {
      return;
    } else {
      dispatch({ type: "INIT_ARTICLES", payload: { rssUrl } });
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const navigate = useNavigate();

  const navigateToArticle = (id: string, feedTitle: string) => {
    const encodedId = encodeURIComponent(id);
    const encodedTitle = encodeURIComponent(feedTitle);
    navigate(`/article/${encodedId}?title=${encodedTitle}`);
  };

  if (filteredArticles[0]?.status !== "ok") {
    return <>'Loading'</>;
  }

  return (
    <div>
      <h2 id={feedTitle}>{feedTitle}</h2>
      <ul>
        {filteredArticles[0].items.map((item: ArticlesItem) => (
          <li
            key={item.guid}
            onClick={() =>
              navigateToArticle(item.guid, filteredArticles[0].feed.title)
            }
          >
            <div>
              <h3>{item.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesComponent;
