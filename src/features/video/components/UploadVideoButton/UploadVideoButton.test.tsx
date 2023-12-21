import { cleanup, render, screen } from '@testing-library/react'

import UploadVideoButton from '.'

describe('<UploadVideoButton />', () => {
  afterEach(cleanup)

  it('Should contain a element with "button" role', () => {
    render(<UploadVideoButton />)

    const uploadVideoButton = screen.getByRole('button')
    expect(uploadVideoButton).toBeInTheDocument()
  })

  it('Should the role element "button" be a <button />', () => {
    render(<UploadVideoButton />)

    const uploadVideoButton = screen.getByRole('button')
    expect(uploadVideoButton.tagName).toBe('BUTTON')
  })
})
