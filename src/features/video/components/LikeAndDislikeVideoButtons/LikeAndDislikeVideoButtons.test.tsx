import { screen } from '@testing-library/react'

import LikeAndDislikeVideoButtons from '@/features/video/components/LikeAndDislikeVideoButtons'

import { render } from '@/utils/testing/render'

const LIKE_BUTTON_TITLE = 'I like this'
const DISLIKE_BUTTON_TITLE = 'I dislike this'

describe('<LikeAndDislikeVideoButtons />', () => {
  it('Should render component', () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    expect(
      screen.queryByTestId('LikeAndDislikeVideoButtons')
    ).toBeInTheDocument()
  })

  it('Should contain a like button', () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    const likeButton = screen.queryByTitle(LIKE_BUTTON_TITLE)

    expect(likeButton).toBeInTheDocument()
  })

  it('Should contain a dislike button', () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    const dislikeButton = screen.queryByTitle(DISLIKE_BUTTON_TITLE)

    expect(dislikeButton).toBeInTheDocument()
  })

  it('Should contain the total likes in the like button', () => {
    const totalLikes = 100

    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={totalLikes}
        isDislike={false}
        isLike={false}
      />
    )

    const likeButton = screen.queryByTitle(LIKE_BUTTON_TITLE)

    expect(likeButton).toHaveTextContent(String(totalLikes))
  })

  it('Should contain the total dislike in the dislike button', () => {
    const totalDislikes = 100

    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={totalDislikes}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    const dislikeButton = screen.queryByTitle(DISLIKE_BUTTON_TITLE)

    expect(dislikeButton).toHaveTextContent(String(totalDislikes))
  })

  it('Should show the like icon is activate if the isLike prop is true', () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={true}
      />
    )

    const likeIconActivate = screen.queryByTestId('likeIconActivate')

    expect(likeIconActivate).toBeInTheDocument()
  })

  it("Shouldn't show the like icon is activate if the isLike prop is true", () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    const likeIconActivate = screen.queryByTestId('likeIconActivate')

    expect(likeIconActivate).toBeNull()
  })

  it('Should show the like icon is activate if the isLike prop is true', () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={true}
        isLike={false}
      />
    )

    const dislikeIconActivate = screen.queryByTestId('dislikeIconActivate')

    expect(dislikeIconActivate).toBeInTheDocument()
  })

  it("Shouldn't show the like icon is activate if the isLike prop is true", () => {
    render(
      <LikeAndDislikeVideoButtons
        videoId={1}
        totalDislikes={0}
        totalLikes={0}
        isDislike={false}
        isLike={false}
      />
    )

    const dislikeIconActivate = screen.queryByTestId('dislikeIconActivate')

    expect(dislikeIconActivate).toBeNull()
  })
})
