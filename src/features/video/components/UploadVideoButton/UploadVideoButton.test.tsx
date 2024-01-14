import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import UploadVideoModalProvider from '@/features/video/contexts/UploadVideoModal/Provider'
import UploadVideoButton from '@/features/video/components/UploadVideoButton'

import { render } from '@/utils/testing/render'

describe('<UploadVideoButton />', () => {
  afterEach(cleanup)

  it('Should contain a element with "button" role', () => {
    render(
      <UploadVideoModalProvider>
        <UploadVideoButton />
      </UploadVideoModalProvider>
    )

    const uploadVideoButton = screen.queryByRole('button')
    expect(uploadVideoButton).toBeInTheDocument()
  })

  it("Shouldn't show the upload video modal if user don't click in the button", () => {
    render(
      <UploadVideoModalProvider>
        <UploadVideoButton />
      </UploadVideoModalProvider>
    )

    const uploadVideoModal = screen.queryByTestId('UploadVideoModal')
    expect(uploadVideoModal).toBeNull()
  })

  it('Should show the upload video modal if user click in the button', async () => {
    render(
      <UploadVideoModalProvider>
        <UploadVideoButton />
      </UploadVideoModalProvider>
    )

    const user = userEvent.setup()

    const uploadVideoButton = screen.getByRole('button')
    await user.click(uploadVideoButton)

    const uploadVideoModal = screen.queryByTestId('UploadVideoModal')
    expect(uploadVideoModal).toBeInTheDocument()
  })
})
