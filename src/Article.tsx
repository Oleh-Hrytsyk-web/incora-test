import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppState, ArticlesFeed, ArticlesItem } from "./types";

function Article() {
  const articles = useSelector((state: AppState) => state.articles);
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>([]);

  const { id } = useParams();
  const location = useLocation();
  const title = new URLSearchParams(location.search)
    .get("title")
    ?.toLowerCase();

  useEffect(() => {
    setArticle(
      articles
        .find((i: ArticlesFeed) => i.feed.title.toLowerCase() === title)
        ?.items.find((i: ArticlesItem) => i.guid === id)
    );
  }, []);

  return (
    <>
      <button onClick={() => navigate("/")}>back</button>
      <p
        className="article"
        dangerouslySetInnerHTML={{ __html: article?.content }}
      />
      ;
    </>
  );
}

export default Article;
