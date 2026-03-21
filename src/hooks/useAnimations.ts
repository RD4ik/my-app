import gsap from 'gsap'
import { useCallback } from 'react'

export const useAnimations = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  backgroundRef: React.RefObject<HTMLDivElement | null>,
  buttonsRef: React.RefObject<HTMLDivElement | null>,
  textRef: React.RefObject<HTMLDivElement | null>,
  blackCircleRef: React.RefObject<HTMLDivElement | null>,
  setShowBackground: (value: boolean) => void,
  setShowButtons: (value: boolean) => void,
  setSelectedRole: (role: 'student' | 'teacher' | null) => void,
) => {
  // Анимация подъёма текста
  const animateTextRise = useCallback(() => {
    if (!containerRef.current) return
    const tl = gsap.timeline()
    tl.to(containerRef.current, {
      y: 20,
      duration: 0.1,
      ease: 'elastic.out(0.1, 0.2)',
      onComplete: () => {
        gsap.delayedCall(0.005, () => setShowBackground(true))
      },
    })
      .to(containerRef.current, {
        y: -250,
        duration: 0.5,
        ease: 'power3.out',
        filter: 'blur(2px)',
      })
      .to(
        containerRef.current,
        {
          filter: 'none',
          duration: 0.3,
        },
        '-=0.3',
      )
      .to(containerRef.current, {
        y: -250,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
  }, [containerRef, setShowBackground])

  // Анимация фона (увеличение нижнего отступа)
  const animateBackground = useCallback(() => {
    if (!backgroundRef.current) return
    const tl = gsap.timeline()
    tl.to(backgroundRef.current, {
      paddingBottom: 450,
      duration: 0.8,
      ease: 'elastic.out(0.1, 0.1)',
    })
    tl.call(() => setShowButtons(true), [], '-=0.5')
  }, [backgroundRef, setShowButtons])

  // Анимация появления кнопок
  const animateButtons = useCallback(() => {
    if (!buttonsRef.current) return
    gsap.fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [buttonsRef])

  // Анимация схлопывания и закрашивания при выборе роли
  const collapseBackground = useCallback(
    (role: 'student' | 'teacher') => {
      if (!backgroundRef.current || !textRef.current) return

      gsap.killTweensOf([backgroundRef.current, buttonsRef.current, textRef.current, blackCircleRef.current])

      gsap.set(blackCircleRef.current, { clipPath: 'circle(0% at 50% 30%)' })

      const tl = gsap.timeline()

      tl.to(
        buttonsRef.current,
        {
          opacity: 0,
          scale: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            if (buttonsRef.current) {
              buttonsRef.current.style.pointerEvents = 'none'
              buttonsRef.current.style.userSelect = 'none'
            }
          },
        },
        0,
      )
        .to(
          textRef.current,
          {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (textRef.current) {
                textRef.current.style.pointerEvents = 'none'
                textRef.current.style.userSelect = 'none'
              }
              localStorage.setItem('selectedRole', role)
              setSelectedRole(role)
            },
          },
          0,
        )
        .to(
          blackCircleRef.current,
          {
            clipPath: 'circle(150% at 50% 30%)',
            duration: 1,
            ease: 'power2.inOut',
          },
          '-=0.5',
        )
        .to(
          backgroundRef.current,
          {
            scale: 1.04,
            boxShadow: '0px 0px 20px 8px #181e23ff',
            duration: 3,
            ease: 'elastic.out(0.5, 0.3)',
          },
          '-=0.7',
        )
    },
    [backgroundRef, buttonsRef, textRef, blackCircleRef, setSelectedRole],
  )

  return { animateTextRise, animateBackground, animateButtons, collapseBackground }
}
