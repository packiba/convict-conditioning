import React from 'react'
import logoPng from '../assets/img/logo.png'
import Item from '../components/Item'
import Bullets from '../components/Bullets'

function ExercisesList() {
  return (
    <div className="background">
        <div className="container">
          <div className="listpage-header">
            <div className="logo center">
              <img src={logoPng} alt="logo"/>
            </div>
          </div>
          <div className="listpage-content">
            <div className="listpage-categories">
              {Array(6).fill(0).map((_, id) => {
                return (
                  <Item
                    key={id}
                    height="57"
                    big
                  >
                    <span>Отжимания</span>
                  </Item>
                )
              })}
            </div>
            <div className="listpage-exercises">
              {Array(10).fill(0).map((_, id) => {
                return (
                  <Item
                    key={id}
                    height="43"
                  >
                    <Bullets/>
                    <span>Неравномерные отжимания в стойке на руках</span>
                  </Item>
                )
              })}
            </div>

          </div>
        </div>
    </div>
  )
}

export default ExercisesList