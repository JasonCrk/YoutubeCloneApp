import type { FC } from 'react'

import { Visibility } from '@/models/types'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

interface Props {
  visibility: Visibility
}

const VisibilityIcon: FC<Props> = ({ visibility }) => {
  if (visibility !== Visibility.PUBLIC)
    return <LockOutlinedIcon fontSize='small' />
}

export default VisibilityIcon
