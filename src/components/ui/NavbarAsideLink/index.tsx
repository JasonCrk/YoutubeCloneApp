import { FC, ReactElement } from 'react'

import { ListItemIcon, TypographyProps } from '@mui/material'

import ListItemLinkWrapper from '@/components/ui/ListItemLinkWrapper'
import ListItemTextCustom from '@/components/ui/ListItemTextCustom'

interface Props {
  activeIcon: ReactElement
  href: string
  title: string
  reverse?: boolean
  noActiveIcon?: ReactElement
  titleProps?: TypographyProps<'span'>
  testId?: string
}

const NavbarAsideLink: FC<Props> = ({
  activeIcon,
  noActiveIcon,
  title,
  href,
  reverse,
  titleProps,
  testId
}) => {
  return (
    <ListItemLinkWrapper testId={testId} href={href}>
      {isActive =>
        reverse ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ListItemTextCustom
              content={title}
              isActive={isActive}
              {...titleProps}
            />
            <ListItemIcon sx={{ minWidth: '45px' }}>
              {isActive ? activeIcon : noActiveIcon ?? activeIcon}
            </ListItemIcon>
          </div>
        ) : (
          <>
            <ListItemIcon sx={{ minWidth: '45px' }}>
              {isActive ? activeIcon : noActiveIcon ?? activeIcon}
            </ListItemIcon>
            <ListItemTextCustom
              content={title}
              isActive={isActive}
              {...titleProps}
            />
          </>
        )
      }
    </ListItemLinkWrapper>
  )
}

export default NavbarAsideLink
