import { useState, type FC } from 'react'

import { OptionsMenuTypes } from '@/features/channel/models'

import MainOptionsMenu from '@/features/channel/components/MainOptionsMenu'
import SwitchAccountOptionsMenu from '@/features/channel/components/SwitchAccountOptionsMenu'

import SignOutMenuOption from '@/features/auth/components/SignOutMenuOption'

import { Menu as MaterialMenu } from '@mui/material'

interface Props {
  anchorEl: null | HTMLElement
  onClose: () => void
}

const Menu: FC<Props> = ({ anchorEl, onClose }) => {
  const [menu, setMenu] = useState<OptionsMenuTypes>('main')

  const handleCloseMenu = () => {
    onClose()
    setTimeout(() => {
      setMenu('main')
    }, 226)
  }

  const handleChangeMenu = (menuType: OptionsMenuTypes) => setMenu(menuType)

  return (
    <MaterialMenu
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
      {menu === 'main' ? (
        <MainOptionsMenu onChangeMenu={handleChangeMenu} />
      ) : menu === 'switch-account' ? (
        <SwitchAccountOptionsMenu onChangeMenu={handleChangeMenu} />
      ) : null}

      <SignOutMenuOption />
    </MaterialMenu>
  )
}

export default Menu
