import classNames from "classnames";

function Bullets({activeList}) {
  return (
    <div className="bullets">
      <div
        className={classNames(
          "dot",
          {"active-dot": activeList[0]}
        )}
      ></div>
      <div
        className={classNames(
          "dot",
          {"active-dot": activeList[1]}
        )}
      ></div>
      <div
        className={classNames(
          "dot",
          {"active-dot": activeList[2]}
        )}
      ></div>
    </div>
  );
}

Bullets.defaultProps = {
  activeList: [true, false, false],
}

// Button.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string.isRequired,
// };

export default Bullets;


