import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";


import logoPng from "../assets/img/logo.png"
import Button from '../components/Button'
import PopupHome from '../components/PopupHome'


function Home() {
  const user = useSelector(({ user }) => user);


  const [popupVisibility, setPopupVis] = React.useState(false)
  const [popupType, setPopupType] = React.useState('')
  const userName = user.name
  const textPrompt = userName === 'чемпион' ? 'Войди в свою учётную запись или зарегистрируйся' : ''

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

  const onClosePopup = () => {
    setPopupVis(false)
  }

    React.useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const  onButtonsAccount = e.target.className
        ? e.target.className.split(' ').includes('btn-account')
        : false
      const  onPopup = e.target.className
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
            <Button className="btn-account" height="48" onClick={onOpenPopupReg}>
              <span className="btn-account" >Регистрация</span>
            </Button>
            <Button className="btn-account"  height="48" onClick={onOpenPopupLogin}>
              <span className="btn-account" >Вход</span>
            </Button>
          </div>
          <div className="greeting">
            <h2>Привет {userName}</h2>
            <p>{textPrompt}</p>
          </div>
          <div className="start">
            <p>Нажми если хочешь начать  заниматься по программе</p>
            <Link to="/workout">
              <Button
                className="button-start"
                height="86"
              ><span>Начать тренировку по программе</span></Button>
            </Link>
          </div>
          <div className="start">
            <p>Нажми если просто хочешь поделать определённые упражнения</p>
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