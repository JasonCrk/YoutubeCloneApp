import { useState } from 'react'

import { ServiceFnWithParams } from '@/services/types'

type CallServiceFn<TParams> = (params: TParams) => void

interface UseCallServiceParams<
  TResponse = unknown,
  TParams = unknown,
  TError = unknown
> {
  serviceFn: ServiceFnWithParams<TResponse, TParams>
  onSuccess?: (data: TResponse, variables: TParams | undefined) => void
  onError?: (error: TError, variables: TParams | undefined) => void
  onSettled?: (variables: TParams | undefined) => void
}

interface UseCallServiceResponse<
  TResponse = unknown,
  TParams = unknown,
  TError = unknown
> {
  data: TResponse | undefined
  error: TError | undefined
  isSuccess: boolean
  isError: boolean
  isPending: boolean
  callService: CallServiceFn<TParams>
}

export const useCallService = <
  TResponse = unknown,
  TParams = unknown,
  TError = unknown
>({
  serviceFn,
  onError,
  onSettled,
  onSuccess
}: UseCallServiceParams<TResponse, TParams, TError>): UseCallServiceResponse<
  TResponse,
  TParams,
  TError
> => {
  const [data, setData] = useState<TResponse>()
  const [error, setError] = useState<TError>()

  const [isPending, setIsPending] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const callService: CallServiceFn<TParams> = params => {
    setIsPending(true)
    serviceFn(params)
      .then(data => {
        setData(data)
        setIsSuccess(true)
        if (onSuccess) onSuccess(data, params)
      })
      .catch(err => {
        const error = err as TError
        setError(error)
        setIsError(true)
        if (onError) onError(error, params)
      })
      .finally(() => {
        setIsPending(false)
        if (onSettled) onSettled(params)
      })
  }

  return {
    callService,
    data,
    error,
    isError,
    isPending,
    isSuccess
  }
}
