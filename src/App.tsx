import { useState } from "react";
import Root from "./routes/shared/Root";
import BaseRoot from "./routes/BaseRoot/BaseRoot";
import About from "./routes/About/About";
import Vans from "./routes/Vans/Vans";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/",
            element: <BaseRoot />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/vans",
            element: <Vans />,
          },
        ],
      },
    ],
    {}
  );

  return <RouterProvider router={router} />;
}

export default App;
