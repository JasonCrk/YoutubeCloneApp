import { FC } from 'react'

import NavbarAsideIconLink from '@components/ui/NavbarAsideIconLink'

import { Stack } from '@mui/material'

import {
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  Subscriptions as SubscriptionsIcon,
  SubscriptionsOutlined as SubscriptionsOutlinedIcon,
  VideoLibrary as VideoLibraryIcon,
  VideoLibraryOutlined as VideoLibraryOutlinedIcon
} from '@mui/icons-material'

const ShortNavbarAside: FC = () => {
  return (
    <Stack
      data-testid='ShortNavbarAside'
      bgcolor={'background.default'}
      height={'100vh'}
      color={'white'}
      spacing={0}
      px={0.6}
      pt={'56px'}
    >
      <NavbarAsideIconLink
        href='/'
        title='Home'
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon />}
      />
      <NavbarAsideIconLink
        href='/feed/subscriptions'
        title='Subscriptions'
        activeIcon={<SubscriptionsIcon />}
        noActiveIcon={<SubscriptionsOutlinedIcon />}
      />
      <NavbarAsideIconLink
        href='/feed/you'
        title='You'
        activeIcon={<VideoLibraryIcon />}
        noActiveIcon={<VideoLibraryOutlinedIcon />}
      />
    </Stack>
  )
}

export default ShortNavbarAside
