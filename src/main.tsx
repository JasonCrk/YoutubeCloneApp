import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'

import { Provider } from 'react-redux'

import { router } from './router'

import { setupStore } from './store'

import { theme } from '@theme/index'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <GlobalStyles
      styles={{
        '&::-webkit-scrollbar': {
          width: '16px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#CCC',
          borderRadius: '25px',
          backgroundClip: 'content-box',
          border: '4px solid transparent'
        },
        '&': {
          scrollBehavior: 'smooth'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <Provider store={setupStore()}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
