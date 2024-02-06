import type { UploadVideoInputs } from '@/features/video/models'

export const createVideoMockData: UploadVideoInputs = {
  description: 'test description',
  thumbnail: new File(['test', 'thumbnail'], 'thumbnail.png', {
    type: 'image/png'
  }),
  title: 'test title',
  video: new File(['test', 'video'], 'thumbnail.mp4', { type: 'video/mp4' })
}
