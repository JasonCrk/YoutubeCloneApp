import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import HomePage from '@/pages/Home'

import MainLayout from '@/components/layouts/MainLayout'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
)
