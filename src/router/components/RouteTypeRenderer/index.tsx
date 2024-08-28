import React from "react";
import { Route, Routes } from "react-router-dom";
import { IRoute, IRouteTypeRenderer } from "@router/interface";

const renderChildRoutes = (children: IRoute[]) => (
  <>
    {children.map((childRoute, childIndex) => (
      <Route key={childIndex} {...childRoute} />
    ))}
  </>
);

export const RouteTypeRenderer = ({ routes }: IRouteTypeRenderer) => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} {...route}>
        {renderChildRoutes(route.children)}
      </Route>
    ))}
  </Routes>
);
