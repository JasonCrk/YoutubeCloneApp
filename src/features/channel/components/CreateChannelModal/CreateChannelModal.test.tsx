import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import CreateChannelModalProvider from '@/features/channel/contexts/CreateChannelModal/Provider'

import { mockCreateChannelData } from '@/features/channel/mocks/api/requests'

import {
  createChannelMockEndpoint,
  createChannelMockResponse
} from '@/features/channel/mocks/api'

import { render } from '@/utils/testing/render'

import toast from 'react-hot-toast'

const server = setupServer(createChannelMockEndpoint)

describe('<CreateChannelModal />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    cleanup()
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('Should show modal if the modal is open', () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    expect(screen.queryByTestId('CreateChannelModal')).toBeInTheDocument()
  })

  it("Shouldn't show modal if the modal is not open", () => {
    render(
      <CreateChannelModalProvider>
        <></>
      </CreateChannelModalProvider>
    )

    expect(screen.queryByTestId('CreateChannelModal')).toBeNull()
  })

  it('Should the input channel name has a name attribute', () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const inputChannelName = screen.queryByRole('textbox', { name: /^name$/i })
    expect(inputChannelName).toHaveAttribute('name', 'name')
  })

  it('Should the input channel name has a type attribute equals to text', () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const inputChannelName = screen.queryByRole('textbox', { name: /^name$/i })
    expect(inputChannelName).toHaveAttribute('type', 'text')
  })

  it('Should the submit button has a type attribute equals to submit', () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const submitButton = screen.queryByRole('button', {
      name: /^create channel$/i
    })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('Should disable the submit button if the user submits the form data successfully', async () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const user = userEvent.setup()

    const inputChannelName = screen.getByRole('textbox', { name: /^name$/i })

    await user.type(inputChannelName, mockCreateChannelData.name)

    const submitButton = screen.getByRole('button', {
      name: /^create channel$/i
    })

    user.click(submitButton)

    await waitFor(() => {
      const submitButtonDisabled = screen.getByRole('button', {
        name: /^create channel$/i
      })
      return expect(submitButtonDisabled).toBeDisabled()
    })
  })

  it('Should the invalidQueries has been called if the channel has been created successfully', async () => {
    const { queryClient } = render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const user = userEvent.setup()

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const inputChannelName = screen.getByRole('textbox', { name: /^name$/i })

    await user.type(inputChannelName, mockCreateChannelData.name)

    const submitButton = screen.getByRole('button', {
      name: /^create channel$/i
    })

    await user.click(submitButton)

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['ownChannels']
    })
  })

  it('Should show a success toast if the channel has been created successfully', async () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const user = userEvent.setup()

    const successToastSpy = vi.spyOn(toast, 'success')

    const inputChannelName = screen.getByRole('textbox', { name: /^name$/i })

    await user.type(inputChannelName, mockCreateChannelData.name)

    const submitButton = screen.getByRole('button', {
      name: /^create channel$/i
    })

    await user.click(submitButton)

    expect(successToastSpy).toBeCalledWith(createChannelMockResponse.message, {
      duration: 2000,
      position: 'bottom-left'
    })
  })

  it('Should close the modal if the channel has been created successfully', async () => {
    render(
      <CreateChannelModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </CreateChannelModalProvider>
    )

    const user = userEvent.setup()

    const inputChannelName = screen.getByRole('textbox', { name: /^name$/i })

    await user.type(inputChannelName, mockCreateChannelData.name)

    const submitButton = screen.getByRole('button', {
      name: /^create channel$/i
    })

    await user.click(submitButton)

    const createChannelModal = screen.queryByTestId('CreateChannelModal')

    expect(createChannelModal).toBeNull()
  })
})
