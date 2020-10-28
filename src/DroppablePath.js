import React, { useRef } from "react";
import { useDrop } from "react-dnd";

const type = "DraggableRow";

const DroppablePath = ({
  index,
  moveObject,
  onClick,
  text,
  className = "droppable-path",
  style,
  ...restProps
}) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        dropClassName: "drop-object-here",
      };
    },
    drop: (item) => {
      moveObject(item.index, index);
    },
  });

  drop(ref);

  return (
    <button
      ref={ref}
      key={`tree-link-${index}`}
      className={`${className} tree-link ${isOver ? dropClassName : ""}`}
      onClick={onClick}
      {...restProps}
    >
      {text}
    </button>
  );
};

export default DroppablePath;
