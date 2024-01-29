import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NavbarAsideIconLink from '@/components/ui/NavbarAsideIconLink'

import { render } from '@/utils/testing/render'

import Icon from '@mui/icons-material/Abc'

import { useNavigate } from 'react-router-dom'

const ACTIVE_ICON_ID = 'activeIcon'
const NO_ACTIVE_ICON_ID = 'noActiveIcon'

describe('<NavbarAsideIconLink />', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(actual as any),
      useNavigate: vi.fn()
    }
  })

  const useNavigateMock = vi.mocked(useNavigate)

  afterEach(cleanup)

  it('Should render the component', () => {
    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href='/'
      />
    )

    const iconLink = screen.queryByTestId('NavbarAsideIconLink')
    expect(iconLink).toBeInTheDocument()
  })

  it('Should contain the title prop like text content', () => {
    const title = 'test'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon />}
        noActiveIcon={<Icon />}
        title={title}
        href='/'
      />
    )

    const titleContent = screen.queryByText(title)
    expect(titleContent).toBeInTheDocument()
  })

  it('Should contain a link', () => {
    render(
      <NavbarAsideIconLink
        activeIcon={<Icon />}
        noActiveIcon={<Icon />}
        title='test'
        href='/'
      />
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  it('Should the link has a href attribute equal to the href prop', () => {
    const href = '/test'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon />}
        noActiveIcon={<Icon />}
        title='test'
        href={href}
      />
    )

    const link = screen.queryByRole('link')
    expect(link).toHaveAttribute('href', href)
  })

  it('Should show the active icon when the pathname is equal to the href prop', () => {
    const pathname = '/'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href={pathname}
      />,
      {
        routerOptions: {
          initialEntries: [pathname]
        }
      }
    )

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).toBeInTheDocument()
  })

  it('Should navigate to the path indicated by the href prop if the user clicks on it', async () => {
    const pathname = '/test'

    const navigateMock = vi.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href={pathname}
      />,
      {
        routerOptions: {
          initialEntries: ['/']
        }
      }
    )

    const user = userEvent.setup()

    const link = screen.getByRole('link')

    await user.click(link)

    expect(navigateMock).toHaveBeenCalledOnce()
    expect(navigateMock).toHaveBeenCalledWith(pathname)
  })

  it("Shouldn't show the active icon when the pathname is not equal to the href prop", () => {
    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href={'/'}
      />,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).toBeNull()
  })

  it('Should show the no active icon when the pathname is not equal to the href prop', () => {
    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href={'/'}
      />,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const noActiveIcon = screen.queryByTestId(NO_ACTIVE_ICON_ID)
    expect(noActiveIcon).toBeInTheDocument()
  })

  it("Shouldn't show the no active icon when then pathname is equal to the href prop", () => {
    const pathname = '/'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<Icon data-testid={NO_ACTIVE_ICON_ID} />}
        title='test'
        href={pathname}
      />,
      {
        routerOptions: {
          initialEntries: [pathname]
        }
      }
    )

    const noActiveIcon = screen.queryByTestId(NO_ACTIVE_ICON_ID)
    expect(noActiveIcon).toBeNull()
  })
})
