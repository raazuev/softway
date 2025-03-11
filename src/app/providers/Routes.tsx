import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(async () => {
  const module = await import("@/pages/homePage/HomePage");
  return { default: module.HomePage };
});

const NotFoundPage = lazy(async () => {
  const module = await import("@/pages/notFoundPage/NotFoundPage");
  return { default: module.NotFoundPage };
});

export const appRoutes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFoundPage /> },
];
