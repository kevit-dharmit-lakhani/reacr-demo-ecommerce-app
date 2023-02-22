import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import LandingPage from "./pages/Landing";
import ProductsListPage from "./pages/ProductsList";
import ProductsDetailsPage from "./pages/ProductDetails";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import UserProfilePage, { action as formAction } from "./pages/UserProfile";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "product",
        children: [
          { index: true, element: <ProductsListPage /> },
          { path: ":id", element: <ProductsDetailsPage /> },
        ],
      },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "user-profile",
        element: <UserProfilePage />,
        action: formAction,
      },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
