import React from 'react'

import DraggableNode from './DraggableNode'

import './Graph.css'

const Graph: React.FC = () => {
  return (
    <div className='graph'>
      <DraggableNode />
      <DraggableNode />
      <DraggableNode />
    </div>
  )
}

export default Graph
