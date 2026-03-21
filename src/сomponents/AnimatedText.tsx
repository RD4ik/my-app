import TypewriterText from './TypewriterText'

import './AnimatedText.css'

interface AnimatedTextProps {
  showWelcome: boolean
  isRaised: boolean
  onTypingComplete: () => void
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ showWelcome, isRaised, onTypingComplete }) => {
  return (
    <div className='animated-text'>
      {showWelcome && !isRaised ? (
        <TypewriterText fullText='Здравствуй, Пользователь' onComplete={onTypingComplete} />
      ) : (
        <div className='static-text'>Здравствуй, Пользователь</div>
      )}
    </div>
  )
}

export default AnimatedText
