import classNames from "classnames";
import React from 'react'

function Item({ id, name, onClick, className, active, height, big, level, children }) {

  return (
    <button
      onClick={() => onClick(id, name)}
      className={classNames(
        "item",
        className,
        {"active": active},
        {"item--big": big},
        {"item--level": level}
      )}
      style={{height: `${height}px`}}
    >
      {children}
    </button>
  );
}

Item.defaultProps = {
  height: "48",
}

// Button.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string.isRequired,
// };

export default Item;


