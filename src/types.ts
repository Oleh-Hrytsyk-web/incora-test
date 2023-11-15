export interface User {
  id: string;
  name: string;
  password: string;
}

export interface ArticlesItem {
  content: string;
  title: string;
  description: string;
  guid: string;
}

export interface UserFeed{
    id?: string
    title: string
    URL?: string
}

export interface ArticlesFeed {
  feed: {
    title: string;
    url: string;
  };
  status: string;
  items: ArticlesItem[];
  [key: string]: any;
}

export interface ArticlesComponentProps {
  rssUrl: string;
  feedTitle: string;
}

export interface AppState {
  isLoggedIn: boolean;
  userId: number | null;
  userFeed: UserFeed[];
  articles: ArticlesFeed[];
}
