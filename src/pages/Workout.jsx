import React from 'react'
import logoPng from '../assets/img/logo.png'
import anim from '../assets/gif/anim2.gif'
import Item from '../components/Item'
import Bullets from '../components/Bullets'
import Button from '../components/Button'

function Workout() {
  return (
    <div className="background">
      <div className="container">
        <div className="workout-row">
          <div className="workout-left">
            <div className="logo center">
              <img src={logoPng} alt="logo"/>
            </div>
            <div className="animation">
              <img src={anim} alt="anim"/>
            </div>
          </div>
          <div className="workout-right">
            <div className="exercise-title">
              <div className="exercise-title--category">
                <span className="label">категория</span>
                <span>Отжимания</span>
              </div>
              <div className="exercise-title--name">
                <span>Неравномерные отжимания в стойке на руках</span>
              </div>
            </div>
            <div className="exercise-row">
              <div className="exercise-levels">
                <span className="label">выбери уровень</span>
                <Item
                  height="49"
                  level
                >
                  <div className="level-description">
                    <span>Начальный уровень</span>
                    <span className="label">1 сет по 10 повторений</span>
                  </div>

                  <ul className="level-reps">
                    <li className="exercise-reps">10</li>
                  </ul>
                </Item>
                <Item
                  height="49"
                  level
                >
                  <div className="level-description">
                    <span>Продвинутый уровень</span>
                    <span className="label">2 сет по 20 повторений</span>
                  </div>

                  <ul className="level-reps">
                    <li className="exercise-reps">20</li>
                    <li className="exercise-reps">20</li>
                  </ul>
                </Item>
                <Item
                  height="49"
                  level
                >
                  <div className="level-description">
                    <span>Мастер</span>
                    <span className="label">3 сета по 40 повторений</span>
                  </div>

                  <ul className="level-reps">
                    <li className="exercise-reps">40</li>
                    <li className="exercise-reps">40</li>
                    <li className="exercise-reps">40</li>
                  </ul>
                </Item>
              </div>
              <div className="exercise-amount">
                <span className="label">Делаем упражнение и вводим количество сделанных повторений</span>
                <div className="reps-setup">
                  <button className="button--circle minus"><span className="minus">-</span></button>
                  <div className="reps-current"><span>20</span></div>
                  <button className="button--circle"><span>+</span></button>
                </div>
                <Button orange><span>сделал</span></Button>
              </div>
            </div>

          </div>
        </div>
        <div className="workout-descript">
          <p>
            Начинай эту технику из того же верхнего положения, что и полные отжимания (Уровень 5), но руки касаются друг друга. Тебе не обязательно накладывать
            руки друг на друга или делать «бриллиант» между большими и казательными
            пальцами рук, достаточно чтобы кончики указательных пальцев касались. Из
            позиции с выпрямленными руками, опускайся пока грудью слегка не
            коснёшься обратной стороны ладоней. Задержись ненадолго перед отжиманием назад в начальное положение.

          </p>
          <p>
            Плотные отжимания стары как горы. Они жизненно важное упражнение в отжимательной серии, но часто ими пренебрегают в пользу более ярких техник,
            таких как плиометрические отжимания (с хлопками) или отжимания с ногами
            на подставке выше головы. Такое состояние дел это трагедия, потому что плотные отжимания очень важный инструмент для помощи в твоём путешествии к
            овладению отжиманиями на одной руке. Большинство атлетов имеют проблемы
            с отжиманиями на одной руке, потому что им трудно выжать себя из нижней
            позиции, когда рука согнута больше всего. Это происходит потому что их локти
            слабы когда согнуты больше чем на прямой угол. Вследствие положения рук при
            плотных отжиманиях, атлеты естественным образом сгибают локти в нижнем
            положении на больший угол чем в случае полных отжиманий. Это увеличение
            сгибания локтя тренирует трицепсы и укрепляет сухожилия локтей и запястьев.
            В итоге, атлеты которым стало комфортно с этим движением обнаружат отжимания на одной руке гораздо более управляемыми, когда придёт время.
          </p>
          <p>
            Если ты не можешь сделать плотные отжимания с руками касающимися пальцами (как описано выше), просто вернись к полным отжиманиям и сдвигай руки
            на дюйм или два ближе каждую тренировку, поддерживая число повторений достаточно высоким.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Workout

