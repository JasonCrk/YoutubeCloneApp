import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import TopBar from '@components/ui/TopBar'

const MainLayout: FC = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

export default MainLayout
