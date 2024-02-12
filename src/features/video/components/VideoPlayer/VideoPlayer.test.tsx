import { cleanup, render, screen } from '@testing-library/react'

import VideoPlayer from '@/features/video/components/VideoPlayer'

const TEST_VIDEO_URL = 'http://images.com/test.mp4'

describe('<VideoPlayer />', () => {
  const setIsTheaterViewModeMock = vi.fn()

  afterEach(() => {
    cleanup()
    setIsTheaterViewModeMock.mockClear()
  })

  it('Should the video element has the data-testid attribute', () => {
    render(
      <VideoPlayer
        isTheaterViewMode={true}
        videoUrl={TEST_VIDEO_URL}
        setIsTheaterViewMode={setIsTheaterViewModeMock}
      />
    )

    expect(screen.queryByTestId('VideoPlayer')).toBeInTheDocument()
  })

  it('The source element should contain the videoUrl prop in the src attribute', () => {
    const { container } = render(
      <VideoPlayer
        isTheaterViewMode={true}
        videoUrl={TEST_VIDEO_URL}
        setIsTheaterViewMode={setIsTheaterViewModeMock}
      />
    )

    const sourceElement = container.querySelector('source')

    expect(sourceElement).toHaveAttribute('src', TEST_VIDEO_URL)
  })

  it('The source element should have type attribute for mp4 videos', () => {
    const { container } = render(
      <VideoPlayer
        isTheaterViewMode={true}
        videoUrl={TEST_VIDEO_URL}
        setIsTheaterViewMode={setIsTheaterViewModeMock}
      />
    )

    const sourceElement = container.querySelector('source')

    expect(sourceElement).toHaveAttribute('type', 'video/mp4')
  })
})
