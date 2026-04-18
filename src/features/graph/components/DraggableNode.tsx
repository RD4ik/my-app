import React from 'react'

import Node from './Node'

import { useDrag } from '../hooks/useDrag'

const DraggableNode = () => {
  const { ref, position, isDragging, handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel } =
    useDrag()
  const divRef = ref as React.RefObject<HTMLDivElement>

  return (
    <div
      ref={divRef}
      className={`draggable-node ${isDragging ? 'dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <Node />
    </div>
  )
}

export default DraggableNode
