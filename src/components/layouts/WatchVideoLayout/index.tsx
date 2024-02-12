import type { FC } from 'react'

import { NavbarAsideFloatProvider } from '@/contexts/NavbarAside/providers'

import BaseLayout from '@/components/layouts/BaseLayout'

const WatchVideoLayout: FC = () => {
  return (
    <NavbarAsideFloatProvider>
      <BaseLayout />
    </NavbarAsideFloatProvider>
  )
}

export default WatchVideoLayout
