import React from 'react'
import { useHistory } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'

import logoPng from '../assets/img/logo.png'
import empty from '../assets/img/empty.png'
import Item from '../components/Item'
import Button from '../components/Button'
import Timer from '../components/Timer'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {setExerciseData, setLevel} from '../redux/actions/exercise'


function Workout() {
  const history = useHistory()
  const {request} = useHttp()
  const dispatch = useDispatch()
  const userId = useSelector(({user}) => user.id)
  const {catId, exerciseId, activeLevel, isLoaded} = useSelector(({exercise}) => exercise)
  const {name, category, level1, level2, level3, description, animUri} = useSelector(({exercise}) => exercise)

  const [levels, setLevels] = React.useState(
    [
      {name: 'Начальный уровень', sets: level1},
      {name: 'Продвинутый уровень', sets: level2},
      {name: 'Мастер', sets: level3}
    ]
  )

  React.useEffect(() => {
    const newLevels = levels
    newLevels[0].sets = level1
    newLevels[1].sets = level2
    newLevels[2].sets = level3
    setLevels(newLevels)
  }, [isLoaded])

  const [curReps, setCurReps] = React.useState(null)
  const [curSet, setCurSet] = React.useState(0)
  const [isTimerVis, setTimerVis] = React.useState(false)

  React.useEffect(() => {
    setCurReps(levels[activeLevel].sets[0])
  }, [activeLevel, isLoaded])

  const minusRep = () => {
    setCurReps(prevState => {
      return prevState - 1 < 0 ? 0 : prevState - 1
    })
  }

  const plusRep = () => {
    setCurReps(prevState => prevState + 1)
  }

  const getExercise = async (catId, id) => {
    try {
      const data = await request(`/exercise/${catId}/${id}`)
      dispatch(setExerciseData(data.exerciseData[0]))

    } catch (e) {
      console.log('error', e.message)
    }
  }

  function checkLevel(log) {
    const arrLog = log.sets
    const arrTarget = levels[log.curLev].sets
    for (let i = 0; i < arrLog.length; i++) {
      if (arrLog[i] < arrTarget[i]) {
        return log.curLev
      }
    }
    return log.curLev === 2 ? log.curLev : log.curLev + 1
  }


  const getLastLog = async (catId, exId, userId) => {
    try {
      const data = await request(`/journal/${catId}/${exId}/${userId}`)
      if (data.log) {
        const lvl = checkLevel(data.log)
        console.log('set level', lvl)
        dispatch(setLevel(lvl))
      } else {
        dispatch(setLevel(0))
      }
    } catch (e) {
      console.log('error', e.message)
    }
  }

  React.useEffect(() => {
    async function load() {
      await getExercise(catId, exerciseId)
      await getLastLog(catId, exerciseId, userId)
    }
    load()
  }, [])

  const onActiveLevel = (id) => {
    dispatch(setLevel(id))
    setCurSet(0)
  }

  const onTimer = () => {
    window.scrollTo(0, 0)
    setTimerVis(true)
  }

   const doneCurSet = () => {
    const newLevels = levels
    newLevels[activeLevel].sets[curSet] = curReps
    setLevels(newLevels)
    const setsNum = levels[activeLevel].sets.length
    if (setsNum - (curSet + 1) > 0) {
      setCurSet(prevState => prevState + 1)
    } else {
      userId && saveLog()
      history.push('/list')
    }
  }

  const levsBuilder = (lev) => {
    if (lev.sets[0] === 0) {
      return `1 сет, держать позицию ${lev.sets[1]} секунд`
    } else {
      return `${lev.sets.length} ${lev.sets.length === 1 ? 'сет' : 'сета'} по ${lev.sets[0]} повторений`
    }
  }

  const repsBuilder = (lev, idLev, idSet) => {
    if (lev.sets[0] === 0) {
      return activeLevel === idLev ? 'exercise-reps active' : 'exercise-reps'
    }
    if (activeLevel === idLev) {
      return idSet === curSet ? 'exercise-reps active'
        : idSet < curSet ? 'exercise-reps done' : 'exercise-reps'
    }
    return 'exercise-reps'
  }


  const saveLog = async () => {
    try {
      const data = await request('/journal/log', 'POST',
        {
          userId: userId,
          catId,
          exId: exerciseId,
          exercise: name,
          curLev: activeLevel,
          sets: levels[activeLevel].sets
        })
      console.log('log', data)
    } catch (e) {
      console.log('error', e.message)
    }
  }

  if (!isLoaded) {
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
                <img src={empty} alt="anim"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
              <img src={process.env.PUBLIC_URL + animUri} alt="anim"/>
            </div>
          </div>
          <div className="workout-right">
            <div className="exercise-title">
              <div className="exercise-title--category">
                <span className="label">категория</span>
                <span>{category}</span>
              </div>
              <div className="exercise-title--name">
                <span className="label">упражнение</span>
                <span>{name}</span>
              </div>
            </div>
            <div className="exercise-row">

              <div className="exercise-levels">
                <span className="label label-levels">выбери уровень</span>

                {levels.map((level, idLev) => (
                  <Item
                    key={idLev}
                    height="49"
                    level
                    active={activeLevel === idLev}
                    onClick={onActiveLevel}
                    id={idLev}
                  >
                    <div className="level-description">
                      <span>{level.name}</span>
                      <span className="label">
                        {levsBuilder(level)}
                      </span>
                    </div>

                    <ul className="level-reps">
                      {level.sets.map((set, idSet) => (
                        set === 0 ? '' :
                          <li
                            key={idSet}
                            className={repsBuilder(level, idLev, idSet)}
                          >
                            {set}
                          </li>
                      ))}
                    </ul>
                  </Item>
                ))}
              </div>

              {curReps === 0 ? (
                  <div className="exercise-amount timer">
                    <Button
                      className={isTimerVis ? 'hide' : ''}
                      height={50}
                      orange
                      onClick={onTimer}
                    >
                      <span>начать отсчёт времени</span>
                    </Button>
                  </div>
                ) :
                (
                  <div className="exercise-amount">
                    <span className="label">сделай упражнение и введи количество сделанных повторений</span>
                    <div className="reps-setup">
                      <button
                        className="button--circle minus"
                        onClick={minusRep}
                      >
                        <span className="minus">-</span>
                      </button>
                      <div className="reps-current"><span>{curReps}</span></div>
                      <button
                        className="button--circle"
                        onClick={plusRep}
                      >
                        <span>+</span>
                      </button>
                    </div>
                    <Button
                      orange
                      onClick={doneCurSet}
                    >
                      <span>сделал</span>
                    </Button>
                  </div>
                )}
            </div>

          </div>
        </div>
        <div className="workout-descript">
          {description.map((item, id) => (
            <p key={id}>{item}</p>
          ))}
        </div>
      </div>
      <Timer
        seconds={levels[activeLevel].sets[1]}
        isVisible={isTimerVis}/>
    </div>
  )
}

export default Workout

