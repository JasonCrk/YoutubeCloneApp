import { FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'
import FooterLink from '@/components/ui/FooterLink'

import SignInButton from '@/features/auth/components/SignInButton'
import NavbarAsideSubscriptionLinkList from '@/features/subscription/components/NavbarAsideSubscriptionLinkList'
import NavbarAsidePlaylistLinkList from '@/features/playlist/components/NavbarAsidePlaylistLinkList'

import { Box, Divider, List, Stack, Typography } from '@mui/material'

import {
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  Portrait as PortraitIcon,
  PortraitOutlined as PortraitOutlinedIcon,
  VideoLibrary as VideoLibraryIcon,
  VideoLibraryOutlined as VideoLibraryOutlinedIcon,
  Subscriptions as SubscriptionsIcon,
  SubscriptionsOutlined as SubscriptionsOutlinedIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ThumbUpOutlined as LikedVideosOutlinedIcon,
  ThumbUp as LikedVideosIcon
} from '@mui/icons-material'

interface Props {
  disablePaddingTop?: boolean
}

const FullNavbarAside: FC<Props> = ({ disablePaddingTop }) => {
  const { isAuth, user } = useAppSelector(state => state.auth)

  return (
    <Stack
      divider={<Divider flexItem />}
      spacing={0.6}
      data-testid='FullNavbarAside'
      position={'sticky'}
      pt={disablePaddingTop ? 0 : '56px'}
      sx={{
        minWidth: '228px',
        width: '228px',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'white',
        overflow: 'auto',
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
          borderColor: 'background.default'
        },
        '&:hover::-webkit-scrollbar-thumb': {
          background: '#CCC',
          borderWidth: '4px',
          borderStyle: 'solid'
        }
      }}
    >
      <Stack spacing={0.6} px={1.2} divider={<Divider flexItem />}>
        <List>
          <NavbarAsideLink
            activeIcon={<HomeIcon />}
            noActiveIcon={<HomeOutlinedIcon />}
            href='/'
            title='Home'
          />
          <NavbarAsideLink
            activeIcon={<SubscriptionsIcon />}
            noActiveIcon={<SubscriptionsOutlinedIcon />}
            href='/feed/subscriptions'
            title='Subscriptions'
          />
        </List>

        {isAuth ? (
          <List data-testid='authLinks'>
            <NavbarAsideLink
              reverse
              activeIcon={<ArrowForwardIosIcon sx={{ fontSize: '15px' }} />}
              href='/feed/you'
              title='You'
              titleProps={{
                fontWeight: 'bold',
                fontSize: '1.05rem'
              }}
            />
            <NavbarAsideLink
              activeIcon={<PortraitIcon />}
              noActiveIcon={<PortraitOutlinedIcon />}
              href={`/channel/${user?.currentChannel.id}`}
              title='Your channel'
            />
            <NavbarAsideLink
              activeIcon={<LikedVideosIcon />}
              noActiveIcon={<LikedVideosOutlinedIcon />}
              href='/feed/liked'
              title='Liked videos'
            />

            <NavbarAsidePlaylistLinkList />
          </List>
        ) : (
          <List data-testid='noAuthLinks'>
            <NavbarAsideLink
              activeIcon={<VideoLibraryIcon />}
              noActiveIcon={<VideoLibraryOutlinedIcon />}
              href='/feed/you'
              title='You'
            />
          </List>
        )}
      </Stack>

      {isAuth ? (
        <Box p={1.2} data-testid='authSection'>
          <Typography pl={1.8} variant='subtitle1' fontWeight={'600'}>
            Subscriptions
          </Typography>
          <NavbarAsideSubscriptionLinkList />
        </Box>
      ) : (
        <Box pl={4} pr={1} py={1.2} data-testid='noAuthSection'>
          <Typography component={'p'} variant='body2' mb={1.5}>
            Sign in to like videos, comment, and subscribe.
          </Typography>
          <SignInButton />
        </Box>
      )}

      <Stack spacing={1.6} pl={3} py={1.2}>
        <Box display={'flex'} flexWrap={'wrap'} rowGap={0} columnGap={1}>
          <FooterLink href='/about/' title='About' />
          <FooterLink href='/about/press' title='Press' />
          <FooterLink href='/about/copyright' title='Copyright' />
          <FooterLink href='/t/contact_us' title='Contact us' />
          <FooterLink href='/creators' title='Creators' />
          <FooterLink href='/adc' title='Advertise' />
          <FooterLink href='/developers' title='Developers' />
        </Box>

        <Box display={'flex'} flexWrap={'wrap'} rowGap={0} columnGap={1}>
          <FooterLink href='/t/terms' title='Terms' />
          <FooterLink href='/t/privacy' title='Privacy' />
          <FooterLink href='/about/polices' title='Policy & Safety' />
          <FooterLink
            href='/howyoutubecloneworks'
            title='How YouTube Clone works'
          />
          <FooterLink href='/new' title='Test new features' />
        </Box>

        <Typography variant='caption' color='GrayText'>
          &#169; {new Date().getFullYear()} Youtube Clone
        </Typography>
      </Stack>
    </Stack>
  )
}

export default FullNavbarAside
