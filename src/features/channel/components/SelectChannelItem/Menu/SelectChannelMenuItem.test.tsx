import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import * as channelServices from '@/features/channel/services'

import SelectChannelMenuItem from '@/features/channel/components/SelectChannelItem/Menu'

import { switchChannelMockEndpoint } from '@/features/channel/mocks/api'
import { listChannelAdapterMock } from '@/features/channel/mocks/models'

import { render } from '@/utils/testing/render'

const server = setupServer(switchChannelMockEndpoint)

describe('<SelectChannelMenuItem />', () => {
  const setDisabledMock = vi.fn()
  const switchChannelServiceSpy = vi.spyOn(
    channelServices,
    'switchChannelService'
  )

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
    switchChannelServiceSpy.mockClear()
    setDisabledMock.mockClear()
  })

  afterAll(() => {
    server.close()
  })

  it('Should render component', () => {
    render(
      <SelectChannelMenuItem
        {...listChannelAdapterMock}
        setDisabled={setDisabledMock}
        currentChannelId={listChannelAdapterMock.id}
      />
    )

    const menuItem = screen.queryByRole('menuitem')

    expect(menuItem).toBeInTheDocument()

    const selectedChannelItem = menuItem?.querySelector(
      '[data-testid="SelectChannelItem"]'
    )

    expect(selectedChannelItem).toBeInTheDocument()
  })

  it('Should call the switch channel service if the user click the menu item', async () => {
    render(
      <SelectChannelMenuItem
        {...listChannelAdapterMock}
        setDisabled={setDisabledMock}
        currentChannelId={10}
      />
    )

    const user = userEvent.setup()

    const menuItem = screen.getByRole('menuitem')

    await user.click(menuItem)

    expect(switchChannelServiceSpy).toHaveBeenCalledOnce()
  })

  it('Should call the setDisabled function prop if the user click the menu item', async () => {
    render(
      <SelectChannelMenuItem
        {...listChannelAdapterMock}
        setDisabled={setDisabledMock}
        currentChannelId={10}
      />
    )

    const user = userEvent.setup()

    const menuItem = screen.getByRole('menuitem')

    await user.click(menuItem)

    expect(setDisabledMock).toHaveBeenCalledWith(true)
  })

  it("Shouldn't call the switch channel service and the setDisabled function prop if the menu item is disabled", async () => {
    render(
      <SelectChannelMenuItem
        disabled
        {...listChannelAdapterMock}
        setDisabled={setDisabledMock}
        currentChannelId={10}
      />
    )

    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toHaveAttribute('aria-disabled', 'true')
    expect(menuItem).toHaveClass('Mui-disabled')
  })

  it("Shouldn't call the switch channel service and the setDisabled function prop if the current channel is equal to channel id", async () => {
    render(
      <SelectChannelMenuItem
        {...listChannelAdapterMock}
        setDisabled={setDisabledMock}
        currentChannelId={listChannelAdapterMock.id}
      />
    )

    const user = userEvent.setup()

    const menuItem = screen.getByRole('menuitem')

    await user.click(menuItem)

    expect(switchChannelServiceSpy).not.toHaveBeenCalledOnce()
    expect(setDisabledMock).not.toHaveBeenCalledOnce()
  })
})
