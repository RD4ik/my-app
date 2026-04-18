import './ProgramsGrid.css'

export interface Program {
  id: number
  title: string
  description: string
}

interface ProgramsGridProps {
  programs: Program[]
}

const ProgramsGrid: React.FC<ProgramsGridProps> = ({ programs }) => {
  return (
    <div className='programs-grid'>
      {programs.map((program) => (
        <div key={program.id} className='program-card'>
          <h3 className='program-title'>{program.title}</h3>
          <p className='program-description'>{program.description}</p>
          <button className='program-button'>Подробнее</button>
        </div>
      ))}
    </div>
  )
}

export default ProgramsGrid
