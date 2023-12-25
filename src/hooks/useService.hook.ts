import { useEffect, useState } from 'react'

interface UseServiceParams<TResponse = unknown, TError = unknown> {
  serviceFn: () => Promise<TResponse>
  onSuccess?: (data: TResponse) => void
  onError?: (error: TError) => void
  onSettled?: () => void
}

interface UseServiceResponse<TResponse = unknown, TError = unknown> {
  data: TResponse | undefined
  error: TError | undefined
  isSuccess: boolean
  isError: boolean
  isLoading: boolean
  refetch: () => void
}

export const useService = <TResponse = unknown, TError = unknown>({
  serviceFn,
  onError,
  onSettled,
  onSuccess
}: UseServiceParams<TResponse, TError>): UseServiceResponse<
  TResponse,
  TError
> => {
  const [data, setData] = useState<TResponse>()
  const [error, setError] = useState<TError>()
  const [refetchCount, setRefetchCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    serviceFn()
      .then(data => {
        setData(data)
        setIsSuccess(true)
        if (onSuccess) onSuccess(data)
      })
      .catch(err => {
        const error = err as TError
        setError(error)
        setIsError(true)
        if (onError) onError(error)
      })
      .finally(() => {
        setIsLoading(false)
        if (onSettled) onSettled()
      })
  }, [refetchCount])

  const refetch: UseServiceResponse['refetch'] = () =>
    setRefetchCount(prevRefetchCount => prevRefetchCount++)

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch
  }
}
