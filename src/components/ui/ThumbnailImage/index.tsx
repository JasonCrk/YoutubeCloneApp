import type { FC } from 'react'

interface Props {
  thumbnailUrl: string
  alt: string
}

const ThumbnailImage: FC<Props> = ({ alt, thumbnailUrl }) => {
  return (
    <img
      src={thumbnailUrl}
      alt={alt}
      style={{
        maxWidth: '500px',
        maxHeight: '250px',
        width: '100%',
        height: '100%',
        borderRadius: '15px',
        objectFit: 'cover',
        aspectRatio: 16 / 9
      }}
    />
  )
}

export default ThumbnailImage
