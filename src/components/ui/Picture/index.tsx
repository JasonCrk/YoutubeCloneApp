import { FC } from 'react'

import type { ChannelPictureUrl } from '@/features/channel/types'
import { DEFAULT_CHANNEL_PICTURE_URL } from '@/features/channel/constants'

import { Avatar, AvatarProps } from '@mui/material'

import { initialsOfString } from '@/utils/stringFormats'

interface Props extends Omit<AvatarProps<'div'>, 'alt' | 'src'> {
  src: ChannelPictureUrl
  name: string
  defaultPicture?: boolean
}

const Picture: FC<Props> = ({
  src,
  name,
  defaultPicture,
  sx,
  ...avatarProps
}) => {
  if (defaultPicture)
    return (
      <Avatar
        data-testid='Picture'
        sx={{ ...sx, aspectRatio: 1 / 1, height: 'fit-content' }}
        src={DEFAULT_CHANNEL_PICTURE_URL}
        alt={name}
        {...avatarProps}
      />
    )

  if (src === null) {
    const nameAcronym = initialsOfString(name).toUpperCase()

    return (
      <Avatar
        data-testid='Picture'
        sx={{ ...sx, aspectRatio: 1 / 1, height: 'fit-content' }}
        {...avatarProps}
      >
        {nameAcronym}
      </Avatar>
    )
  }

  return (
    <Avatar
      data-testid='Picture'
      sx={{ ...sx, aspectRatio: 1 / 1, height: 'fit-content' }}
      src={defaultPicture ? DEFAULT_CHANNEL_PICTURE_URL : src}
      alt={name}
      {...avatarProps}
    />
  )
}

export default Picture
