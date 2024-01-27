import { cleanup, screen } from '@testing-library/react'

import { SimpleVideoItemAdapter } from '@/features/video/models'

import BlockVideoItem from '@/features/video/components/BlockVideoItem'

import { render } from '@/utils/testing/render'
import { getTimeAgo } from '@/utils/datetimeFormats'

const blockVideoItemProps: SimpleVideoItemAdapter = {
  channel: {
    id: 1,
    handle: 'JasonCrk',
    name: 'Emerzon Javier Kolki',
    pictureUrl:
      'https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg'
  },
  id: 1,
  publicationDate: new Date(),
  thumbnailUrl:
    'https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg',
  title: 'title',
  views: 10
}

describe('<BlockVideoItem />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const component = screen.queryByTestId('BlockVideoItem')
    expect(component).toBeInTheDocument()
  })

  it('Should contain the thumbnail image element', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const thumbnailImgElement = screen.queryByAltText(blockVideoItemProps.title)

    expect(thumbnailImgElement).toBeInTheDocument()
    expect(thumbnailImgElement).toHaveAttribute(
      'src',
      blockVideoItemProps.thumbnailUrl
    )
  })

  it('Should contain the link to watch the video', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const links = screen.getAllByRole('link')

    const linkToWatchVideo = links.filter(
      link => link.getAttribute('href') === '/watch?v=' + blockVideoItemProps.id
    )[0]

    expect(linkToWatchVideo).toBeInTheDocument()
  })

  it('Should contain the channel picture', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const channelPictureElement = screen.queryByTestId('Picture')

    expect(channelPictureElement).toBeInTheDocument()
  })

  it('Should contain the link to redirect to the channel', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const links = screen.getAllByRole('link')

    const linkToRedirectChannel = links.filter(
      link =>
        link.getAttribute('href') === '/' + blockVideoItemProps.channel.handle
    )[0]

    expect(linkToRedirectChannel).toBeInTheDocument()
  })

  it('Should show the video title', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const titleElement = screen.queryByTitle(blockVideoItemProps.title)

    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent(blockVideoItemProps.title)
  })

  it('Should show the channel name', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const channelNameElement = screen.queryByText(
      blockVideoItemProps.channel.name
    )

    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should show the video views', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const videoViewsElement = screen.queryByText(
      new RegExp(`${blockVideoItemProps.views} views`, 'i')
    )

    expect(videoViewsElement).toBeInTheDocument()
  })

  it('Should show the "time ago" of the video\'s publication date', () => {
    render(<BlockVideoItem {...blockVideoItemProps} />)

    const timeAgoPublicationDateElement = screen.queryByText(
      new RegExp(getTimeAgo(blockVideoItemProps.publicationDate))
    )

    expect(timeAgoPublicationDateElement).toBeInTheDocument()
  })
})
