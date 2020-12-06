import logoPng from "../assets/img/logo.png"
import React from 'react'

import Button from '../components/Button'

function Home() {
  const userName = 'чемпион'

  return (
    <div className="background">
      <div className="background-img">
        <div className="container">
          <div className="row-home">
            <div className="logo">
              <img src={logoPng} alt="logo"/>
            </div>
            <Button height="48">
              <span>Регистрация</span>
            </Button>
            <Button height="48">
              <span>Вход</span>
            </Button>
          </div>
          <div className="greeting">
            <h2>Привет {userName}</h2>
            <p>Войди в свою учётную запись или зарегистрируйся</p>
          </div>
          <div className="start">
            <p>Нажми если хочешь начать  заниматься по программе</p>
            <Button
              className="button-start"
              height="86"
            ><span>Начать тренировку по программе</span></Button>
          </div>
          <div className="start">
            <p>Нажми если просто хочешь поделать определённые упражнения</p>
            <Button
              className="button-start"
              height="86"><span>Открыть список упражнений</span></Button>
          </div>
          <div className="popup-home hide">
            <input
              placeholder="Введи своё имя"
              id="user-name"
              type="text"
              name="user-name"
              className="user-name"
              maxLength="30"
              autoComplete="off"
            />
            <input
              placeholder="Введи E-mail"
              id="email"
              type="email"
              name="email-name"
              className="email"
              maxLength="30"
              autoComplete="off"
            />
            <div className="popup-buttons">
              <Button height="48">
                <span>Отмена</span>
              </Button>
            <Button height="48">
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