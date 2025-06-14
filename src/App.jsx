import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./page/HomePage";
import ProductListingPage from "./page/ProductListingPage";
import ProductViewPage from "./page/ProductViewPage";
import AdminLayout from "./Admin/layout/AdminLayout";
import DashboardOverview from "./Admin/adminComponents/DashboardOverView";
import ProductsManager from "./Admin/adminComponents/ProductsManager";
import OrdersManager from "./Admin/adminComponents/OrdersManager";
import ReviewsManager from "./Admin/adminComponents/ReviewsManager";
import ModeratorsManager from "./Admin/adminComponents/ModeratorsManager";
import ModernLogin from "./page/ModernLogin";

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductListingPage />,
      },
      {
        path: "products/:productId",
        element: <ProductViewPage />,
      },
      {
        path: "auth",
        element: <ModernLogin />,
      },
      // Add other customer-facing routes here as needed
      // {
      //   path: "about",
      //   element: <AboutPage />,
      // },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "products",
        element: <ProductsManager />,
      },
      {
        path: "orders",
        element: <OrdersManager />,
      },
      {
        path: "reviews",
        element: <ReviewsManager />,
      },
      {
        path: "moderators",
        element: <ModeratorsManager />,
      },
      // Add other admin routes here as needed
    ],
  },
  // Add authentication routes if needed
  // {
  //   path: "login",
  //   element: <LoginPage />,
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
