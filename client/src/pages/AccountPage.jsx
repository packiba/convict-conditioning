import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import logoPng from '../assets/img/logo.png'
import Button from '../components/Button'
import {useHttp} from '../hooks/http.hook'


function AccountPage() {
  const user = useSelector(({user}) => user)
  const {request} = useHttp()

  const [containerHeight, setContainerHeight] = React.useState('auto')
  const [logs, setLogs] = React.useState([])
  const [dom, setDom] = React.useState([])

  // /journal/account/${userId}
  const getUserLogs = async () => {
    try {
      const data = await request(`/journal/account/${user.id}`)
      setLogs(sortLogs(data.logs))
    } catch (e) {
      console.log('error', e.message)
    }
  }

  function levelName(num) {
    switch (num) {
      case 0:
        return 'Начальный уровень'
      case 1:
        return 'Продвинутый уровень'
      case 2:
        return 'Мастер'
    }
  }

  const sortLogs = (logsArr) => {
    const dates = []
    const table = logsArr.map((log, _, arr) => {
      if (!dates.includes(log.date)) {
        dates.push(log.date)
        return {
          date: log.date, info: arr.filter(date => log.date === date.date).map(log => {
            return {catId: log.catId, exercise: log.exName, curLev: log.curLev, sets: log.sets}
          })
        }
      }
    }).filter(log => log)
    return table
  }

  const delLogs = async () => {
    try {
      const message = await request(`/journal/${user.id}`, 'DELETE')
      setLogs([])
    } catch (e) {
      console.log('error', e.message)
    }
  }

  React.useEffect(() => {
    async function load() {
      await getUserLogs()
    }

    load()
  }, [])

  React.useEffect(() => {
    console.log('my logs', logs)
    if (logs.length != 0) {
      setContainerHeight('auto')
      setDom(logs.map((log, i) => {
        return (
          <ul key={i} className='log'>
            <p>{log.date}</p>
            {log.info.map((item, idx) => {
              return (
                <li key={idx}>
                  <span className='log__exercise'>{item.exercise}</span>
                  <span className='log__level'>{levelName(item.curLev)}</span>
                  <span className='log__sets'>{item.sets.join(', ')}</span>
                </li>
              )
            })}
          </ul>
        )
      }))
    } else {
      setDom(<h3 className='logs__empty'>Записей нет</h3>)
      setContainerHeight('100vh')
    }
  }, [logs])

  return (
    <div className="background">
      <div className="container" style={{height: containerHeight}}>
        <div className="account-header">
          <Link to="/">
            <div className="logo account-logo">
              <img src={logoPng} alt="logo"/>
            </div>
          </Link>
        </div>
        <section className="account">
          <h2>{user.name}, вот твой</h2>
          <h1>дневник тренировок</h1>
          <div className='logs'>
            {dom}
          </div>
          {logs.length !== 0 ? <Button
            className='btn-account'
            height="48"
            onClick={delLogs}
          >
            <span className="btn-account">Очистить мою историю</span>
          </Button> : ''}
        </section>
      </div>
    </div>
  )
}

export default AccountPage