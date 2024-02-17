import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useLazyLoad } from '@/hooks'

import type { VideoDetailsAdapter } from '@/features/video/models'

import ChannelInfo from '@/features/channel/components/ChannelInfo'
import SubscribeButton from '@/features/subscription/components/SubscribeButton'
import LikeAndDislikeVideoButtons from '@/features/video/components/LikeAndDislikeVideoButtons'
import VideoCommentsSection from '@/features/comment/components/VideoCommentsSection'

import { Box, Typography } from '@mui/material'

import { getTimeAgo } from '@/utils/datetimeFormats'

interface Props {
  video: VideoDetailsAdapter
}

const VideoSection: FC<Props> = ({ video }) => {
  const queryClient = useQueryClient()

  const [ref, isVisible] = useLazyLoad()

  return (
    <Box>
      <Typography component='h3' variant='h5' fontWeight='bold' mt={0.5}>
        {video.title}
      </Typography>

      <Box display='flex' justifyContent='space-between' py={1}>
        <Box display='flex' alignItems='center' gap={3}>
          <ChannelInfo channel={video.channel} />
          <SubscribeButton
            channelId={video.channel.id}
            subscribed={video.channel.subscribed}
            onSuccessfulSubscription={() =>
              queryClient.invalidateQueries({
                queryKey: ['watchVideo', video.id]
              })
            }
          />
        </Box>

        <Box display='flex' gap={1} alignItems='center'>
          <LikeAndDislikeVideoButtons
            videoId={video.id}
            totalDislikes={video.totalDislikes}
            totalLikes={video.totalLikes}
            isDislike={video.isDislike}
            isLike={video.isLike}
          />
        </Box>
      </Box>

      <Box bgcolor='background.paper' borderRadius='10px' p={2}>
        <Typography component='p' variant='body2' fontWeight='bold' mb={0.5}>
          {video.totalViews} views {getTimeAgo(video.publicationDate)}
        </Typography>

        <Typography component='p' variant='body1'>
          {video.description}
        </Typography>
      </Box>

      <div ref={ref}>
        {isVisible && (
          <VideoCommentsSection
            videoId={video.id}
            totalComments={video.totalComments}
          />
        )}
      </div>
    </Box>
  )
}

export default VideoSection
