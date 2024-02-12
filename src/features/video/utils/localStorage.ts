import { IS_THEATER_VIEW_MODE_STORAGE_KEY } from '@/features/video/constants/localStorage'

export const getIsTheaterViewModeFromLocalStorage = (): boolean => {
  return localStorage.getItem(IS_THEATER_VIEW_MODE_STORAGE_KEY) == 'true'
}

export const setIsTheaterViewModeInLocalStorage = (
  isTheaterViewMode: boolean
): void => {
  return localStorage.setItem(
    IS_THEATER_VIEW_MODE_STORAGE_KEY,
    String(isTheaterViewMode)
  )
}
