import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Navigation from '../components/Navigation'
import useStore from '../store/useStore'

export const PrivateRouter = ({ redirectPath = '/', children }) => {
  const accountWeb3 = useStore((state) => state.accountWeb3)
  return !accountWeb3 ? (
    <Navigate to={redirectPath} />
  ) : (
    <div>
      <Navigation />
      {children}
    </div>
  )
}

export default PrivateRouter
