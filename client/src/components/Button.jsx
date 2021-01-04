import classNames from 'classnames'


function Button({onClick, className, height, circle, orange, children}) {

  return (
    <button
      onClick={onClick}
      className={classNames(
        'button',
        className,
        {'button--circle': circle},
        {'button--orange': orange}
      )}
      style={{height: `${height}px`}}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  height: '48',
}

// Button.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string.isRequired,
// };

export default Button
