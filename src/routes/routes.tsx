import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import Layout from "../components/layout/Layout";
import Success from "../pages/Success";
export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/success",
        Component: Success,
      },
    ],
  },
]);
