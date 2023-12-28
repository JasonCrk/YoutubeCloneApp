import { cleanup, renderHook, waitFor } from '@testing-library/react'

import { useService } from '@/hooks/useService.hook'

const MOCK_DATA = {
  data: 'test'
}

const MOCK_ERROR = {
  error: 'test'
}

const mockServiceFn = vi.fn().mockImplementation(async () => MOCK_DATA)

describe('useService', () => {
  afterEach(() => {
    cleanup()
    mockServiceFn.mockClear()
  })

  it('The "isLoading" state should be false by default and when the execution finishes it should be true', async () => {
    const { result } = renderHook(() =>
      useService({ serviceFn: mockServiceFn })
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('The "isSuccess" status should be false by default and if there was no error it should be true', async () => {
    const { result } = renderHook(() =>
      useService({ serviceFn: mockServiceFn })
    )

    expect(result.current.isSuccess).toBe(false)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('The "isError" status should be false by default and if there was an error it should be true', async () => {
    const { result } = renderHook(() =>
      useService({ serviceFn: () => Promise.reject(MOCK_ERROR) })
    )

    expect(result.current.isError).toBe(false)

    await waitFor(() => expect(result.current.isError).toBe(true))
  })

  it('Should insert the service response to the "data" state if there was no error', async () => {
    const { result } = renderHook(() =>
      useService({ serviceFn: mockServiceFn })
    )

    expect(result.current.data).toBe(undefined)

    await waitFor(() => expect(result.current.data).toEqual(MOCK_DATA))
  })

  it('Should insert the error response to the "error" status if an error has occurred', async () => {
    const { result } = renderHook(() =>
      useService({ serviceFn: () => Promise.reject(MOCK_ERROR) })
    )

    expect(result.current.error).toBe(undefined)

    await waitFor(() => expect(result.current.error).toEqual(MOCK_ERROR))
  })

  it('The onSettled function should be called once if the service has finished running (either success or error)', async () => {
    const mockOnSettled = vi.fn()

    renderHook(() =>
      useService({ serviceFn: mockServiceFn, onSettled: mockOnSettled })
    )

    await waitFor(() => expect(mockOnSettled).toHaveBeenCalledOnce())
  })

  it('The onSuccess function should be called once if the service has no errors running', async () => {
    const mockOnSuccess = vi.fn()

    renderHook(() =>
      useService({ serviceFn: mockServiceFn, onSuccess: mockOnSuccess })
    )

    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledOnce())
  })

  it('The onError function should be called once if the service has an error while running', async () => {
    const mockOnError = vi.fn()

    renderHook(() =>
      useService({
        serviceFn: () => Promise.reject(MOCK_ERROR),
        onError: mockOnError
      })
    )

    await waitFor(() => expect(mockOnError).toHaveBeenCalledOnce())
  })
})
