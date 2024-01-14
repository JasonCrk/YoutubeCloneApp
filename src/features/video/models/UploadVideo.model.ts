import { VideoDescription, VideoTitle } from '@/features/video/types'

export interface UploadVideoInputs {
  title: VideoTitle
  description: VideoDescription | null
  thumbnail: File
  video: File
}
