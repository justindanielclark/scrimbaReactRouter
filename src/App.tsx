import { useState } from "react";
import Layout from "./routes/Layout/Layout";
import Root from "./routes/BaseRoot/Root";
import About from "./routes/About/About";
import Vans, { loader as VansLoader } from "./routes/Vans/Vans";
import HostLayout from "./routes/Host/HostLayout";
import HostDetails, {
  loader as HostDetailsLoader,
} from "./routes/Host/Details";
import HostIncome from "./routes/Host/Income";
import HostReviews, {
  loader as HostReviewsLoader,
} from "./routes/Host/Reviews";
import HostVans from "./routes/Host/Vans";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./server/server";
import VanPage, { loader as VanPageLoader } from "./routes/Van/VanPage";

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Root />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "vans",
            element: <Vans />,
            loader: VansLoader,
          },
          {
            path: "vans/:vanID",
            element: <VanPage />,
            loader: VanPageLoader,
          },
          {
            path: "host",
            element: <HostLayout />,
            children: [
              {
                index: true,
                element: <HostDetails />,
                loader: HostDetailsLoader,
              },
              {
                path: "income",
                element: <HostIncome />,
              },
              {
                path: "reviews",
                element: <HostReviews />,
                loader: HostReviewsLoader,
              },
              {
                path: "vans",
                element: <HostVans />,
              },
              {
                path: "vans/:id",
                element: <div>You're viewing some van details harry!</div>,
              },
              {
                path: "vans/:id/edit",
                element: <div>You're editing me harry</div>,
              },
            ],
          },
        ],
      },
    ],
    {}
  );

  return <RouterProvider router={router} />;
}

export default App;
