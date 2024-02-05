import type { FC } from 'react'

import { NavbarAsideProvider } from '@/contexts/NavbarAside/providers'

import BaseLayout from '@/components/layouts/BaseLayout'

const MainLayout: FC = () => {
  return (
    <NavbarAsideProvider>
      <BaseLayout />
    </NavbarAsideProvider>
  )
}

export default MainLayout
