interface IRoutes {
  path: string;
  element: JSX.Element | null;
  errorElement: JSX.Element;
  children: {
    path: string;
    element: JSX.Element;
  }[];
}

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IRouteTypeRenderer {
  routes: IRoutes[];
}
