import React from 'react'
import './Node.css'

const Node: React.FC = () => {
  return (
    <div className='node'>
      <div className='node-item'>Название курса</div>
      <div className='node-item'>Описание</div>
      <div className='node-disc'>
        <div className='node-item'>бла</div>
        <div className='node-item'>бла</div>
      </div>
    </div>
  )
}

export default Node
