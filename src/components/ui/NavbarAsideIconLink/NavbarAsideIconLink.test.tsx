import { cleanup, screen } from '@testing-library/react'

import NavbarAsideIconLink from '.'

import { render } from '@/utils/testing/render'

import Icon from '@mui/icons-material/Abc'

const ACTIVE_ICON_ID = 'activeIcon'
const NO_ACTIVE_ICON_ID = 'noActiveIcon'

describe('<NavbarAsideIconLink />', () => {
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

  it('Should contain the title prop', () => {
    const title = 'test'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon />}
        noActiveIcon={<Icon />}
        title={title}
        href='/'
      />
    )

    const elementWithTitleContent = screen.queryByText(title)
    expect(elementWithTitleContent).not.toBeNull()
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

  it('Should the link have a href attribute equal to the href prop', () => {
    const href = '/test'

    render(
      <NavbarAsideIconLink
        activeIcon={<Icon />}
        noActiveIcon={<Icon />}
        title='test'
        href={href}
      />
    )

    const link = screen.getByRole('link')
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
    expect(activeIcon).not.toBeNull()
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
    expect(noActiveIcon).not.toBeNull()
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
