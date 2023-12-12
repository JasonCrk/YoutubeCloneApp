import { PaletteMode, createTheme } from '@mui/material'

import youTubeBoldFontTtf from '@assets/fonts/youtube-sans-bold.ttf'
import youTubeMediumFontTtf from '@assets/fonts/youtube-sans-medium.ttf'
import youTubeLightFontTtf from '@assets/fonts/youtube-sans-light.ttf'

import { grey } from '@mui/material/colors'

const colorMode: PaletteMode = 'dark'

export const theme = createTheme({
  palette: {
    mode: colorMode,
    ...(colorMode === 'dark'
      ? {
          background: {
            default: '#0F0F0F',
            paper: '#212121'
          },
          text: {
            primary: '#FFF',
            secondary: '#CACACA'
          },
          common: {
            white: '#fff',
            black: '#000'
          }
        }
      : {
          background: {
            default: '#fff',
            paper: '#fff'
          },
          common: {
            white: '#fff',
            black: '#000'
          },
          text: {
            primary: '#000',
            secondary: '#383838'
          }
        })
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", "YouTube", sans-serif`
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "YouTube";
          font-style: bold,
          font-weight: bold,
          font-display: swap;
          font-stretch: 1% 500%;
          src: url(${youTubeBoldFontTtf} format('ttf'));
        }

        @font-face {
          font-family: "YouTube";
          font-style: normal,
          font-weight: normal,
          font-display: swap;
          font-stretch: 1% 500%;
          src: url(${youTubeMediumFontTtf} format('ttf'));
        }

        @font-face {
          font-family: "YouTube";
          font-style: normal,
          font-weight: lighter,
          font-display: swap;
          font-stretch: 1% 500%;
          src: url(${youTubeLightFontTtf} format('ttf'));
        }
      `
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined', color: 'inherit' },
          style: {
            border: `1px solid ${grey[800]}`,
            color: grey[400]
          }
        }
      ]
    }
  }
})
