import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./css/main.css";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import GamesPage from "./pages/GamesPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import SearchResultsPage from "./pages/SearchResultsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/games", element: <GamesPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/games/:id", element: <DetailsPage /> },
      { path: "/search-results/:query", element: <SearchResultsPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },

  { path: "*", element: <ErrorPage /> },
]);

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
