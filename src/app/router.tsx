import { createBrowserRouter } from "react-router-dom";

import { Home, Maker, Winner } from "@/pages";

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
    path: "/authors",
    element: <Maker />,
  },
]);

export default router;
