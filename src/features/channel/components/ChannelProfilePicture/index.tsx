import { useState, type FC, type ChangeEvent } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '@/store/hooks'

import type {
  ChannelId,
  ChannelName,
  ChannelPictureUrl
} from '@/features/channel/types'
import { useUpdateChannel } from '@/features/channel/hooks'

import Picture from '@/components/ui/Picture'

import { Box, CircularProgress, Tooltip } from '@mui/material'

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'

interface Props {
  id: ChannelId
  name: ChannelName
  pictureUrl: ChannelPictureUrl
}

const ChannelProfilePicture: FC<Props> = ({ id, name, pictureUrl }) => {
  const { isAuth, user } = useAppSelector(state => state.auth)

  const [updateChannelPicture, setUpdateChannelPicture] = useState(false)

  const queryClient = useQueryClient()

  const { mutateUpdateChannel, isPending: updateChannelIsPending } =
    useUpdateChannel()

  const handleUpdateChannelPicture = (event: ChangeEvent<HTMLInputElement>) => {
    const newPicture = event.currentTarget.files?.[0]

    if (newPicture === undefined) return

    const channelData = new FormData()

    channelData.append('picture', newPicture)

    mutateUpdateChannel(channelData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['channelProfile'] })
      }
    })
  }

  const handleShowUpdateChannelPicture = (value: boolean) => {
    if (isAuth && user?.currentChannel.id === id) setUpdateChannelPicture(value)
  }

  return (
    <Box
      position='relative'
      onMouseEnter={() => handleShowUpdateChannelPicture(true)}
      onMouseLeave={() => handleShowUpdateChannelPicture(false)}
    >
      {updateChannelPicture && !updateChannelIsPending && (
        <Tooltip title='Edit profile picture'>
          <Box
            component='label'
            width='100%'
            height='100%'
            display='grid'
            position='absolute'
            top={0}
            left={0}
            zIndex={2}
            sx={{ placeContent: 'center', cursor: 'pointer', opacity: 0.8 }}
          >
            <Box
              p={1.5}
              borderRadius='99px'
              bgcolor='background.paper'
              display='inline-flex'
            >
              <CameraAltOutlinedIcon />
            </Box>

            <input
              style={{ display: 'none' }}
              type='file'
              accept='image/png, image/jpeg, image/webp'
              onChange={handleUpdateChannelPicture}
            />
          </Box>
        </Tooltip>
      )}

      {updateChannelIsPending && (
        <CircularProgress
          size='160px'
          color='inherit'
          sx={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
        />
      )}

      <Picture
        name={name}
        src={pictureUrl}
        sx={{ width: '160px', height: '160px', fontSize: '4rem' }}
      />
    </Box>
  )
}

export default ChannelProfilePicture
