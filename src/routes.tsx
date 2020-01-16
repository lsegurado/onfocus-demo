import { lazy, LazyExoticComponent, FunctionComponent } from "react";

export const routes: Array<RouteConfig> = new Array<RouteConfig>(
  {
    path: "/home",
    name: "home",
    component: lazy(() => import("./views/Home")),
    isProtected: true
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("./views/Login")),
    isProtected: false
  }
);

export interface RouteConfig {
  path: string;
  name: string;
  component: LazyExoticComponent<FunctionComponent<{}>>;
  isProtected: boolean;
}

export default routes;