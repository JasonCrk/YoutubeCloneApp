import type { FC, MouseEvent, ReactNode } from 'react'

import { ButtonBase, Tooltip, type TooltipProps } from '@mui/material'

interface Props {
  icon: ReactNode
  padding?: number | string
  tooltipTitle: string
  tooltipPlacement?: TooltipProps['placement']
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const VideoPlayerControl: FC<Props> = ({
  icon,
  tooltipTitle,
  tooltipPlacement,
  padding,
  onClick
}) => {
  return (
    <Tooltip
      title={tooltipTitle}
      placement={tooltipPlacement ?? 'top'}
      slotProps={{
        tooltip: { sx: { backgroundColor: 'background.paper' } },
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -8]
              }
            }
          ]
        }
      }}
    >
      <ButtonBase
        disableTouchRipple
        sx={{ padding: padding ?? 1 }}
        onClick={onClick}
      >
        {icon}
      </ButtonBase>
    </Tooltip>
  )
}
