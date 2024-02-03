import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import VideoField from '@/features/video/components/VideoField'

import { render } from '@/utils/testing/render'

const MESSAGE_WITHOUT_VIDEO = 'Video no seleccionado'
const ERROR_MESSAGE_TEST_ID = 'videoFieldErrorMessage'

describe('<VideoField />', () => {
  const setValueMock = vi.fn()

  afterEach(() => {
    cleanup()
    setValueMock.mockClear()
  })

  it('Should render component', () => {
    render(<VideoField setValue={setValueMock} />)
    expect(screen.queryByTestId('VideoField')).toBeInTheDocument()
  })

  it('Should the video input has type attribute equal to "file"', () => {
    render(<VideoField setValue={setValueMock} />)

    const videoInput = screen.queryByLabelText(MESSAGE_WITHOUT_VIDEO)
    expect(videoInput).toHaveAttribute('type', 'file')
  })

  it('Should the video input has name attribute', () => {
    render(<VideoField setValue={setValueMock} />)

    const videoInput = screen.queryByLabelText(MESSAGE_WITHOUT_VIDEO)
    expect(videoInput).toHaveAttribute('name', 'video')
  })

  it('Should the video input has accept attribute', () => {
    render(<VideoField setValue={setValueMock} />)

    const videoInput = screen.queryByLabelText(MESSAGE_WITHOUT_VIDEO)
    expect(videoInput).toHaveAttribute('accept', 'video/mp4')
  })

  it("Shouldn't show the error message if the component not receives the errorMessage prop and the error prop", () => {
    render(<VideoField setValue={setValueMock} />)

    const errorMessageElement = screen.queryByTestId(ERROR_MESSAGE_TEST_ID)
    expect(errorMessageElement).toBeNull()
  })

  it('Should show the error message if the component receives the errorMessage prop and the error prop', () => {
    const testErrorMessageContent = 'test error message'

    render(
      <VideoField
        setValue={setValueMock}
        errorMessage={testErrorMessageContent}
      />
    )

    const errorMessageElement = screen.queryByText(ERROR_MESSAGE_TEST_ID)

    expect(errorMessageElement).toHaveTextContent(testErrorMessageContent)
  })

  it("Shouldn't show the message if user select a video", async () => {
    render(<VideoField setValue={setValueMock} />)

    const user = userEvent.setup()

    const videoInput = screen.getByLabelText(MESSAGE_WITHOUT_VIDEO)

    const video = new File(['video'], 'video.mp4', { type: 'video/mp4' })

    await user.upload(videoInput, video)

    const videoInputWithMessage = screen.queryByLabelText(MESSAGE_WITHOUT_VIDEO)

    expect(videoInputWithMessage).toBeNull()
  })

  it('should show the video filename if user select a video', async () => {
    render(<VideoField setValue={setValueMock} />)

    const user = userEvent.setup()

    const videoInput = screen.getByLabelText(MESSAGE_WITHOUT_VIDEO)

    const video = new File(['video'], 'video.mp4', { type: 'video/mp4' })

    await user.upload(videoInput, video)

    const videoInputWithVideoFilename = screen.queryByLabelText(video.name)

    expect(videoInputWithVideoFilename).toBeInTheDocument()
  })

  it('Should call the setValue function prop if user select a video', async () => {
    render(<VideoField setValue={setValueMock} />)

    const user = userEvent.setup()

    const videoInput = screen.getByLabelText(MESSAGE_WITHOUT_VIDEO)

    const video = new File(['video'], 'video.mp4', { type: 'video/mp4' })

    await user.upload(videoInput, video)

    expect(setValueMock).toHaveBeenCalledOnce()
  })
})
