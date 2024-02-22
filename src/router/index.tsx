import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import { QueryClient } from '@tanstack/react-query'

import MainLayout from '@/components/layouts/MainLayout'
import WatchVideoLayout from '@/components/layouts/WatchVideoLayout'
import ChannelProfileLayoutByHandle from '@/components/layouts/ChannelProfileLayoutByHandle'
import ChannelProfileLayoutByChannelId from '@/components/layouts/ChannelProfileLayoutByChannelId'

import HomePage from '@/pages/Home'
import WatchVideoPage from '@/pages/WatchVideo'
import ChannelProfileHomePage from '@/pages/ChannelProfile/Home'
import ChannelProfilePlaylistsPage from '@/pages/ChannelProfile/Playlists'

import { verifyAuthentication } from '@/router/loaders'
import { queryParamsWatchVideo } from '@/features/video/loaders'
import {
  getChannelDetailsByHandle,
  getChannelDetailsByChannelId
} from '@/features/channel/loaders'

export const router = (queryClient: QueryClient) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' loader={verifyAuthentication(queryClient)}>
        <Route element={<WatchVideoLayout />}>
          <Route
            path='watch'
            loader={queryParamsWatchVideo}
            element={<WatchVideoPage />}
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path='channel/:channelId'
            loader={getChannelDetailsByChannelId(queryClient)}
            element={<ChannelProfileLayoutByChannelId />}
          >
            <Route index element={<ChannelProfileHomePage />} />
          </Route>

          <Route
            path=':handle'
            loader={getChannelDetailsByHandle(queryClient)}
            element={<ChannelProfileLayoutByHandle />}
          >
            <Route index element={<ChannelProfileHomePage />} />
            <Route path='playlists' element={<ChannelProfilePlaylistsPage />} />
          </Route>
        </Route>
      </Route>
    )
  )
