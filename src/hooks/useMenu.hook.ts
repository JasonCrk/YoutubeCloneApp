import { type MouseEvent, useState } from 'react'

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onCloseMenu = () => {
    setAnchorEl(null)
  }

  return {
    anchorEl,
    onOpenMenu,
    onCloseMenu
  }
}
