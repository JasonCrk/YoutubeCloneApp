import { styled, ButtonBase, ButtonBaseProps } from '@mui/material'

interface UISubscribeButtonProps extends ButtonBaseProps {
  isSubscribed: boolean
}

export const UiSubscribeButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== 'isSubscribed'
})<UISubscribeButtonProps>(({ theme, isSubscribed }) => ({
  padding: '10px 18px',
  borderRadius: '999px',
  fontSize: '0.9rem',
  fontFamily: 'Youtube',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
  ...(isSubscribed
    ? {
        backgroundColor: theme.palette.grey[900],
        fontWeight: 600,
        ':hover': {
          backgroundColor: theme.palette.grey[800]
        }
      }
    : {
        backgroundColor: 'white',
        fontWeight: 600,
        color: 'black',
        ':hover': {
          backgroundColor: theme.palette.grey[300]
        }
      })
}))
