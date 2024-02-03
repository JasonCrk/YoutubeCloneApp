import { cleanup, screen } from '@testing-library/react'

import { simpleVideoItemAdapterMock } from '@/features/video/mocks/models'

import BlockVideoItem from '@/features/video/components/BlockVideoItem'

import { render } from '@/utils/testing/render'

import { getTimeAgo } from '@/utils/datetimeFormats'

describe('<BlockVideoItem />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const component = screen.queryByTestId('BlockVideoItem')
    expect(component).toBeInTheDocument()
  })

  it('Should contain the thumbnail image element', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const thumbnailImgElement = screen.queryByAltText(
      simpleVideoItemAdapterMock.title
    )

    expect(thumbnailImgElement).toHaveAttribute(
      'src',
      simpleVideoItemAdapterMock.thumbnailUrl
    )
  })

  it('Should contain the link to watch the video', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const links = screen.getAllByRole('link')

    const linkToWatchVideo = links.filter(
      link =>
        link.getAttribute('href') ===
        '/watch?v=' + simpleVideoItemAdapterMock.id
    )[0]

    expect(linkToWatchVideo).toBeInTheDocument()
  })

  it('Should contain the channel picture', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const channelPictureElement = screen.queryByTestId('Picture')

    expect(channelPictureElement).toBeInTheDocument()
  })

  it('Should contain the link to redirect to the channel', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const links = screen.getAllByRole('link')

    const linkToRedirectChannel = links.filter(
      link =>
        link.getAttribute('href') ===
        '/' + simpleVideoItemAdapterMock.channel.handle
    )[0]

    expect(linkToRedirectChannel).toBeInTheDocument()
  })

  it('Should show the video title', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const titleElement = screen.queryByTitle(simpleVideoItemAdapterMock.title)

    expect(titleElement).toHaveTextContent(simpleVideoItemAdapterMock.title)
  })

  it('Should show the channel name', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const channelNameElement = screen.queryByText(
      simpleVideoItemAdapterMock.channel.name
    )

    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should show the video views', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const videoViewsElement = screen.queryByText(
      new RegExp(`${simpleVideoItemAdapterMock.views} views`, 'i')
    )

    expect(videoViewsElement).toBeInTheDocument()
  })

  it('Should show the "time ago" of the video\'s publication date', () => {
    render(<BlockVideoItem {...simpleVideoItemAdapterMock} />)

    const timeAgoPublicationDateElement = screen.queryByText(
      new RegExp(getTimeAgo(simpleVideoItemAdapterMock.publicationDate))
    )

    expect(timeAgoPublicationDateElement).toBeInTheDocument()
  })
})
