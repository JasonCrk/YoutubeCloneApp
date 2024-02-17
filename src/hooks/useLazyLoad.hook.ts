/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useRef, useState } from 'react'

export const useLazyLoad = (): [RefObject<any>, boolean] => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    })

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return [ref, isVisible]
}
