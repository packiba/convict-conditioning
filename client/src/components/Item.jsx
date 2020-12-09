import classNames from "classnames";
import React from 'react'

function Item({ id, className, height, big, level, children }) {
  console.log(id)

  const [activeCategory, setActiveCategory] = React.useState(false)

  const onActiveCategory = () => {
    setActiveCategory(true)
  }

  return (
    <button
      onClick={onActiveCategory}
      className={classNames(
        "item",
        className,
        {"active": activeCategory},
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


