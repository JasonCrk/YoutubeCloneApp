import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import { authStateMock } from '@/mocks/store'
import {
  ownChannelsMockResponse,
  retrieveOwnChannelsMockEndpoint
} from '@/features/channel/mocks/api'

import SwitchAccountOptionsMenu from '@/features/channel/components/SwitchAccountOptionsMenu'

import { render } from '@/utils/testing/render'

const server = setupServer(retrieveOwnChannelsMockEndpoint)

describe('<SwitchAccountOptionsMenu />', () => {
  const onChangeMenuMock = vi.fn()

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    onChangeMenuMock.mockClear()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('Should render component', () => {
    render(<SwitchAccountOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    expect(screen.queryByTestId('SwitchAccountOptionsMenu')).toBeInTheDocument()
  })

  it('Should contain a icon button', () => {
    render(<SwitchAccountOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const backButton = screen.queryByRole('button')

    expect(backButton).toBeInTheDocument()
  })

  it('Should call the onChangeMenu function prop if user click in the icon button', async () => {
    render(<SwitchAccountOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const user = userEvent.setup()

    const backButton = screen.getByRole('button')

    await user.click(backButton)

    expect(onChangeMenuMock).toHaveBeenCalledOnce()
  })

  it("Shouldn't show the channels if the fetching has not finished loading the channels", () => {
    render(<SwitchAccountOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const notLoadingChannels = screen.queryAllByTestId('SelectedChannelItem')

    expect(notLoadingChannels).toHaveLength(0)
  })

  it('Should show the channels if the fetching has finished loading the channels', async () => {
    render(<SwitchAccountOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const channels = await screen.findAllByTestId('SelectChannelItem')

    expect(channels).toHaveLength(ownChannelsMockResponse.data.length)
  })
})
