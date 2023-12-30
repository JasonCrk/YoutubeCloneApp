import { FC } from 'react'

import { SimpleChannelAdapter } from '@/features/channel/models'

import ListItemLinkWrapper from '@/components/ui/ListItemLinkWrapper'
import ListItemTextCustom from '@/components/ui/ListItemTextCustom'
import Picture from '@/components/ui/Picture'

import { ListItemAvatar } from '@mui/material'

const NavbarAsideSubscriptionLink: FC<SimpleChannelAdapter> = ({
  handle,
  name,
  pictureUrl
}) => {
  return (
    <ListItemLinkWrapper
      href={`/@${handle}`}
      testId='NavbarAsideSubscriptionLink'
    >
      {isActive => (
        <>
          <ListItemAvatar sx={{ minWidth: '45px' }}>
            <Picture
              name={name}
              src={pictureUrl}
              sx={{ width: 24, height: 24, fontSize: '1rem' }}
            />
          </ListItemAvatar>
          <ListItemTextCustom content={name} isActive={isActive} />
        </>
      )}
    </ListItemLinkWrapper>
  )
}

export default NavbarAsideSubscriptionLink
