import type { FC } from 'react'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const OptionsMenuIconButton: FC<IconButtonProps> = props => {
  return (
    <IconButton {...props}>
      <MoreVertIcon htmlColor='white' />
    </IconButton>
  )
}

export default OptionsMenuIconButton
