import { styled, ButtonBaseProps, ButtonBase } from '@mui/material'

interface LikeButtonProps extends ButtonBaseProps {
  isActive: boolean
}

export const UiLikeButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== 'isActive'
})<LikeButtonProps>(({ theme }) => ({
  borderRadius: '99px 0 0 99px',
  color: 'white',
  padding: '8px 15px',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderRight: '2px solid ' + theme.palette.grey[700],
  backgroundColor: theme.palette.grey[900],
  ':hover': {
    backgroundColor: theme.palette.grey[800]
  }
}))

export const UiDislikeButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== 'isActive'
})<LikeButtonProps>(({ theme }) => ({
  borderRadius: '0 99px 99px 0',
  color: 'white',
  padding: '8px 15px 8px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  backgroundColor: theme.palette.grey[900],
  ':hover': {
    backgroundColor: theme.palette.grey[800]
  }
}))
