import { createBrowserRouter } from "react-router-dom";

import { Home, Winner } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/winners",
    element: <Winner />,
  },
  /*
   * 2025 archive routes stay disabled until their 2026 replacements exist.
   * { path: "/authors", element: <Maker /> },
   * { path: "/article", element: <Article /> },
   * { path: "/article/:id", element: <ArticleDetail /> },
   */
]);

export default router;
