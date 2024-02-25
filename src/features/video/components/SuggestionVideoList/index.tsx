import type { FC } from 'react'

import type { VideoId } from '@/features/video/types'

import { useFetchSuggestionVideos } from '@/features/video/hooks'

import SuggestionVideoItem from '@/features/video/components/SuggestionVideoItem'

import { Box, CircularProgress, Stack } from '@mui/material'

import { red } from '@mui/material/colors'

interface Props {
  videoId: VideoId
}

const SuggestionVideoList: FC<Props> = ({ videoId }) => {
  const { suggestionVideos, isLoading, isError, error, isSuccess } =
    useFetchSuggestionVideos(videoId)

  return (
    <Stack data-testid='SuggestionVideoList' spacing={1}>
      {isLoading ? (
        <Box display='flex' justifyContent='center'>
          <CircularProgress color='inherit' />
        </Box>
      ) : isError ? (
        <Box textAlign='center' py={2} color={red[500]}>
          {error.message}
        </Box>
      ) : suggestionVideos?.length === 0 ? (
        <Box textAlign='center' py={2} color='white'>
          Sorry, no suggestion videos found
        </Box>
      ) : isSuccess && suggestionVideos ? (
        suggestionVideos.map(video => (
          <SuggestionVideoItem key={video.id} {...video} />
        ))
      ) : null}
    </Stack>
  )
}

export default SuggestionVideoList
