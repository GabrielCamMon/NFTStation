import { Component } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom'

import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'

import Home from '../pages/Home'
import Explore from '../pages/Explore'
import Create from '../pages/Create'
import MyListItems from '../pages/MyListItems'
import Purchases from '../pages/Purchases'

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
      <Route
        path="explore"
        element={
          <PrivateRouter>
            <Explore />
          </PrivateRouter>
        }
      />
      <Route
        path="create"
        element={
          <PrivateRouter>
            <Create />
          </PrivateRouter>
        }
      />
      <Route
        path="mylist"
        element={
          <PrivateRouter>
            <MyListItems />
          </PrivateRouter>
        }
      />
      <Route
        path="purchases"
        element={
          <PrivateRouter>
            <Purchases />
          </PrivateRouter>
        }
      />
    </Route>,
  ),
)

export default router
