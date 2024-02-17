import { useState, type FC } from 'react'

import type { CommentId } from '@/features/comment/types'

import type { VideoId } from '@/features/video/types'

import CommentOptionsMenu from '@/features/comment/components/CommentOptionsMenu'

import { IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  commentId: CommentId
  setIsEditing: (value: boolean) => void
  commentParentId: CommentId | VideoId
  isVideoComment?: boolean
}

const CommentOptionsMenuButton: FC<Props> = ({
  commentId,
  setIsEditing,
  commentParentId,
  isVideoComment
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>

      <CommentOptionsMenu
        anchorEl={anchorEl}
        isOpen={open}
        onClose={handleCloseMenu}
        commentId={commentId}
        setIsEditing={setIsEditing}
        commentParentId={commentParentId}
        isVideoComment={isVideoComment}
      />
    </div>
  )
}

export default CommentOptionsMenuButton
