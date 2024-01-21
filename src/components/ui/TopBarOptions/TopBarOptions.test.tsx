import { cleanup, screen } from '@testing-library/react'

import { authStateMock, notAuthStateMock } from '@/mocks/store'

import TopBarOptions from '@/components/ui/TopBarOptions'

import { render } from '@/utils/testing/render'

describe('<TopBarOptions />', () => {
  afterEach(cleanup)

  it('Should show the menu button component if the user is authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const menuButton = screen.queryByTestId('MenuButton')
    expect(menuButton).toBeInTheDocument()
  })

  it("Shouldn't show the menu button component if the user is not authenticated", () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const menuButton = screen.queryByTestId('MenuButton')
    expect(menuButton).toBeNull()
  })

  it('Should show the upload video button component if the user is authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const uploadVideoButton = screen.queryByTestId('UploadVideoButton')
    expect(uploadVideoButton).toBeInTheDocument()
  })

  it("Shouldn't show the upload video button component if the user is not authenticated", () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const uploadVideoButton = screen.queryByTestId('UploadVideoButton')
    expect(uploadVideoButton).toBeNull()
  })

  it('Should show the sign in button component if the user is not authenticated', () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const signInButton = screen.queryByTestId('SignInButton')
    expect(signInButton).toBeInTheDocument()
  })

  it("Shouldn't show the sign in button component if the user is authenticated", () => {
    render(<TopBarOptions />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const signInButton = screen.queryByTestId('SignInButton')
    expect(signInButton).toBeNull()
  })
})
