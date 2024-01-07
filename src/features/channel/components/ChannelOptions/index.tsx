import { FC, MouseEvent, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'

import {
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage
} from '@/features/auth/utils'

import Picture from '@/components/ui/Picture'
import MenuItem from '@/components/ui/MenuItem'

import { Box, Divider, Menu, Typography } from '@mui/material'

import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const ChannelOptions: FC = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleCloseMenu = () => setAnchorEl(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const handleLogout = () => {
    removeAccessTokenFromLocalStorage()
    removeRefreshTokenFromLocalStorage()
    window.location.reload()
    dispatch(logout())
  }

  if (!user) return null

  return (
    <div data-testid='ChannelOptions'>
      <Picture
        name={user.currentChannel.name}
        src={user.currentChannel.pictureUrl}
        onClick={handleOpenMenu}
        sx={{
          width: '35px',
          height: '35px',
          aspectRatio: 1 / 1,
          cursor: 'pointer',
          ':active': {
            borderWidth: '2px',
            borderColor: 'primary.main',
            borderStyle: 'solid'
          }
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: '300px',
              backgroundColor: 'background.default',
              mt: 1
            }
          }
        }}
      >
        <Box display={'flex'} gap={2} px={2} py={1}>
          <Picture
            name={user.currentChannel.name}
            src={user.currentChannel.pictureUrl}
          />

          <Box>
            <div style={{ marginBottom: 6 }}>
              <Typography
                component={'p'}
                variant='body1'
                title={user.currentChannel.name}
              >
                {user.currentChannel.name}
              </Typography>

              <Typography
                component={'p'}
                variant='body1'
                title={'@' + user.currentChannel.handle}
              >
                @{user.currentChannel.handle}
              </Typography>
            </div>

            <Typography
              component={RouterLink}
              to={`/@${user.currentChannel.handle}`}
              role='link'
              variant='body2'
              sx={{
                textDecoration: 'none',
                color: 'primary.main'
              }}
            >
              View your channel
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          iconStart={<SwitchAccountOutlinedIcon />}
          iconEnd={<ArrowForwardIosIcon fontSize='small' />}
        >
          Switch account
        </MenuItem>

        <MenuItem iconStart={<ExitToAppIcon />} onClick={handleLogout}>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ChannelOptions
