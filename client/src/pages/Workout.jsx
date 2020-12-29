import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import logoPng from '../assets/img/logo.png'
import empty from '../assets/img/empty.png'
import Item from '../components/Item'
import Button from '../components/Button'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {setExercise, setExerciseData, setLevel} from '../redux/actions/exercise'

function Workout() {
  const {request} = useHttp()
  const dispatch = useDispatch();
  const {catId, exerciseId, activeLevel, isLoaded} = useSelector(({ exercise }) => exercise);
  const {name, category, level1, level2, level3, description, animUri} = useSelector(({ exercise }) => exercise);


  const getExercise = async (catId, id) => {
    try {
      const data = await request(`/exercise/${catId}/${id}`)
      dispatch(setExerciseData(data.exerciseData[0]))
    } catch (e) {
      console.log('error', e.message)
    }
  }

  React.useEffect( () => {
    getExercise(catId, exerciseId)
  }, [])

  const onActiveLevel = (id) => {
    dispatch(setLevel(id))
  }


  return (
    <div className="background">
      <div className="container">

        <div className="workout-row">
          <div className="workout-left">
            <Link to="/">
              <div className="logo center">
                <img src={logoPng} alt="logo"/>
              </div>
            </Link>
            <div className="animation">
              <img src={isLoaded ? process.env.PUBLIC_URL + animUri : empty} alt="anim"/>
            </div>
          </div>
          <div className="workout-right">
            <div className="exercise-title">
              <div className="exercise-title--category">
                <span className="label">категория</span>
                <span>{isLoaded ? category : ''}</span>
              </div>
              <div className="exercise-title--name">
                <span>{isLoaded ? name : ''}</span>
              </div>
            </div>
            <div className="exercise-row">
              <div className="exercise-levels">
                <span className="label">выбери уровень</span>
                <Item
                  height="49"
                  level
                  active={activeLevel === 0}
                  onClick={onActiveLevel}
                  id={0}
                >
                  <div className="level-description">
                    <span>Начальный уровень</span>
                    <span className="label">{isLoaded ? `${level1.length} сет по ${level1[0]} повторений` : ''}</span>
                  </div>

                  <ul className="level-reps">
                    {isLoaded && level1.map((item, id) => (
                      <li key={id} className="exercise-reps">{item}</li>
                    ))}
                  </ul>
                </Item>
                <Item
                  height="49"
                  level
                  active={activeLevel === 1}
                  onClick={onActiveLevel}
                  id={1}
                >
                  <div className="level-description">
                    <span>Продвинутый уровень</span>
                    <span className="label">{isLoaded ? `${level2.length} сета по ${level2[0]} повторений` : ''}</span>
                  </div>

                  <ul className="level-reps">
                    {isLoaded && level2.map((item, id) => (
                      <li key={id} className="exercise-reps">{item}</li>
                    ))}
                  </ul>
                </Item>
                <Item
                  height="49"
                  level
                  active={activeLevel === 2}
                  onClick={onActiveLevel}
                  id={2}
                >
                  <div className="level-description">
                    <span>Мастер</span>
                    <span className="label">{isLoaded ? `${level3.length} сета по ${level3[0]} повторений` : ''}</span>
                  </div>

                  <ul className="level-reps">
                    {isLoaded && level3.map((item, id) => (
                      <li key={id} className="exercise-reps">{item}</li>
                    ))}
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
          {isLoaded && description.map((item, id) => (
            <p key={id}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workout

