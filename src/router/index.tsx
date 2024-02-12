import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import { QueryClient } from '@tanstack/react-query'

import MainLayout from '@/components/layouts/MainLayout'
import WatchVideoLayout from '@/components/layouts/WatchVideoLayout'

import HomePage from '@/pages/Home'
import WatchVideoPage from '@/pages/WatchVideo'

import { verifyAuthentication } from '@/router/loaders'
import { queryParamsWatchVideo } from '@/features/video/loaders'

export const router = (queryClient: QueryClient) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' loader={verifyAuthentication(queryClient)}>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<WatchVideoLayout />}>
          <Route
            path='watch'
            loader={queryParamsWatchVideo}
            element={<WatchVideoPage />}
          />
        </Route>
      </Route>
    )
  )
