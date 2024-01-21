import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import { OptionsMenuTypes } from '@/features/channel/types'

import Picture from '@/components/ui/Picture'
import MenuItem from '@/components/ui/MenuItem'

import { Box, Divider, Typography } from '@mui/material'

import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  onChangeMenu: (menu: OptionsMenuTypes) => void
}

const MainOptionsMenu: FC<Props> = ({ onChangeMenu }) => {
  const channel = useAppSelector(state => state.auth.user!.currentChannel)

  const handleChangeMenuToSwitchAccount = () => onChangeMenu('switch-account')

  return (
    <div data-testid='MainOptionsMenu'>
      <Box display={'flex'} gap={2} px={2} py={1}>
        <Picture name={channel.name} src={channel.pictureUrl} />

        <Box>
          <div style={{ marginBottom: 6 }}>
            <Typography component='p' variant='body1' title={channel.name}>
              {channel.name}
            </Typography>

            <Typography component='p' variant='body1' title={channel.handle}>
              {channel.handle}
            </Typography>
          </div>

          <Typography
            component={Link}
            to={`/${channel.handle}`}
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
        startIcon={<SwitchAccountOutlinedIcon />}
        endIcon={<ArrowForwardIosIcon fontSize='small' />}
        onClick={handleChangeMenuToSwitchAccount}
      >
        Switch account
      </MenuItem>
    </div>
  )
}

export default MainOptionsMenu
