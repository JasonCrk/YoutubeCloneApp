import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import { QueryClient } from '@tanstack/react-query'

import MainLayout from '@/components/layouts/MainLayout'

import HomePage from '@/pages/Home'

import { verifyAuthentication } from '@/router/loaders'

export const router = (queryClient: QueryClient) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        loader={verifyAuthentication(queryClient)}
        element={<MainLayout />}
      >
        <Route index element={<HomePage />} />
      </Route>
    )
  )
