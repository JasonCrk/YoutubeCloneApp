import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'

import { Provider } from 'react-redux'

import { router } from './router'

import { store } from './store'

import { theme } from '@/theme/index'
import { globalStyles } from '@/theme/globalStyles'

import { Toaster } from 'react-hot-toast'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position='bottom-left' />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
