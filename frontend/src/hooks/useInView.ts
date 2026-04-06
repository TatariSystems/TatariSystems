import { useRef, useState, useEffect } from 'react'

/**
 * Scroll-reveal hook matching the Tatari Institute reference design.
 * Uses IntersectionObserver to fire once when the element enters the viewport.
 *
 * @param threshold - Visibility ratio to trigger (default 0.12)
 * @returns [ref, isVisible] — attach ref to the element, isVisible flips to true once
 *
 * Recommended transition on the consuming element:
 *   transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1)`
 *   opacity: isVisible ? 1 : 0
 *   transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
  once = true,
  rootMargin = '0px',
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, visible]
}

export default useInView
