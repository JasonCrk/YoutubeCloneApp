import { ButtonBase, ButtonBaseProps, styled } from '@mui/material'

export interface ButtonWrapperProps extends ButtonBaseProps {
  bgcolor?: string
  variant?: 'solid' | 'ghost'
  disableHoverEffect?: boolean
}

export const ButtonWrapper = styled(ButtonBase, {
  shouldForwardProp: prop =>
    prop !== 'bgcolor' && prop !== 'variant' && prop !== 'disableHoverEffect'
})<ButtonWrapperProps>(
  ({
    theme,
    bgcolor = '#FFFFFF',
    color,
    variant = 'ghost',
    disableHoverEffect
  }) => ({
    borderRadius: '90px',
    fontSize: '0.9rem',
    backgroundColor: variant === 'solid' ? bgcolor : 'transparent',
    padding: '8px 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color ?? 'white',
    gap: 2,
    ...(!disableHoverEffect && {
      ':hover': {
        ...(variant === 'solid'
          ? {
              filter: 'brightness(110%)'
            }
          : {
              backgroundColor: bgcolor + '40'
            })
      }
    }),
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.grey[600]
    }
  })
)
