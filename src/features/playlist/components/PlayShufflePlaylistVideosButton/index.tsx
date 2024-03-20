import type { FC } from 'react'

import Button from '@/components/ui/Button'

import ShuffleIcon from '@mui/icons-material/Shuffle'

import { grey } from '@mui/material/colors'

const PlayShufflePlaylistVideosButton: FC = () => {
  return (
    <Button
      startIcon={<ShuffleIcon />}
      variant='solid'
      bgcolor={grey[800]}
      sx={{
        flexGrow: 1,
        gap: 1,
        py: 0.75,
        lineHeight: 0.9,
        '&:hover': {
          bgcolor: grey[700]
        }
      }}
    >
      Shuffle
    </Button>
  )
}

export default PlayShufflePlaylistVideosButton
