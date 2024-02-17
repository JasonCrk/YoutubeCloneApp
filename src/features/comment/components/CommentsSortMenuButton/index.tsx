import { useState, type FC } from 'react'

import { VideoCommentsSortBy } from '@/features/comment/types'

import { Button, Menu, MenuItem, Tooltip } from '@mui/material'

import NotesIcon from '@mui/icons-material/Notes'

interface Props {
  sortSelected: VideoCommentsSortBy
  onSelectSortBy: (sortBy: VideoCommentsSortBy) => void
}

const CommentsSortMenuButton: FC<Props> = ({
  sortSelected,
  onSelectSortBy
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSelectSortByComments = (sortBy: VideoCommentsSortBy) => {
    onSelectSortBy(sortBy)
    handleCloseMenu()
  }

  return (
    <div>
      <Tooltip title='Sort comments' placement='bottom'>
        <Button
          startIcon={<NotesIcon />}
          onClick={handleOpenMenu}
          variant='text'
          sx={{ px: 2, py: 1, borderRadius: '99px' }}
        >
          Sort by
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{ paper: { sx: { backgroundColor: 'background.paper' } } }}
      >
        <MenuItem
          onClick={() =>
            handleSelectSortByComments(VideoCommentsSortBy.TOP_COMMENTS)
          }
          sx={{
            backgroundColor:
              sortSelected === VideoCommentsSortBy.TOP_COMMENTS
                ? 'grey'
                : 'transparent'
          }}
        >
          Top comments
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleSelectSortByComments(VideoCommentsSortBy.NEWEST_FIRST)
          }
          sx={{
            backgroundColor:
              sortSelected === VideoCommentsSortBy.NEWEST_FIRST
                ? 'grey'
                : 'transparent'
          }}
        >
          Newest first
        </MenuItem>
      </Menu>
    </div>
  )
}

export default CommentsSortMenuButton
