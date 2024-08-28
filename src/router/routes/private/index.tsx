import { Home } from "@pages/Home/home";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
];

export default routes;
