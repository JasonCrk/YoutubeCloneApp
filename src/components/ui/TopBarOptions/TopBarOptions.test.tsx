import { screen } from '@testing-library/react'

import { AuthState } from '@/store/slices/authSlice'

import TopBarOptions from '@/components/ui/TopBarOptions'

import { render } from '@/utils/testing/render'

const isAuthState: AuthState = {
  isAuth: true,
  accessToken: null,
  refreshToken: null,
  user: null
}

const isNotAuthState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null
}

describe('<TopBarOptions />', () => {
  it('Should contain <ChannelOptions /> component when user is authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isAuthState
      }
    })

    const channelOptionsComponent = screen.queryByTestId('ChannelOptions')
    expect(channelOptionsComponent).toBeInTheDocument()
  })

  it('Should not contain <ChannelOptions /> component when user is not authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isNotAuthState
      }
    })

    const channelOptionsComponent = screen.queryByTestId('ChannelOptions')
    expect(channelOptionsComponent).toBeNull()
  })

  it('Should contain <UploadVideoButton /> component when user is authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isAuthState
      }
    })

    const uploadVideoComponent = screen.queryByTestId('UploadVideoButton')
    expect(uploadVideoComponent).toBeInTheDocument()
  })

  it('Should not contain <UploadVideoButton /> component when user is not authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isNotAuthState
      }
    })

    const uploadVideoComponent = screen.queryByTestId('SignInButton')
    expect(uploadVideoComponent).toBeNull()
  })

  it('Should contain a link to open <AuthModal /> when user is not authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isNotAuthState
      }
    })

    const signInButton = screen.queryByTestId('signInButton')
    expect(signInButton).not.toBeNull()
  })

  it('Should not contain a link to open <AuthModal /> when user is authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: isAuthState
      }
    })

    const signInButton = screen.queryByTestId('signInButton')
    expect(signInButton).toBeNull()
  })
})
