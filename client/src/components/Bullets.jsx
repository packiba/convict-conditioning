import classNames from 'classnames'


function Bullets({levelList}) {
  return (
    <div className="bullets">
      <div
        className={classNames(
          'dot',
          {'active-dot': levelList[0]}
        )}
      ></div>
      <div
        className={classNames(
          'dot',
          {'active-dot': levelList[1]}
        )}
      ></div>
      <div
        className={classNames(
          'dot',
          {'active-dot': levelList[2]}
        )}
      ></div>
    </div>
  )
}

Bullets.defaultProps = {
  levelList: [false, false, false],
}

export default Bullets


