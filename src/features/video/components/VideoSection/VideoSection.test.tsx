import { cleanup, screen } from '@testing-library/react'

import VideoSection from '@/features/video/components/VideoSection'

import { videoDetailsAdapterMock } from '@/features/video/mocks/models'

import { render } from '@/utils/testing/render'

import { getTimeAgo } from '@/utils/datetimeFormats'

describe('<VideoSection />', () => {
  afterEach(cleanup)

  it('Should contain the video title', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const videoTitle = screen.queryByText(videoDetailsAdapterMock.title)

    expect(videoTitle).toBeInTheDocument()
  })

  it('Should contain the ChannelInfo component', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const channelInfo = screen.queryByTestId('ChannelInfo')

    expect(channelInfo).toBeInTheDocument()
  })

  it('Should contain the SubscribeButton component', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const subscribeButton = screen.queryByTestId('SubscribeButton')

    expect(subscribeButton).toBeInTheDocument()
  })

  it('Should contain the LikeAndDislikeButtonGroups component', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const likeAndDislikeButtonGroups = screen.queryByTestId(
      'LikeAndDislikeButtonGroups'
    )

    expect(likeAndDislikeButtonGroups).toBeInTheDocument()
  })

  it('Should contain the total views', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const videoViews = screen.queryByText(
      new RegExp(`^${videoDetailsAdapterMock.totalViews} views`)
    )

    expect(videoViews).toBeInTheDocument()
  })

  it('Should contain the time ago of the video publication date', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const videoTimeAgo = screen.queryByText(
      new RegExp(`${getTimeAgo(videoDetailsAdapterMock.publicationDate)}$`)
    )

    expect(videoTimeAgo).toBeInTheDocument()
  })

  it('Should contain the video description', () => {
    render(<VideoSection video={videoDetailsAdapterMock} />)

    const videoDescription = screen.queryByText(
      videoDetailsAdapterMock.description
    )

    expect(videoDescription).toBeInTheDocument()
  })
})
