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
]);

export default router;
