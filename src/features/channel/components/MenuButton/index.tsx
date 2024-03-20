import { type FC, type MouseEvent, useState } from 'react'

import { useAppSelector } from '@/store/hooks'

import Picture from '@/components/ui/Picture'

import Menu from '@/features/channel/components/Menu'

const MenuButton: FC = () => {
  const user = useAppSelector(state => state.auth.user)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleCloseMenu = () => setAnchorEl(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  if (!user) return null

  return (
    <div data-testid='MenuButton'>
      <Picture
        name={user.currentChannel.name}
        src={user.currentChannel.pictureUrl}
        onClick={handleOpenMenu}
        sx={{
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          ':active': {
            outlineWidth: '2px',
            outlineColor: 'primary.main',
            outlineStyle: 'solid'
          }
        }}
      />

      <Menu anchorEl={anchorEl} onClose={handleCloseMenu} />
    </div>
  )
}

export default MenuButton
