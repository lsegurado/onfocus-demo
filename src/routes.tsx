import { lazy, LazyExoticComponent, FunctionComponent } from "react";

export const routes: Array<RouteConfig> = new Array<RouteConfig>(
  {
    path: "/home",
    name: "home",
    component: lazy(() => import("./views/Home"))
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("./views/Login"))
  }
);

export interface RouteConfig {
  path: string;
  name: string;
  component: LazyExoticComponent<FunctionComponent<{}>>;
}

export default routes;