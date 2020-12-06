import classNames from "classnames";

function Item({ onClick, className, height, big, level, children }) {

  return (
    <button
      onClick={onClick}
      className={classNames(
        "item",
        className,
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


