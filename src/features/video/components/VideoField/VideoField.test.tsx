import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import VideoField from '@/features/video/components/VideoField'

import { render } from '@/utils/testing/render'

const MESSAGE_WITHOUT_VIDEO = /^video no seleccionado$/i

const setValueMock = vi.fn()

describe('<VideoField />', () => {
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
