import { useState, type FC } from 'react'

import type { CommentId } from '@/features/comment/types'
import type { VideoId } from '@/features/video/types'

import OptionsMenuIconButton from '@/components/ui/OptionsMenuButton'

import CommentOptionsMenu from '@/features/comment/components/CommentOptionsMenu'

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
    <>
      <OptionsMenuIconButton onClick={handleOpenMenu} />

      <CommentOptionsMenu
        anchorEl={anchorEl}
        isOpen={open}
        onClose={handleCloseMenu}
        commentId={commentId}
        setIsEditing={setIsEditing}
        commentParentId={commentParentId}
        isVideoComment={isVideoComment}
      />
    </>
  )
}

export default CommentOptionsMenuButton
