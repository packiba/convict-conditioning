import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import classNames from 'classnames'

import logoPng from "../assets/img/logo.png"
import Button from '../components/Button'

function Home() {
  const userName = useSelector(({ user }) => user.userName);
  // const email = useSelector(({ user }) => user.email);


  const [popupVis, setPopupVis] = React.useState(false)

  const onOpenPopup = () => {
    setPopupVis(true)
    console.log('open')
  }

  const onClosePopup = () => {
    console.log('close')
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
            <Button className="btn-account" height="48" onClick={onOpenPopup}>
              <span className="btn-account" >Регистрация</span>
            </Button>
            <Button className="btn-account"  height="48" onClick={onOpenPopup}>
              <span className="btn-account" >Вход</span>
            </Button>
          </div>
          <div className="greeting">
            <h2>Привет {userName}</h2>
            <p>Войди в свою учётную запись или зарегистрируйся</p>
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


          <div
            className={classNames(
              "popup-home",
              "pu",
              {"hide": !popupVis}
            )}
          >
            <input
              placeholder="Введи своё имя"
              id="user-name"
              type="text"
              name="user-name"
              className="user-name pu"
              maxLength="30"
              autoComplete="off"
            />
            <input
              placeholder="Введи E-mail"
              id="email"
              type="email"
              name="email"
              className="email pu"
              maxLength="30"
              autoComplete="off"
            />
            <div className="popup-buttons">
              <Button height="48" onClick={onClosePopup}>
                <span>Отмена</span>
              </Button>
              <Button height="48" onClick={onClosePopup}>
                <span>Готово</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home