import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'

import { CurrentChannelAdapter } from '@/features/channel/models'
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

interface Props {
  channel: CurrentChannelAdapter
  anchorEl: null | HTMLElement
  onClose: () => void
}

const ChannelOptionsMenu: FC<Props> = ({ anchorEl, channel, onClose }) => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    removeAccessTokenFromLocalStorage()
    removeRefreshTokenFromLocalStorage()
    window.location.reload()
    dispatch(logout())
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
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
        <Picture name={channel.name} src={channel.pictureUrl} />

        <Box>
          <div style={{ marginBottom: 6 }}>
            <Typography component='p' variant='body1' title={channel.name}>
              {channel.name}
            </Typography>

            <Typography
              component='p'
              variant='body1'
              title={'@' + channel.handle}
            >
              @{channel.handle}
            </Typography>
          </div>

          <Typography
            component={Link}
            to={`/@${channel.handle}`}
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
  )
}

export default ChannelOptionsMenu
