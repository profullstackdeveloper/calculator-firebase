import React from 'react';
import Home from "../pages/Home";
import Login from "../pages/Login";
import History from '../pages/History';

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Home,
    name: "Home Screen",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "/history",
    component: History,
    name: "Calculation History",
    protected: true
  }
];

export default routes;
