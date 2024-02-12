import { LoaderFunction, redirect } from 'react-router-dom'

export const queryParamsWatchVideo: LoaderFunction = ({ request }) => {
  const queryParams = new URL(request.url).searchParams

  if (queryParams.size === 0) return redirect('/')

  const videoId = Number(queryParams.get('v'))

  if (videoId === null || videoId <= 0) return redirect('/')

  return { videoId }
}
