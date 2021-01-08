import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import logoPng from '../assets/img/logo.png'
import Button from '../components/Button'
import {useHttp} from '../hooks/http.hook'


function AccountPage() {
  const user = useSelector(({user}) => user)
  const {request} = useHttp()

  const [logs, setLogs]  = React.useState({})

  // /journal/account/${userId}
  const getUserLogs = async () => {
    try {
      const data = await request(`/journal/account/${user.id}`)
      setLogs(data)
      console.log('user logs', sortLogs(data))
    } catch (e) {
      console.log('error', e.message)
    }
  }

  function sortLogs(logsArr) {

  }

  const delLogs = async () => {
    try {
      const message = await request(`/journal/${user.id}`, 'DELETE')
      console.log(message)
    } catch (e) {
      console.log('error', e.message)
    }
  }

  React.useEffect(() => {
    async function load() {
      await getUserLogs()
      console.log('user id', user.id)
    }
    load()
  }, [])

  return (
    <div className="background">
      <div className="container">
        <div className="account-header">
          <Link to="/">
            <div className="logo account-logo">
              <img src={logoPng} alt="logo"/>
            </div>
          </Link>
        </div>
        <section className="account">
          <h1>Личный кабинет</h1>
          <h2>{user.name}</h2>
          <Button
            className='btn-account'
            height="48"
            onClick={delLogs}
          >

            <span className="btn-account">Очистить мою историю</span>
          </Button>
        </section>
      </div>
    </div>
  )
}

export default AccountPage