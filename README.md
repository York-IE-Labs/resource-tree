# resource-tree

> Tree structure visualized as a table. Click directories to move down into the tree, drag and drop to move directories and resources.

[![NPM](https://img.shields.io/npm/v/@york-ie-labs/resource-tree.svg)](https://www.npmjs.com/package/@york-ie-labs/resource-tree) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @york-ie-labs/resource-tree
```

## Dependencies

[react-dnd](https://github.com/react-dnd/react-dnd)

`resource-tree` depends on `react-dnd`. Since `react-dnd` can only have a single context in an app, where you wrap the `resource-tree` with DnD is up to your project implementation.

[react-bootstrap-icons](https://github.com/ismamz/react-bootstrap-icons)

`resource-tree` uses `react-bootstrap-icons` by default.

## Usage

```jsx
import React, { useRef, useState } from 'react'
import { ResourceTree } from '@york-ie-labs/resource-tree'
import { DndProvider, createDndContext } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css'

const initial = {
  label: 'home',
  children: [
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
      ]
    },
  ]
}

function App() {
  const [tree, setTree] = useState(initial)
  const manager = useRef(RNDContext)
  return (
    <div className='app'>
      <DndProvider manager={manager.current.dragDropManager}>
        <ResourceTree tree={tree} setTree={setTree} />
      </DndProvider>
    </div>
  )
}
```

## Props

|Props|Required|Description|
|-----|--------|-----------|
|`tree`|`True`|The JSON tree structure to visualize. Each node under the root node must have a `type` key with a value of `directory` or `object`. Nodes of `directory` type must have `children` property with an Array as the value.|
|`setTree`|`True`|Update function to update the tree object|
|`className`|`False`|Optional class names to append to the `resource-tree` `table` element|

## License

MIT © [York IE Labs](https://github.com/York-IE-Labs)
