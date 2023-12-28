import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import MainLayout from '@/components/layouts/MainLayout'

import HomePage from '@/pages/Home'

import { verifyAuthentication } from '@/router/loaders'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route loader={verifyAuthentication} path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
)
