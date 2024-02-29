import type { FC, ReactNode } from 'react'

import { ListItem, ListItemButton, ListItemButtonProps } from '@mui/material'

interface Props extends ListItemButtonProps {
  children: ReactNode
  testId?: string
}

const ListItemWrapper: FC<Props> = ({ children, testId, ...props }) => {
  return (
    <ListItem disablePadding data-testid={testId}>
      <ListItemButton
        {...props}
        sx={{
          borderRadius: '8px',
          backgroundColor: 'background.default',
          ':hover': {
            backgroundColor: 'background.paper'
          }
        }}
      >
        {children}
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemWrapper
