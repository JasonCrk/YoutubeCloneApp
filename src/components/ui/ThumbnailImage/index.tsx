import type { FC } from 'react'

interface Props {
  thumbnailUrl: string
  alt: string
  width?: string
  maxWidth?: string
}

const ThumbnailImage: FC<Props> = ({ alt, thumbnailUrl, width, maxWidth }) => {
  return (
    <img
      src={thumbnailUrl}
      alt={alt}
      role='img'
      style={{
        maxWidth: maxWidth ?? '500px',
        width: width ?? '100%',
        height: '100%',
        borderRadius: '15px',
        objectFit: 'cover',
        aspectRatio: 16 / 9
      }}
    />
  )
}

export default ThumbnailImage
