import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import {
  createVideoMockData,
  createVideoMockEndpoint
} from '@/features/video/mocks/api'

import UploadVideoModalProvider from '@/features/video/contexts/UploadVideoModal/Provider'

import { render } from '@/utils/testing/render'
import toast from 'react-hot-toast'

const server = setupServer(createVideoMockEndpoint)

const IMAGE_LOCAL_URL = 'http://127.0.0.1:5050/image.png'

global.URL.createObjectURL = vi.fn().mockReturnValue(IMAGE_LOCAL_URL)

const successToastSpy = vi.spyOn(toast, 'success')

describe('<UploadVideoModal />', () => {
  beforeAll(() => server.listen())

  afterEach(() => {
    cleanup()
    server.resetHandlers()
    successToastSpy.mockClear()
  })

  afterAll(() => server.close())

  it('Should render component', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    expect(screen.queryByTestId('UploadVideoModal')).toBeInTheDocument()
  })

  it('Should the title video input has the name attribute', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoTitleInput = screen.queryByLabelText(/^title/i)
    expect(videoTitleInput).toHaveAttribute('name', 'title')
  })

  it('Should the title video input has the type attribute equal to text', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoTitleInput = screen.queryByLabelText(/^title/i)
    expect(videoTitleInput).toHaveAttribute('type', 'text')
  })

  it('Should the description video textarea has the name attribute', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoDescriptionTextarea = screen.queryByLabelText(/^description/i, {
      selector: 'textarea'
    })
    expect(videoDescriptionTextarea).toHaveAttribute('name', 'description')
  })

  it('Should contain a VideoThumbnailField component', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoThumbnailField = screen.queryByTestId('VideoThumbnailField')
    expect(videoThumbnailField).toBeInTheDocument()
  })

  it('Should contain a VideoField component', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoField = screen.queryByTestId('VideoField')
    expect(videoField).toBeInTheDocument()
  })

  it('Should contain a submit button', () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const videoField = screen.queryByRole('button', { name: /^upload$/i })

    expect(videoField).toHaveAttribute('type', 'submit')
  })

  it('Should show a success toast if the user submits the video data successfully', async () => {
    render(
      <UploadVideoModalProvider defaultStates={{ isOpen: true }}>
        <></>
      </UploadVideoModalProvider>
    )

    const user = userEvent.setup()

    const videoTitleInput = screen.getByLabelText(/^title/i)
    const videoDescriptionInput = screen.getByLabelText(/^description/i, {
      selector: 'textarea'
    })
    const videoThumbnailInput = screen.getByLabelText('')
    const videoInput = screen.getByLabelText(/^video no seleccionado/i)

    await user.type(videoTitleInput, createVideoMockData.title)
    await user.type(videoDescriptionInput, createVideoMockData.description!)
    await user.upload(videoThumbnailInput, createVideoMockData.thumbnail)
    await user.upload(videoInput, createVideoMockData.video)

    const submitButton = screen.getByRole('button', { name: /^upload$/i })

    await user.click(submitButton)

    expect(successToastSpy).toHaveBeenCalledOnce()
  })
})
