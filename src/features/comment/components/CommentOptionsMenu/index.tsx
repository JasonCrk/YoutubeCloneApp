import type { FC } from 'react'

import type { CommentId } from '@/features/comment/types'
import { useCommentDeleteConfirmationModalContext } from '@/features/comment/hooks'

import type { VideoId } from '@/features/video/types'

import MenuItem from '@/components/ui/MenuItem'

import { Menu } from '@mui/material'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

interface Props {
  anchorEl: HTMLElement | null
  onClose: () => void
  isOpen: boolean
  commentId: CommentId
  setIsEditing: (isEditing: boolean) => void
  commentParentId: CommentId | VideoId
  isVideoComment?: boolean
}

const CommentOptionsMenu: FC<Props> = ({
  anchorEl,
  isOpen,
  onClose,
  commentId,
  commentParentId,
  isVideoComment,
  setIsEditing
}) => {
  const { onOpen } = useCommentDeleteConfirmationModalContext()

  const onEdit = () => {
    setIsEditing(true)
  }

  const onDelete = () => {
    onOpen(commentParentId, commentId, isVideoComment)
  }

  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      slotProps={{ paper: { sx: { backgroundColor: 'background.paper' } } }}
    >
      <MenuItem startIcon={<EditOutlinedIcon />} onClick={onEdit}>
        Edit
      </MenuItem>
      <MenuItem startIcon={<DeleteOutlinedIcon />} onClick={onDelete}>
        Delete
      </MenuItem>
    </Menu>
  )
}

export default CommentOptionsMenu
