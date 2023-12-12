import { FC } from 'react'

import { Button } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const SignInButton: FC = () => {
  return (
    <Button
      startIcon={<AccountCircleOutlinedIcon />}
      data-testid='signInButton'
      variant='outlined'
      sx={{
        borderRadius: '60px',
        textTransform: 'capitalize'
      }}
    >
      Sign in
    </Button>
  )
}

export default SignInButton
