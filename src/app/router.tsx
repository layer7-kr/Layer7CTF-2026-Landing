import { createBrowserRouter } from "react-router-dom";

import { Article, ArticleDetail, Home, Winner } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/winners",
    element: <Winner />,
  },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/article/:id",
    element: <ArticleDetail />,
  },
]);

export default router;
