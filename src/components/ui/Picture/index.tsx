import { FC } from 'react'

import { ChannelPictureUrl } from '@/features/channel/types'

import { Avatar, AvatarProps } from '@mui/material'

import { initialsOfString } from '@/utils/stringFormats'
import { DEFAULT_CHANNEL_PICTURE_URL } from '@/features/channel/constants'

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
        sx={{ aspectRatio: 1 / 1, ...sx }}
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
        sx={{ aspectRatio: 1 / 1, ...sx }}
        {...avatarProps}
      >
        {nameAcronym}
      </Avatar>
    )
  }

  return (
    <Avatar
      data-testid='Picture'
      sx={{ aspectRatio: 1 / 1, ...sx }}
      src={defaultPicture ? DEFAULT_CHANNEL_PICTURE_URL : src}
      alt={name}
      {...avatarProps}
    />
  )
}

export default Picture
