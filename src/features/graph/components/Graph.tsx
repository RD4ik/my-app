import { CanvasWidget, ZoomCanvasAction } from '@projectstorm/react-canvas-core'
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams'
import React from 'react'

import { ActiveLinkFactory } from './ActiveLinkFactory'
import { CustomNodeFactory } from './CustomNodeFactory'
import { CustomNodeModel } from './CustomNodeModel'
import './Graph.css'

const Graph: React.FC = () => {
  const engine = React.useMemo(() => {
    const nextEngine = createEngine({
      registerDefaultZoomCanvasAction: false,
    })

    nextEngine.getActionEventBus().registerAction(new ZoomCanvasAction({ inverseZoom: true }))
    nextEngine.getNodeFactories().registerFactory(new CustomNodeFactory())
    nextEngine.getLinkFactories().registerFactory(new ActiveLinkFactory())

    const model = new DiagramModel()

    const courseNode = new CustomNodeModel({
      name: 'Курс',
      color: '#7f8cff',
    })
    courseNode.setPosition(220, 160)

    const lessonNode = new CustomNodeModel({
      name: 'Урок',
      color: '#53d6a7',
    })
    lessonNode.setPosition(620, 240)

    const sourcePort = courseNode.getPort('right')
    const targetPort = lessonNode.getPort('left')
    const link = sourcePort && targetPort ? sourcePort.link(targetPort) : null

    if (link) {
      model.addAll(courseNode, lessonNode, link)
    } else {
      model.addAll(courseNode, lessonNode)
    }

    nextEngine.setModel(model)

    return nextEngine
  }, [])

  return (
    <div className='graph-shell'>
      <CanvasWidget className='graph-canvas' engine={engine} />
    </div>
  )
}

export default Graph
