import gsap from 'gsap'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAnimations } from '../features/graph/hooks/useAnimations'
import ProgramsGrid, { Program } from '../programs/components/ProgramsGrid'
import coursesData from '../programs/data/courses-test.json'
import AnimatedText from '../shared/ui/AnimatedText/AnimatedText'
import ButtonsBlock from '../shared/ui/Button/ButtonsBlock'
import './MainContent.css'

interface MainContentProps {
  showWelcome: boolean
}

const programsData: Program[] = coursesData as Program[]

const MainContent: React.FC<MainContentProps> = ({ showWelcome }) => {
  const navigate = useNavigate()
  const [isRaised, setIsRaised] = useState(!showWelcome)
  const [showButtons, setShowButtons] = useState(!showWelcome)
  const [showBackground, setShowBackground] = useState(!showWelcome)
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null)
  const [isReversing, setIsReversing] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const blackCircleRef = useRef<HTMLDivElement>(null)

  const { animateTextRise, animateBackground, animateButtons, collapseBackground } = useAnimations(
    containerRef,
    backgroundRef,
    buttonsRef,
    textRef,
    blackCircleRef,
    setShowBackground,
    setShowButtons,
    setSelectedRole,
  )

  useEffect(() => {
    if (showWelcome && buttonsRef.current) {
      gsap.set(buttonsRef.current, { opacity: 0, pointerEvents: 'none', userSelect: 'none' })
    }
  }, [showWelcome])

  useEffect(() => {
    const savedRole = localStorage.getItem('selectedRole') as 'student' | 'teacher' | null
    if (savedRole && !showWelcome) {
      setSelectedRole(savedRole)
      requestAnimationFrame(() => {
        if (blackCircleRef.current) blackCircleRef.current.style.clipPath = ''

        if (buttonsRef.current) {
          gsap.set(buttonsRef.current, { opacity: 0, scale: 0, pointerEvents: 'none', userSelect: 'none' })
        }
        if (backgroundRef.current) {
          gsap.set(backgroundRef.current, {
            scale: 1.04,
            boxShadow: '0px 0px 20px 8px #181e23ff',
            paddingBottom: 450,
            transformOrigin: 'top',
          })
        }
        if (textRef.current) {
          gsap.set(textRef.current, { opacity: 0, scale: 0, pointerEvents: 'none', userSelect: 'none' })
        }
      })
    }
  }, [showWelcome])

  useEffect(() => {
    if (!showWelcome && !selectedRole) {
      if (containerRef.current) gsap.set(containerRef.current, { y: -250 })
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, {
          paddingBottom: 450,
          transformOrigin: 'top',
        })
      }
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 1, scale: 1, y: 0 })
      }
      if (blackCircleRef.current) {
        gsap.set(blackCircleRef.current, { clipPath: 'circle(0% at 50% 30%)' })
      }
      if (textRef.current) {
        textRef.current.style.pointerEvents = ''
        textRef.current.style.userSelect = ''
      }
      if (buttonsRef.current) {
        buttonsRef.current.style.pointerEvents = ''
        buttonsRef.current.style.userSelect = ''
      }
    }
  }, [showWelcome, selectedRole])

  useEffect(() => {
    if (showBackground && showWelcome && !selectedRole && isReversing) {
      animateBackground()
    }
  }, [showBackground, animateBackground, showWelcome, selectedRole, isReversing])

  useEffect(() => {
    if (showButtons && showWelcome && !selectedRole && isReversing) {
      animateButtons()
    }
  }, [showButtons, animateButtons, showWelcome, selectedRole, isReversing])

  const reverseCollapse = useCallback(() => {
    if (!blackCircleRef.current || !backgroundRef.current || !textRef.current) return

    gsap.killTweensOf([blackCircleRef.current, backgroundRef.current, textRef.current, buttonsRef.current])

    if (textRef.current) {
      textRef.current.style.pointerEvents = ''
      textRef.current.style.userSelect = ''
    }
    if (buttonsRef.current) {
      buttonsRef.current.style.pointerEvents = ''
      buttonsRef.current.style.userSelect = ''
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedRole(null)
        setShowButtons(true)
        setShowBackground(true)
        setIsRaised(true)

        if (blackCircleRef.current) {
          gsap.set(blackCircleRef.current, { clipPath: 'circle(0% at 50% 30%)' })
        }
        if (backgroundRef.current) {
          gsap.set(backgroundRef.current, {
            backgroundColor: 'rgb(236, 243, 245, 0.98)',
            scale: 1,
            boxShadow: '0px 0px 20px 8px #354e61',
          })
        }

        blackCircleRef.current?.classList.remove('active')
        backgroundRef.current?.classList.remove('active')

        if (textRef.current) {
          textRef.current.style.pointerEvents = ''
          textRef.current.style.userSelect = ''
        }
        if (buttonsRef.current) {
          buttonsRef.current.style.pointerEvents = ''
          buttonsRef.current.style.userSelect = ''
        }

        setIsReversing(false)
      },
    })

    tl.to(
      backgroundRef.current,
      {
        backgroundColor: 'rgb(236, 243, 245, 0.98)',
        scale: 1,
        boxShadow: '0px 0px 20px 8px #354e61',
        duration: 1,
        ease: 'power2.inOut',
      },
      0,
    )

    tl.to(
      blackCircleRef.current,
      {
        clipPath: 'circle(0% at 50% 30%)',
        duration: 1,
        ease: 'power2.inOut',
      },
      0,
    )

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.24',
    )

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.8',
      )
    }
  }, [
    blackCircleRef,
    backgroundRef,
    textRef,
    buttonsRef,
    setSelectedRole,
    setShowButtons,
    setShowBackground,
    setIsRaised,
  ])

  const handleTypingComplete = () => {
    setIsRaised(true)
    animateTextRise()
  }

  const handleStudentClick = () => {
    collapseBackground('student')
  }

  const handleTeacherClick = () => {
    navigate('/main')
  }

  const handleBackClick = () => {
    reverseCollapse()
    localStorage.removeItem('selectedRole')
  }

  return (
    <div ref={containerRef} className='main-content'>
      <div ref={backgroundRef} className={`main-content-background ${selectedRole ? 'active' : ''}`}>
        <div ref={blackCircleRef} className={`black-circle ${selectedRole ? 'active' : ''}`}>
          <div
            className={`student-content ${selectedRole === 'student' ? 'active' : ''}`}
            aria-hidden={selectedRole !== 'student'}
          >
            <div className='student-choice'>
              <button onClick={handleBackClick} className='back-button'>
                Back
              </button>
              <input type='search' className='search' id='site-search' name='q' />
            </div>
            {programsData.length > 0 && <ProgramsGrid programs={programsData} />}
          </div>
        </div>
      </div>

      <div
        ref={textRef}
        className={`text-container ${selectedRole ? 'hidden' : ''}`}
        style={{ display: 'inline-block' }}
      >
        <AnimatedText showWelcome={showWelcome} isRaised={isRaised} onTypingComplete={handleTypingComplete} />
      </div>

      <div ref={buttonsRef} className='buttons-block'>
        <ButtonsBlock onStudentClick={handleStudentClick} onTeacherClick={handleTeacherClick} />
      </div>
    </div>
  )
}

export default MainContent
