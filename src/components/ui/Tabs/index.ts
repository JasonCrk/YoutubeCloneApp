import { Tabs as MaterialTabs, styled } from '@mui/material'

export const Tabs = styled(MaterialTabs)(() => ({
  '.MuiTabs-flexContainer': {
    gap: '25px'
  },
  '.MuiTabs-indicator': {
    backgroundColor: 'white',
    width: 'fit-content',
    height: '2.5px'
  }
}))
