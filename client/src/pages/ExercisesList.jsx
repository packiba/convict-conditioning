import React from 'react'
import logoPng from '../assets/img/logo.png'
import Item from '../components/Item'
import Bullets from '../components/Bullets'
import {Link} from 'react-router-dom'

function ExercisesList() {





  return (
    <div className="background">
        <div className="container">
          <div className="listpage-header">
            <Link to="/">
              <div className="logo center">
                <img src={logoPng} alt="logo"/>
              </div>
            </Link>
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
                  <Link to="/workout" key={id}>
                    <Item
                      key={id}
                      height="43"
                    >
                      <Bullets/>
                      <span>Неравномерные отжимания в стойке на руках</span>
                    </Item>
                  </Link>
                )
              })}
            </div>

          </div>
        </div>
    </div>
  )
}

export default ExercisesList