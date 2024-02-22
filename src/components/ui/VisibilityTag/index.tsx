import type { FC } from 'react'

import { Visibility } from '@/models/types'

import { Box } from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'

interface Props {
  visibility: Visibility
}

const VisibilityTag: FC<Props> = ({ visibility }) => {
  if (visibility === Visibility.PUBLIC) return null

  return (
    <Box
      py={0.4}
      px={0.9}
      bgcolor='background.paper'
      display='flex'
      borderRadius={'5px'}
      gap={0.5}
      color='grey'
      fontSize='0.8rem'
      alignItems='center'
      width='fit-content'
    >
      {Visibility.ONLY_URL ? (
        <>
          <LinkOutlinedIcon fontSize='small' />
          <span>Only url</span>
        </>
      ) : (
        <>
          <LockOutlinedIcon fontSize='small' />
          <span>Private</span>
        </>
      )}
    </Box>
  )
}

export default VisibilityTag
