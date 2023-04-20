import Layout from "./routes/Layout/Layout";
import MissingPage from "./routes/MissingPage";
import Root from "./routes/BaseRoot/Root";
import About from "./routes/About/About";

import Vans, { loader as VansLoader } from "./routes/Vans/Vans";

import HostLayout from "./routes/Host/Layout";
import HostDetails, {
  loader as HostDetailsLoader,
} from "./routes/Host/Details";
import HostIncome, { loader as HostIncomeLoader } from "./routes/Host/Income";
import HostReviews, {
  loader as HostReviewsLoader,
} from "./routes/Host/Reviews";
import HostVans, { loader as HostVansLoader } from "./routes/Host/Vans";

import HostVanLayout, {
  loader as HostVanLoader,
} from "./routes/Host/Van/Layout";
import HostVanDetails from "./routes/Host/Van/Details";
import HostVanPricing from "./routes/Host/Van/Pricing";
import HostVanPhotos from "./routes/Host/Van/Photos";

import ErrorPage from "./routes/ErrorPage";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./server/server";
import VanPage, { loader as VanPageLoader } from "./routes/Van/VanPage";
import Login from "./routes/Login/Login";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "*",
          element: <MissingPage />,
        },
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
          errorElement: <ErrorPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "vans/:vanID",
          element: <VanPage />,
          loader: VanPageLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "host",
          element: <HostLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <HostDetails />,
              loader: HostDetailsLoader,
            },
            {
              path: "income",
              element: <HostIncome />,
              loader: HostIncomeLoader,
            },
            {
              path: "reviews",
              element: <HostReviews />,
              loader: HostReviewsLoader,
            },
            {
              path: "vans",
              element: <HostVans />,
              loader: HostVansLoader,
            },
            {
              id: "rootVan",
              path: "vans/:vanId",
              element: <HostVanLayout />,
              loader: HostVanLoader,
              children: [
                {
                  index: true,
                  element: <HostVanDetails />,
                },
                {
                  path: "pricing",
                  element: <HostVanPricing />,
                },
                {
                  path: "photos",
                  element: <HostVanPhotos />,
                },
              ],
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
