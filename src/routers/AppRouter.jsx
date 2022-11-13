import { Component } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import PublicRouter from "./PublicRouter";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <PublicRouter>
            <Home />
          </PublicRouter>
        }
      />
    </Route>
  )
);

export default router;
