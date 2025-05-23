import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./page/HomePage";
import ProductListingPage from "./page/ProductListingPage";
import ProductViewPage from "./page/ProductViewPage";

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductListingPage />,
      },
      {
        path: "/products-view-page",
        element: <ProductViewPage />,
      },
      // Add other routes here as needed
      // {
      //   path: "/about",
      //   element: <AboutPage />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
