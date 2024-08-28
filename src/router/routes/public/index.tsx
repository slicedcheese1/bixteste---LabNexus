import { InitialRegistration } from "@pages/InitialRegistration/initialRegistration";
import { Login } from "@pages/Login/login";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <InitialRegistration /> },
];

export default routes;
