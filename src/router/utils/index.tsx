import { NotFound } from "@pages/NotFound/notFound";
import { IRoute } from "@router/interface";

export const createRouteConfig = (routes: readonly IRoute[]) =>
  routes.map(({ path, element }) => ({
    path,
    element: null,
    errorElement: <NotFound />,
    children: [{ path, element }],
  }));
