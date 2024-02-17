import { InputBase, styled } from '@mui/material'

export const CommentContentInput = styled(InputBase)(
  ({ theme, fullWidth }) => ({
    borderBottomColor: theme.palette.grey[800],
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    width: fullWidth ? '100%' : 'fit-content',
    fontSize: '0.9rem',
    transition: 'border-bottom-color 200ms ease-in-out',
    '&.Mui-focused': {
      borderBottomColor: 'white'
    }
  })
)
