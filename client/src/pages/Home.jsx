import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


import logoPng from '../assets/img/logo.png'
import Button from '../components/Button'
import PopupHome from '../components/PopupHome'
import {AuthContext} from '../context/AuthContext'
import {resetUser} from '../redux/actions/user'


function Home() {
  const auth = React.useContext(AuthContext)
  const dispatch = useDispatch()

  const user = useSelector(({user}) => user)
  const isLogin = !user.id

  const [popupVisibility, setPopupVis] = React.useState(false)
  const [popupType, setPopupType] = React.useState('')
  const userName = user.name
  const textPrompt = isLogin ? 'Войди в свою учётную запись или зарегистрируйся' : ''

  const onOpenPopupReg = () => {
    setPopupVis(true)
    setPopupType('reg')
    console.log('open reg')
  }

  const onOpenPopupLogin = () => {
    setPopupVis(true)
    setPopupType('login')
    console.log('open login')
  }

  const onLogout = () => {
    auth.logout()
    dispatch(resetUser)
    console.log('open logout')
  }

  const onClosePopup = () => {
    setPopupVis(false)
  }

  React.useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const onButtonsAccount = e.target.className
        ? e.target.className.split(' ').includes('btn-account')
        : false
      const onPopup = e.target.className
        ? e.target.className.split(' ').includes('pu')
        : false
      if (!onPopup && !onButtonsAccount) {
        onClosePopup()
      }
    })
  }, [])


  return (
    <div className="background">
      <div className="background-img">
        <div className="container">
          <div className="row-home">
            <div className="logo">
              <img src={logoPng} alt="logo"/>
            </div>
            <Button
              className={isLogin ? 'btn-account' : 'btn-account hide'}
              height="48"
              onClick={onOpenPopupReg}
            >
              <span className="btn-account">Регистрация</span>
            </Button>
            <Button
              className={isLogin ? 'btn-account' : 'btn-account hide'}
              height="48"
              onClick={onOpenPopupLogin}
            >
              <span className="btn-account">Вход</span>
            </Button>
            <Link to='/account'>
              <Button
                className={isLogin ? 'btn-account hide' : 'btn-account'}
                height="48"
              >
                <span className="btn-account">Кабинет</span>
              </Button>
            </Link>
            <Button
              className={isLogin ? 'btn-account hide' : 'btn-account'}
              height="48" onClick={onLogout}
            >
              <span className="btn-account">Выход</span>
            </Button>
          </div>
          <div className="greeting">
            <h2>Привет {userName}</h2>
            <p>{textPrompt}</p>
          </div>
          <div className="start">
            <p>нажми если хочешь начать заниматься по программе</p>
            <Link to="/workout">
              <Button
                className="button-start"
                height="86"
              ><span>Начать тренировку по программе</span></Button>
            </Link>
          </div>
          <div className="start">
            <p>нажми если просто хочешь поделать определённые упражнения</p>
            <Link to="/list">
              <Button className="button-start" height="86"><span>Открыть список упражнений</span></Button>
            </Link>
          </div>
          <PopupHome
            onClosePopup={onClosePopup}
            popupVisibility={popupVisibility}
            popupType={popupType}
          />
        </div>
      </div>
    </div>

  )
}

export default Home