import React, { useState } from 'react'
import DraggableRow from './DraggableRow'
import DroppablePath from './DroppablePath'
import {
  FolderPlus,
  FileEarmarkPlus as FilePlus,
  ChevronRight
} from 'react-bootstrap-icons'

const ResourceTree = ({ tree, setTree, className, root = 'root' }) => {
  const [depth, setDepth] = useState([])

  const findNode = (location, node, path) => {
    path.push(node.label)

    if (!location.length) {
      return { node, path }
    }

    let loc = location.shift()
    return findNode(location, node.children[loc], path)
  }

  const createNode = (newNode) => {
    let tmpTree = { ...tree }
    let { node } = findNode([...depth], tmpTree, [])
    node.children.push({ ...newNode })
    setTree(tmpTree)
  }

  const moveObjectDown = (itemIndex, index) => {
    let tmpTree = { ...tree }
    let { node } = findNode([...depth], tmpTree, [])
    const element = node.children[itemIndex]
    node.children[index].children.push(element)
    node.children.splice(itemIndex, 1)
    setTree(tmpTree)
  }

  const moveObjectUp = (itemIndex, index) => {
    let tmpTree = { ...tree }
    // remove node from current location
    let { node } = findNode([...depth], tmpTree, [])
    const element = node.children[itemIndex]
    node.children.splice(itemIndex, 1)

    // add node to location
    let { node: newNode } = findNode([...depth].slice(0, index), tmpTree, [])
    newNode.children.push(element)

    setTree(tmpTree)
  }

  const renderRows = (children) => {
    if (!children.length) {
      return (
        <tr key={`no-objects`}>
          <td colSpan={3}>No objects</td>
        </tr>
      )
    }
    return children.map((v, i) => {
      return (
        <DraggableRow
          key={i}
          index={i}
          object={v}
          moveObject={moveObjectDown}
          enterDir={() => {
            let tmp = [...depth]
            tmp.push(i)
            setDepth(tmp)
          }}
        />
      )
    })
  }

  const renderPage = () => {
    const { node, path } = findNode([...depth], tree, [])
    console.log('found node', node, path)
    const { children } = node
    const paths = path.map((p, i) => {
      let components = []
      if (depth.slice(0, i).length === depth.length) {
        components.push(<span key={`tree-link-${i}`}>{p}</span>)
      }
      if (depth.slice(0, i).length !== depth.length) {
        components.push(
          <DroppablePath
            index={i}
            moveObject={moveObjectUp}
            onClick={() => {
              setDepth(depth.slice(0, i))
            }}
            text={p}
          />
        )
      }
      if (i < path.length - 1) {
        components.push(
          <span key={`tree-link-slash-${i}`}>
            <ChevronRight className='tree-path-sep' size={12} />
          </span>
        )
      }
      return components
    })

    return [
      <div className='tree-header'>
        <span className='tree-path'>{paths}</span>
        <button
          onClick={() =>
            createNode({
              type: 'directory',
              label: 'Untitled Folder',
              description: 'New folder',
              children: []
            })
          }
        >
          <FolderPlus size={24} />
        </button>
        <button
          onClick={() =>
            createNode({
              type: 'object',
              label: 'Untitled File',
              description: 'New file'
            })
          }
        >
          <FilePlus size={24} />
        </button>
      </div>,
      <table className={`resource-tree ${className}`}>
        <tbody>{renderRows(children)}</tbody>
      </table>
    ]
  }

  return <div>{renderPage()}</div>
}

export default ResourceTree
