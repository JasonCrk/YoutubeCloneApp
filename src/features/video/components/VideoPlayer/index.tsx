import {
  useRef,
  useState,
  useEffect,
  type FC,
  type SyntheticEvent,
  type MouseEvent,
  type FormEvent
} from 'react'

import type { VideoThumbnail, VideoUrl } from '@/features/video/types'

import {
  VideoPlayerControl,
  VideoPlayerTimeline,
  VideoPlayerTimelineContainer,
  VideoPlayerTimelineThumb,
  VideoPlayerContainer,
  VideoPlayerControlsContainer,
  Video,
  VideoPlayerVolumenContainer,
  VideoPlayerVolumenSlider,
  VideoPlayerEffectContainer,
  VideoReproductionIconContainer
} from '@/features/video/components/VideoPlayer/ui'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'

import {
  setIsTheaterViewModeInLocalStorage,
  formatVideoDuration
} from '@/features/video/utils'

import PlayIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import DefaultViewIcon from '@mui/icons-material/Crop169'
import TheaterViewIcon from '@mui/icons-material/Crop75'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

interface Props {
  videoUrl: VideoUrl
  thumbnail?: VideoThumbnail
  isTheaterViewMode: boolean
  setIsTheaterViewMode: (theaterViewMode: boolean) => void
}

interface States {
  isVideoPlaying: boolean
  currentVideoTime: string
  totalVideoTime: string
  isScrubbing: boolean
  wasVideoPaused: boolean
  isVideoMuted: boolean
  isLowVideoVolume: boolean
  videoVolumeValue: number
  isVideoLoading: boolean
  showPlayAnimation: boolean
  showPauseAnimation: boolean
}

const VideoPlayer: FC<Props> = ({
  videoUrl,
  thumbnail,
  isTheaterViewMode,
  setIsTheaterViewMode
}) => {
  const [isVideoPlaying, setIsVideoPlaying] =
    useState<States['isVideoPlaying']>(false)
  const [currentVideoTime, setCurrentVideoTime] =
    useState<States['currentVideoTime']>('0:00')
  const [totalVideoTime, setTotalVideoTime] =
    useState<States['totalVideoTime']>('0:00')
  const [isVideoMuted, setIsVideoMuted] =
    useState<States['isVideoMuted']>(false)
  const [isLowVideoVolume, setIsLowVideoVolume] =
    useState<States['isLowVideoVolume']>(false)
  const [videoVolumeValue, setVideoVolumeValue] =
    useState<States['videoVolumeValue']>(1)
  const [isVideoLoading, setIsVideoLoading] =
    useState<States['isVideoLoading']>(false)
  const [showPlayAnimation, setShowPlayAnimation] =
    useState<States['showPlayAnimation']>(false)
  const [showPauseAnimation, setShowPauseAnimation] =
    useState<States['showPauseAnimation']>(false)

  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isScrubbingRef = useRef<boolean>(false)
  const wasVideoPausedRef = useRef<boolean>(false)

  useEffect(() => {
    document.addEventListener('mouseup', event => {
      if (isScrubbingRef.current) handleToggleScrubbing(event)
    })
    setIsVideoPlaying(true)
  }, [])

  const handlePlayVideo = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play()
      setIsVideoPlaying(true)
      setShowPlayAnimation(true)
      setTimeout(() => setShowPlayAnimation(false), 900)
    } else {
      videoRef.current?.pause()
      setIsVideoPlaying(false)
      setShowPauseAnimation(true)
      setTimeout(() => setShowPauseAnimation(false), 900)
    }
  }

  const handleFullScreenVideo = () => {
    document.fullscreenElement === null
      ? videoRef.current?.requestFullscreen()
      : document.exitFullscreen()
  }

  const handleChangeTheaterViewMode = () => {
    setIsTheaterViewMode(!isTheaterViewMode)
    setIsTheaterViewModeInLocalStorage(!isTheaterViewMode)
  }

  const handleTimelineTimeUpdate = (
    event: SyntheticEvent<HTMLVideoElement>
  ) => {
    setCurrentVideoTime(formatVideoDuration(event.currentTarget.currentTime))
    const timelinePercent =
      event.currentTarget.currentTime / event.currentTarget.duration
    timelineContainerRef.current?.style.setProperty(
      '--progress-position',
      String(timelinePercent)
    )
  }

  const handleToggleMute = () => {
    videoRef.current!.muted = !videoRef.current?.muted
    setIsVideoMuted(!videoRef.current?.muted)
  }

  const handleSelectVideoVolume = (event: FormEvent<HTMLInputElement>) => {
    videoRef.current!.volume = Number(event.currentTarget.value)
    videoRef.current!.muted = Number(event.currentTarget.value) === 0
    setIsVideoMuted(Number(event.currentTarget.value) === 0)
  }

  const handleChangeVideoVolume = () => {
    setVideoVolumeValue(videoRef.current!.volume)
    if (videoRef.current?.muted || videoRef.current?.volume === 0) {
      setVideoVolumeValue(0)
      setIsVideoMuted(true)
    } else if (videoRef.current!.volume >= 0.5) {
      setIsLowVideoVolume(false)
      setIsVideoMuted(false)
    } else {
      setIsLowVideoVolume(true)
      setIsVideoMuted(false)
    }
  }

  const handleToggleScrubbing = (event: globalThis.MouseEvent | MouseEvent) => {
    const timelineContainerRect =
      timelineContainerRef.current!.getBoundingClientRect()
    const percent =
      Math.min(
        Math.max(0, event.clientX - timelineContainerRect.x),
        timelineContainerRect.width
      ) / timelineContainerRect.width

    isScrubbingRef.current = (event.buttons & 1) === 1

    if (isScrubbingRef.current) {
      wasVideoPausedRef.current = Boolean(videoRef.current?.paused)
      videoRef.current?.pause()
      setIsVideoPlaying(false)
    } else {
      videoRef.current!.currentTime = percent * videoRef.current!.duration
    }

    if (!wasVideoPausedRef.current) {
      videoRef.current?.play()
      setIsVideoPlaying(true)
    }
  }

  const handleLoadedVideoData = (event: SyntheticEvent<HTMLVideoElement>) => {
    setIsVideoLoading(false)
    setIsVideoPlaying(true)
    setTotalVideoTime(formatVideoDuration(event.currentTarget.duration))
  }

  const handleLoadStartVideo = () => {
    setIsVideoPlaying(false)
    setIsVideoLoading(true)
  }

  return (
    <VideoPlayerContainer
      isTheaterViewMode={isTheaterViewMode}
      data-testid='VideoPlayer'
    >
      <Video
        ref={videoRef}
        poster={thumbnail}
        isTheaterViewMode={isTheaterViewMode}
        disablePictureInPicture
        controlsList='nodownload'
        autoPlay={true}
        onClick={handlePlayVideo}
        onTimeUpdate={handleTimelineTimeUpdate}
        onLoadedData={handleLoadedVideoData}
        onLoadStart={handleLoadStartVideo}
        onVolumeChange={handleChangeVideoVolume}
        src={videoUrl}
      />

      {isVideoLoading && (
        <VideoPlayerEffectContainer>
          <CircularProgress color='inherit' size='100px' />
        </VideoPlayerEffectContainer>
      )}

      <VideoPlayerEffectContainer>
        <VideoReproductionIconContainer isAction={showPlayAnimation}>
          <PlayIcon sx={{ fontSize: '40px' }} />
        </VideoReproductionIconContainer>
      </VideoPlayerEffectContainer>

      <VideoPlayerEffectContainer>
        <VideoReproductionIconContainer isAction={showPauseAnimation}>
          <PauseIcon sx={{ fontSize: '40px' }} />
        </VideoReproductionIconContainer>
      </VideoPlayerEffectContainer>

      <VideoPlayerControlsContainer
        isTheaterViewMode={isTheaterViewMode}
        isVideoPlaying={isVideoPlaying}
      >
        <VideoPlayerTimelineContainer
          ref={timelineContainerRef}
          onMouseDown={handleToggleScrubbing}
        >
          <VideoPlayerTimeline className='timeline'>
            <VideoPlayerTimelineThumb className='timeline-thumb' />
          </VideoPlayerTimeline>
        </VideoPlayerTimelineContainer>

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Stack spacing={0.5} direction='row' alignItems='center'>
            <VideoPlayerControl
              padding='8px 8px 8px 14px'
              tooltipTitle={isVideoPlaying ? 'Pause' : 'Play'}
              onClick={handlePlayVideo}
              icon={
                isVideoPlaying ? (
                  <PauseIcon fontSize='large' />
                ) : (
                  <PlayIcon fontSize='large' />
                )
              }
            />

            <VideoPlayerVolumenContainer>
              <VideoPlayerControl
                tooltipTitle={isVideoMuted ? 'Unmute' : 'Mute'}
                onClick={handleToggleMute}
                icon={
                  isVideoMuted ? (
                    <VolumeOffIcon fontSize='large' />
                  ) : isLowVideoVolume ? (
                    <VolumeDownIcon fontSize='large' />
                  ) : (
                    <VolumeUpIcon fontSize='large' />
                  )
                }
              />

              <VideoPlayerVolumenSlider
                type='range'
                min='0'
                max='1'
                step='any'
                value={videoVolumeValue}
                onInput={handleSelectVideoVolume}
              />
            </VideoPlayerVolumenContainer>

            <Typography component='span' variant='body2'>
              {currentVideoTime} / {totalVideoTime}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction='row'>
            <VideoPlayerControl
              padding={1}
              tooltipTitle={isTheaterViewMode ? 'Default mode' : 'Theater mode'}
              onClick={handleChangeTheaterViewMode}
              icon={
                isTheaterViewMode ? (
                  <DefaultViewIcon fontSize='large' />
                ) : (
                  <TheaterViewIcon fontSize='large' />
                )
              }
            />

            <VideoPlayerControl
              icon={<FullscreenIcon fontSize='large' />}
              padding='8px 14px 8px 8px'
              tooltipPlacement='top-end'
              tooltipTitle='Full screen'
              onClick={handleFullScreenVideo}
            />
          </Stack>
        </Box>
      </VideoPlayerControlsContainer>
    </VideoPlayerContainer>
  )
}

export default VideoPlayer
