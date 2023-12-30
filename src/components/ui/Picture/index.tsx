import { FC } from 'react'

import { ChannelPictureUrl } from '@/features/channel/types'

import { Avatar, AvatarProps } from '@mui/material'

import { initialsOfString } from '@/utils/stringFormats'

interface Props extends Omit<AvatarProps<'div'>, 'alt' | 'src'> {
  src: ChannelPictureUrl
  name: string
}

const Picture: FC<Props> = ({ src, name, ...avatarProps }) => {
  const nameAcronym = initialsOfString(name).toUpperCase()

  if (src === null)
    return (
      <Avatar data-testid='Picture' {...avatarProps}>
        {nameAcronym}
      </Avatar>
    )

  return <Avatar data-testid='Picture' src={src} alt={name} {...avatarProps} />
}

export default Picture
