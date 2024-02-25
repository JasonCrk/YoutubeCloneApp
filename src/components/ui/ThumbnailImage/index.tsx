import type { FC } from 'react'

interface Props {
  thumbnailUrl: string
  alt: string
  width?: string
}

const ThumbnailImage: FC<Props> = ({ alt, thumbnailUrl, width }) => {
  return (
    <img
      src={thumbnailUrl}
      alt={alt}
      style={{
        maxWidth: width ?? '500px',
        width: width ?? '100%',
        borderRadius: '15px',
        objectFit: 'cover',
        aspectRatio: 16 / 9
      }}
    />
  )
}

export default ThumbnailImage
