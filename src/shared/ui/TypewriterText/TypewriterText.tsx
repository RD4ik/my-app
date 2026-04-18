import { useState, useEffect } from 'react'

import './TypewriterText.css'

interface TypewriterTextProps {
  fullText: string
  typingSpeed?: number
  onComplete?: () => void
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ fullText, typingSpeed = 80, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        if (onComplete) {
          setTimeout(() => {
            onComplete()
          }, 5)
        }
      }
    }, typingSpeed)
    return () => clearInterval(interval)
  }, [fullText, onComplete])

  return <div className='typewriter-text'>{displayedText}</div>
}

export default TypewriterText
