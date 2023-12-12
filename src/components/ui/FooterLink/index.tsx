import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Typography } from '@mui/material'

interface Props {
  href: string
  title: string
}

const FooterLink: FC<Props> = ({ href, title }) => {
  return (
    <Typography
      component={Link}
      to={href}
      sx={{ textDecoration: 'none', fontSize: '0.8rem' }}
      fontWeight={'bold'}
      color='grey.500'
    >
      {title}
    </Typography>
  )
}

export default FooterLink
