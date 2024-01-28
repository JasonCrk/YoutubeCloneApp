import { cleanup, screen } from '@testing-library/react'

import FullNavbarAside from '@/components/ui/NavbarAside/FullNavbarAside'

import { authStateMock, notAuthStateMock } from '@/mocks/store'

import { render } from '@/utils/testing/render'

const AUTH_LINKS_ID = 'authLinks'
const NO_AUTH_LINKS_ID = 'noAuthLinks'
const AUTH_SECTION_ID = 'authSection'
const NO_AUTH_SECTION_ID = 'noAuthSection'

describe('<FullNavbarAside />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<FullNavbarAside />)

    const fullNavbarAside = screen.queryByTestId('FullNavbarAside')
    expect(fullNavbarAside).toBeInTheDocument()
  })

  it('Should show the links for authenticated user when user is authenticated', () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const authLinks = screen.queryByTestId(AUTH_LINKS_ID)
    expect(authLinks).not.toBeNull()
  })

  it("Shouldn't show the links for authenticated user when user is not authenticated", () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const authLinks = screen.queryByTestId(AUTH_LINKS_ID)
    expect(authLinks).toBeNull()
  })

  it('Should show the links for unauthenticated user when user is not authenticated', () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const noAuthLinks = screen.queryByTestId(NO_AUTH_LINKS_ID)
    expect(noAuthLinks).not.toBeNull()
  })

  it("Shouldn't show the links for unauthenticated user when user is authenticated", () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const noAuthLinks = screen.queryByTestId(NO_AUTH_LINKS_ID)
    expect(noAuthLinks).toBeNull()
  })

  it('Should show the section for authenticated user when user is authenticated', () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const authSection = screen.queryByTestId(AUTH_SECTION_ID)
    expect(authSection).not.toBeNull()
  })

  it("Shouldn't show the section for authenticated user when user is not authenticated", () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const authSection = screen.queryByTestId(AUTH_SECTION_ID)
    expect(authSection).toBeNull()
  })

  it('Should show the section for unauthenticated user when user is not authenticated', () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: notAuthStateMock
      }
    })

    const noAuthSection = screen.queryByTestId(NO_AUTH_SECTION_ID)
    expect(noAuthSection).not.toBeNull()
  })

  it("Shouldn't show the section for unauthenticated user when user is authenticated", () => {
    render(<FullNavbarAside />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const noAuthSection = screen.queryByTestId(NO_AUTH_SECTION_ID)
    expect(noAuthSection).toBeNull()
  })
})
