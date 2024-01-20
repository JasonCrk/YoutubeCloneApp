import { FC } from 'react'

import { ChannelPictureUrl } from '@/features/channel/types'

import { Avatar, AvatarProps } from '@mui/material'

import { initialsOfString } from '@/utils/stringFormats'

interface Props extends Omit<AvatarProps<'div'>, 'alt' | 'src'> {
  src: ChannelPictureUrl
  name: string
}

const Picture: FC<Props> = ({ src, name, sx, ...avatarProps }) => {
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
      src={src}
      alt={name}
      {...avatarProps}
    />
  )
}

export default Picture
