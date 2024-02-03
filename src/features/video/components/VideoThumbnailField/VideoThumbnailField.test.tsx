import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import VideoThumbnailField from '@/features/video/components/VideoThumbnailField'

import { render } from '@/utils/testing/render'

const IMAGE_LOCAL_URL = 'http://127.0.0.1:5050/image.png'
const TEST_IMAGE_FILE = new File(['test image'], 'image.png', {
  type: 'image/png'
})

global.URL.createObjectURL = vi.fn().mockReturnValue(IMAGE_LOCAL_URL)

describe('<VideoThumbnailField />', () => {
  const setValueMock = vi.fn()

  afterEach(() => {
    cleanup()
    setValueMock.mockClear()
  })

  it('Should render component', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)
    expect(screen.queryByTestId('VideoThumbnailField')).toBeInTheDocument()
  })

  it('Should the video thumbnail input has the type attribute equal to "file"', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailInput = screen.getByLabelText('')
    expect(thumbnailInput).toHaveAttribute('type', 'file')
  })

  it('Should the video thumbnail input only be able to upload images', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailInput = screen.getByLabelText('')

    expect(thumbnailInput.getAttribute('accept')).toMatch(/image\/jpeg/i)
    expect(thumbnailInput.getAttribute('accept')).toMatch(/image\/png/i)
    expect(thumbnailInput.getAttribute('accept')).toMatch(/image\/webp/i)
  })

  it('Should the video thumbnail input has the name attribute', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailInput = screen.getByLabelText('')
    expect(thumbnailInput).toHaveAttribute('name', 'thumbnail')
  })

  it('Should the video thumbnail input has display style property to equal "none"', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailInput = screen.getByLabelText('')
    expect(thumbnailInput).toHaveStyle('display: none')
  })

  it('Should contain a svg icon in the label of video thumbnail input', () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailLabel = screen.getByTestId('FileUploadIcon')
    expect(thumbnailLabel).toBeInTheDocument()
  })

  it("Shouldn't show the image element if user don't upload image", () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const previewThumbnailElement = screen.queryByRole('img')
    expect(previewThumbnailElement).toBeNull()
  })

  it("Should show the video thumbnail input label if user don't upload image", () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const thumbnailInput = screen.queryByLabelText('')
    expect(thumbnailInput).toBeInTheDocument()
  })

  it('Should call the setValue function prop if user upload image', async () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const user = userEvent.setup()

    const thumbnailInput = screen.getByLabelText('')

    await user.upload(thumbnailInput, TEST_IMAGE_FILE)

    expect(setValueMock).toHaveBeenCalledOnce()
  })

  it("Shouldn't show the video thumbnail input label if user upload image", async () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const user = userEvent.setup()

    const thumbnailInput = screen.getByLabelText('')

    await user.upload(thumbnailInput, TEST_IMAGE_FILE)

    const thumbnailLabel = screen.queryByLabelText('')
    expect(thumbnailLabel).toBeNull()
  })

  it("Shouldn't show the remove thumbnail button if user don't upload image", () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const removeThumbnailButton = screen.queryByRole('button')
    expect(removeThumbnailButton).toBeNull()
  })

  it('Should show the remove thumbnail button if user upload image', async () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const user = userEvent.setup()

    const thumbnailInput = screen.getByLabelText('')

    await user.upload(thumbnailInput, TEST_IMAGE_FILE)

    const removeThumbnailButton = screen.queryByRole('button')
    expect(removeThumbnailButton).toBeInTheDocument()
  })

  it('Should show the imagen element if user upload image', async () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const user = userEvent.setup()

    const thumbnailInput = screen.getByLabelText('')

    await user.upload(thumbnailInput, TEST_IMAGE_FILE)

    const previewThumbnailElement = screen.queryByRole('img')
    expect(previewThumbnailElement).toBeInTheDocument()
  })

  it('Should the imagen element has src equal to URL from upload image if user upload image', async () => {
    render(<VideoThumbnailField setValue={setValueMock} />)

    const user = userEvent.setup()

    const thumbnailInput = screen.getByLabelText('')

    await user.upload(thumbnailInput, TEST_IMAGE_FILE)

    const previewThumbnailElement = screen.queryByRole('img')
    expect(previewThumbnailElement).toHaveAttribute('src', IMAGE_LOCAL_URL)
  })
})
