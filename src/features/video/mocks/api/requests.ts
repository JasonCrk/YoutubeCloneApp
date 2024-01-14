import { UploadVideoInputs } from '@/features/video/models/UploadVideo.model'

export const createVideoMockData: UploadVideoInputs = {
  description: 'test description',
  thumbnail: new File(['test', 'thumbnail'], 'thumbnail.png', {
    type: 'image/png'
  }),
  title: 'test title',
  video: new File(['test', 'video'], 'thumbnail.mp4', { type: 'video/mp4' })
}
