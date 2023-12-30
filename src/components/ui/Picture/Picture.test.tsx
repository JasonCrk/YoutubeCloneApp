import { cleanup, screen } from '@testing-library/react'

import Picture from '@/components/ui/Picture'

import { render } from '@/utils/testing/render'

const pictureProps = {
  name: 'test name',
  src: null
}

const IMAGE_URL = 'https://www.images.com/image.png'

describe('<Picture />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<Picture {...pictureProps} />)

    const pictureElement = screen.queryByTestId('Picture')
    expect(pictureElement).toBeInTheDocument()
  })

  it('Should show the initials of the name prop if the src prop is null', () => {
    render(<Picture {...pictureProps} />)

    const initialNameElement = screen.queryByText('TN')
    expect(initialNameElement).toBeInTheDocument()
  })

  it("Shouldn't show the initials of the name prop if the src prop is not null", () => {
    render(<Picture name={pictureProps.name} src={IMAGE_URL} />)

    const initialNameElement = screen.queryByText('TN')
    expect(initialNameElement).toBeNull()
  })

  it('Should show the picture of the channel if the src prop is not null', () => {
    render(<Picture name={pictureProps.name} src={IMAGE_URL} />)

    const pictureElement = screen.getByTestId('Picture')
    const imageElement = pictureElement.querySelector('img')

    expect(imageElement).toHaveAttribute('src', IMAGE_URL)
    expect(imageElement).toHaveAttribute('alt', pictureProps.name)
  })

  it("Shouldn't show the picture of the channel if the src prop is null", () => {
    render(<Picture {...pictureProps} />)

    const pictureElement = screen.getByTestId('Picture')
    const imageElement = pictureElement.querySelector('img')

    expect(imageElement).toBeNull()
  })
})
