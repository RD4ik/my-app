import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams'

import { CustomNodeModel } from './CustomNodeModel'
import { CustomNodeWidget } from './CustomNodeWidget'

export class CustomNodeFactory extends AbstractReactFactory<CustomNodeModel, DiagramEngine> {
  constructor() {
    super('custom-node')
  }

  generateModel(): CustomNodeModel {
    return new CustomNodeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return <CustomNodeWidget engine={this.engine} node={event.model} />
  }
}
