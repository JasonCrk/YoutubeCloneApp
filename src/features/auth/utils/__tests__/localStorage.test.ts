import { JwtToken } from '@/features/auth/types'

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage
} from '@/features/auth/utils'

import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY
} from '@/features/auth/constants/localStorage'

describe('localStorage.util', () => {
  const TEST_JWT_TOKEN: JwtToken = 'test access token'

  describe('get tokens', () => {
    const getItemFromLocalStorageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => TEST_JWT_TOKEN)

    afterEach(() => {
      getItemFromLocalStorageSpy.mockClear()
    })

    describe('getAccessTokenFromLocalStorage', () => {
      it('Should call the getItem method from localStorage', () => {
        getAccessTokenFromLocalStorage()

        expect(getItemFromLocalStorageSpy).toHaveBeenCalledOnce()
        expect(getItemFromLocalStorageSpy).toHaveBeenCalledWith(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY
        )
      })

      it('Should return the access token', () => {
        expect(getAccessTokenFromLocalStorage()).toBe(TEST_JWT_TOKEN)
      })
    })

    describe('getRefreshTokenFromLocalStorage', () => {
      it('Should call the getItem method from localStorage', () => {
        getRefreshTokenFromLocalStorage()

        expect(getItemFromLocalStorageSpy).toHaveBeenCalledOnce()
        expect(getItemFromLocalStorageSpy).toHaveBeenCalledWith(
          REFRESH_TOKEN_LOCAL_STORAGE_KEY
        )
      })

      it('Should return the refresh token', () => {
        expect(getRefreshTokenFromLocalStorage()).toBe(TEST_JWT_TOKEN)
      })
    })
  })

  describe('set token', () => {
    const setItemFromLocalStorageSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {})

    afterEach(() => {
      setItemFromLocalStorageSpy.mockClear()
    })

    describe('setAccessTokenInLocalStorage()', () => {
      it('Should call the setItem method from localStorage', () => {
        setAccessTokenInLocalStorage(TEST_JWT_TOKEN)

        expect(setItemFromLocalStorageSpy).toHaveBeenCalledOnce()
        expect(setItemFromLocalStorageSpy).toHaveBeenCalledWith(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY,
          TEST_JWT_TOKEN
        )
      })

      it('Should not return anything', () => {
        expect(setAccessTokenInLocalStorage(TEST_JWT_TOKEN)).toBeUndefined()
      })
    })

    describe('setRefreshTokenInLocalStorage()', () => {
      it('Should call the setItem method from localStorage', () => {
        setRefreshTokenInLocalStorage(TEST_JWT_TOKEN)

        expect(setItemFromLocalStorageSpy).toHaveBeenCalledWith(
          REFRESH_TOKEN_LOCAL_STORAGE_KEY,
          TEST_JWT_TOKEN
        )
      })

      it('Should not return anything', () => {
        expect(setRefreshTokenInLocalStorage(TEST_JWT_TOKEN)).toBeUndefined()
      })
    })
  })

  describe('remove token', () => {
    const removeItemFromLocalStorageSpy = vi.spyOn(
      Storage.prototype,
      'removeItem'
    )

    afterEach(() => {
      removeItemFromLocalStorageSpy.mockClear()
    })

    describe('removeAccessTokenFromLocalStorage()', () => {
      it('Should call the removeItem method from localStorage', () => {
        removeAccessTokenFromLocalStorage()

        expect(removeItemFromLocalStorageSpy).toHaveBeenCalledOnce()
        expect(removeItemFromLocalStorageSpy).toHaveBeenCalledWith(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY
        )
      })

      it('Should not return anything', () => {
        expect(removeAccessTokenFromLocalStorage()).toBeUndefined()
      })
    })

    describe('removeRefreshTokenFromLocalStorage()', () => {
      it('Should call the removeItem method from localStorage', () => {
        removeRefreshTokenFromLocalStorage()

        expect(removeItemFromLocalStorageSpy).toHaveBeenCalledWith(
          REFRESH_TOKEN_LOCAL_STORAGE_KEY
        )
      })

      it('Should not return anything', () => {
        expect(removeRefreshTokenFromLocalStorage()).toBeUndefined()
      })
    })
  })
})
