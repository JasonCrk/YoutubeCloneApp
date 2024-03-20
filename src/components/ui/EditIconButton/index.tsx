import type { FC } from 'react'

import {
  Tooltip,
  IconButton,
  type TooltipProps,
  type IconButtonProps
} from '@mui/material'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

interface Props extends Omit<IconButtonProps, 'children'> {
  tooltipProps: Omit<TooltipProps, 'children'>
}

const EditIconButton: FC<Props> = ({ tooltipProps, ...iconButtonProps }) => {
  return (
    <Tooltip {...tooltipProps} placement='left'>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
        {...iconButtonProps}
      >
        <EditOutlinedIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  )
}

export default EditIconButton
