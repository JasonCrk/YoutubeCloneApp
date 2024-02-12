import {
  useRef,
  useState,
  useEffect,
  type FC,
  type SyntheticEvent,
  type MouseEvent,
  FormEvent
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
  VideoPlayerVolumenSlider
} from '@/features/video/components/VideoPlayer/ui'

import { Box, Stack, Typography } from '@mui/material'

import {
  setIsTheaterViewModeInLocalStorage,
  formatVideoDuration
} from '@/features/video/utils'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'
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
  isVideoPaused: boolean
  currentVideoTime: string
  totalVideoTime: string
  isScrubbing: boolean
  wasVideoPaused: boolean
  isVideoMuted: boolean
  isLowVideoVolume: boolean
  videoVolumeValue: number
}

const VideoPlayer: FC<Props> = ({
  videoUrl,
  thumbnail,
  isTheaterViewMode,
  setIsTheaterViewMode
}) => {
  const [isVideoPaused, setIsVideoPaused] =
    useState<States['isVideoPaused']>(false)
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

  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isScrubbingRef = useRef<boolean>(false)
  const wasVideoPausedRef = useRef<boolean>(false)

  useEffect(() => {
    document.addEventListener('mouseup', event => {
      if (isScrubbingRef.current) handleToggleScrubbing(event)
    })
  }, [])

  const handleLoadedVideoData = (event: SyntheticEvent<HTMLVideoElement>) => {
    setTotalVideoTime(formatVideoDuration(event.currentTarget.duration))
  }

  const handlePlayVideo = () => {
    videoRef.current?.paused
      ? videoRef.current.play()
      : videoRef.current?.pause()

    setIsVideoPaused(prevValue => !prevValue)
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
      setIsLowVideoVolume(false)
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
      setIsVideoPaused(false)
    } else {
      videoRef.current!.currentTime = percent * videoRef.current!.duration
    }

    if (!wasVideoPausedRef.current) {
      videoRef.current?.play()
      setIsVideoPaused(true)
    }
  }

  return (
    <VideoPlayerContainer
      isTheaterViewMode={isTheaterViewMode}
      data-testid='VideoPlayer'
    >
      <Video
        ref={videoRef}
        poster={thumbnail}
        onClick={handlePlayVideo}
        controlsList='nodownload'
        autoPlay={true}
        disablePictureInPicture
        isTheaterViewMode={isTheaterViewMode}
        onTimeUpdate={handleTimelineTimeUpdate}
        onLoadedData={handleLoadedVideoData}
        onVolumeChange={handleChangeVideoVolume}
      >
        <source src={videoUrl} type='video/mp4'></source>
      </Video>

      <VideoPlayerControlsContainer isVideoPaused={isVideoPaused}>
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
              tooltipTitle={isVideoPaused ? 'Pause' : 'Play'}
              onClick={handlePlayVideo}
              icon={
                isVideoPaused ? (
                  <PauseIcon fontSize='large' />
                ) : (
                  <PlayArrowIcon fontSize='large' />
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
