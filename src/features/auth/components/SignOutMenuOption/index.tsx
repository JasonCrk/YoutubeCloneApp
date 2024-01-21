import { FC } from 'react'

import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'

import MenuItem from '@/components/ui/MenuItem'

import {
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage
} from '@/features/auth/utils'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const SignOutMenuOption: FC = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    removeAccessTokenFromLocalStorage()
    removeRefreshTokenFromLocalStorage()
    window.location.reload()
    dispatch(logout())
  }

  return (
    <MenuItem
      data-testid='SignOutMenuOption'
      startIcon={<ExitToAppIcon />}
      onClick={handleLogout}
    >
      Sign out
    </MenuItem>
  )
}

export default SignOutMenuOption
