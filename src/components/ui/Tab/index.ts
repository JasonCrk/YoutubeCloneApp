import { Tab as MaterialTab, styled } from '@mui/material'

export const Tab = styled(MaterialTab)(() => ({
  paddingRight: 0,
  paddingLeft: 0,
  textTransform: 'none',
  color: 'grey',
  minWidth: 'fit-content',
  fontSize: '1rem',
  borderBottom: '2.5px solid transparent',
  '&.Mui-selected': {
    color: 'white'
  },
  ':hover': {
    borderBottom: '2.5px solid grey'
  }
}))
