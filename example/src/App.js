import React, { useRef, useState } from 'react'
import { ResourceTree } from 'resource-tree'
import { DndProvider, createDndContext } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css'

const RNDContext = createDndContext(HTML5Backend)
const initial = {
  label: 'home',
  children: [
    {
      type: 'directory',
      label: 'Team Files',
      description: '',
      children: [
        {
          type: 'directory',
          label: 'Drafts',
          description: '',
          children: []
        },
        {
          type: 'directory',
          label: 'Published',
          description: '',
          children: []
        },
        {
          type: 'object',
          label: 'Meeting Notes - 10/27',
          description: 'Meeting notes with Mike'
        }
      ]
    },
    {
      type: 'directory',
      label: 'Personal Files',
      description: '',
      children: [
        {
          type: 'object',
          label: 'Interesting Tech',
          description: 'Notes on some companies and products'
        },
        {
          type: 'object',
          label: 'Ideas',
          description: 'Product and company ideas'
        }
      ]
    },
    {
      type: 'directory',
      label: 'Archive',
      description: '',
      children: []
    },
    {
      type: 'object',
      label: "Today's Notes",
      description: 'TODO Notes for today'
    }
  ]
}

function App() {
  const [tree, setTree] = useState(initial)
  const manager = useRef(RNDContext)
  return (
    <div className='app'>
      <div>
        <h2>Resource Tree</h2>
        <dl style={{ fontSize: '14px' }}>
          <dt>Create</dt>
          <dd>
            Use the buttons next to the path to create nodes in the resource
            tree
          </dd>
          <dt>Move</dt>
          <dd>
            Drag and drop resources to folders to move down the path. Drop
            resources on the desired path link to move up the path.
          </dd>
        </dl>
      </div>
      <br />
      <div className='tree-wrapper'>
        <DndProvider manager={manager.current.dragDropManager}>
          <ResourceTree root='home' tree={tree} setTree={setTree} />
        </DndProvider>
      </div>
      <br />
      <div>
        <h3>JSON Tree</h3>
        <pre className='json'>
          <code>{JSON.stringify(tree, undefined, 3)}</code>
        </pre>
      </div>
    </div>
  )
}

export default App
