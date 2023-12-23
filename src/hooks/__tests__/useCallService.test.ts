import { act, renderHook, waitFor, cleanup } from '@testing-library/react'

import { useCallService } from '../useCallService.hook'

const MOCK_DATA = {
  data: 'test'
}

const MOCK_ERROR = {
  error: 'test'
}

const mockServiceFn = vi.fn().mockImplementation(async () => MOCK_DATA)

describe('useCallService', () => {
  afterEach(() => {
    cleanup()
    mockServiceFn.mockClear()
  })

  it('Should have the default status of "isError" set to false', () => {
    const { result } = renderHook(() =>
      useCallService({ serviceFn: mockServiceFn })
    )

    expect(result.current.isError).toBe(false)
  })

  it('Should have the default status of "isSuccess" set to false', () => {
    const { result } = renderHook(() =>
      useCallService({ serviceFn: mockServiceFn })
    )

    expect(result.current.isSuccess).toBe(false)
  })

  it('Should have the default status of "isPending" set to false', () => {
    const { result } = renderHook(() =>
      useCallService({ serviceFn: mockServiceFn })
    )

    expect(result.current.isPending).toBe(false)
  })

  it('Should change the "isSuccess" status to true if the service has an error while running', async () => {
    const { result } = renderHook(() =>
      useCallService({
        serviceFn: mockServiceFn
      })
    )

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.isError).toBe(false)
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isPending).toBe(false)
  })

  it('Should change the "isError" status to true if the service has an error while running', async () => {
    const { result } = renderHook(() =>
      useCallService({
        serviceFn: () => Promise.reject('error')
      })
    )

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isError)

    expect(result.current.isError).toBe(true)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isPending).toBe(false)
  })

  it('The onSettled function should be called once if the service has finished running (either success or error)', async () => {
    const mockOnSettled = vi.fn()

    const { result } = renderHook(() =>
      useCallService({ serviceFn: mockServiceFn, onSettled: mockOnSettled })
    )

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isPending)

    expect(mockOnSettled).toHaveBeenCalledOnce()
  })

  it('The onSuccess function should be called once if the service has no errors running', async () => {
    const mockOnSuccess = vi.fn()

    const { result } = renderHook(() =>
      useCallService({ serviceFn: mockServiceFn, onSuccess: mockOnSuccess })
    )

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isSuccess)

    expect(mockOnSuccess).toHaveBeenCalledOnce()
  })

  it('The onError function should be called once if the service has an error while running', async () => {
    const mockOnError = vi.fn()

    const { result } = renderHook(() =>
      useCallService({
        serviceFn: () => Promise.reject(MOCK_ERROR),
        onError: mockOnError
      })
    )

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isError)

    expect(mockOnError).toHaveBeenCalledOnce()
  })

  it('Should assignment the service result to the data status if the service has no errors running', async () => {
    const { result } = renderHook(() =>
      useCallService({
        serviceFn: mockServiceFn
      })
    )

    expect(result.current.data).toBe(undefined)

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBe(MOCK_DATA)
  })

  it('Should assignment the service error result to the error status if the service has an errors while running', async () => {
    const { result } = renderHook(() =>
      useCallService({
        serviceFn: () => Promise.reject(MOCK_ERROR)
      })
    )

    expect(result.current.error).toBe(undefined)

    act(() => {
      result.current.callService()
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBe(MOCK_ERROR)
  })
})
