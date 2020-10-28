import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  FolderFill,
  Folder2Open,
  JournalRichtext as Journal,
} from "react-bootstrap-icons";

const type = "DraggableRow";

const DraggableRow = ({
  index,
  object,
  moveObject,
  enterDir,
  className = "draggable-row",
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver() && object.type === "directory",
        dropClassName: "drop-object-here",
      };
    },
    drop: (item) => {
      if (object.type === "directory" && item.index !== index) {
        moveObject(item.index, index);
      }
    },
  });

  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getIcon = () => {
    // https://coolors.co/087e8b-ff5a5f-3c3c3c-f5f5f5-c1839f
    return object.type === "directory" ? (
      isOver ? (
        <Folder2Open color="#087E8B" size={20} />
      ) : (
        <FolderFill color="#087E8B" size={20} />
      )
    ) : (
      <Journal color="#3C3C3C" size={20} />
    );
  };

  const getLabel = () => {
    return object.type === "directory" ? (
      <button className="tree-link" onClick={enterDir}>
        {object.label}
      </button>
    ) : (
      object.label
    );
  };

  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className} ${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      key={`draggable-row-${index}`}
      {...restProps}
    >
      <td width="32px">{getIcon()}</td>
      <td>{getLabel()}</td>
      <td>{object.description}</td>
    </tr>
  );
};

export default DraggableRow;
