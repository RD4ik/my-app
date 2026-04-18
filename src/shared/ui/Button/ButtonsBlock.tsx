interface ButtonsBlockProps {
  onStudentClick?: () => void
  onTeacherClick?: () => void
}

const ButtonsBlock: React.FC<ButtonsBlockProps> = ({ onStudentClick, onTeacherClick }) => (
  <div className='modal-group'>
    <span className='subtitle'>Выбери роль</span>
    <div className='buttons'>
      <button className='Modal-button' onClick={onStudentClick}>
        Студент
      </button>
      <button className='Modal-button' onClick={onTeacherClick}>
        Преподаватель
      </button>
    </div>
  </div>
)

export default ButtonsBlock
