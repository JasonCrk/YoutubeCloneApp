import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { router } from './router'

import { theme } from '@theme/index'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
