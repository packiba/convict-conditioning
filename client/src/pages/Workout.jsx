import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import logoPng from '../assets/img/logo.png'
import empty from '../assets/img/empty.png'
import Item from '../components/Item'
import Button from '../components/Button'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {setExerciseData, setLevel} from '../redux/actions/exercise'


function Workout() {
  const {request} = useHttp()
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.id);
  const {catId, exerciseId, activeLevel, isLoaded} = useSelector(({ exercise }) => exercise);
  const {name, category, level1, level2, level3, description, animUri} = useSelector(({ exercise }) => exercise);

  const [levels, setLevels] = React.useState(
[
          {name: 'Начальный уровень', sets: level1},
          {name: 'Продвинутый уровень', sets: level2},
          {name: 'Мастер', sets: level3}
        ]
  )

  const [curReps, setCurReps] = React.useState(0)
  const [curSet, setCurSet] = React.useState(0)

  React.useEffect(() => {
    setCurReps(levels[activeLevel].sets[0])
  }, [activeLevel, isLoaded])

  const minusRep = () => {
    setCurReps(prevState => {
      return prevState - 1 < 0 ? 0 : prevState -1
    })
  }

  const plusRep = () => {
    setCurReps(prevState => prevState+1)
  }

  const getExercise = async (catId, id) => {
    try {
      const data = await request(`/exercise/${catId}/${id}`)
      dispatch(setExerciseData(data.exerciseData[0]))

    } catch (e) {
      console.log('error', e.message)
    }
  }

  function checkLevel(obj) {
    const arrLog = obj.sets
    const arrTarget = levels[obj.curLev].sets
    for (let i=0; i < arrLog.length; i++) {
      if (arrLog[i] < arrTarget[i]) {
        return obj.curLev
      }
    }
    return obj.curLev === 2 ? obj.curLev : obj.curLev + 1
  }


  const getLastLog = async (catId,  exId, userId) => {
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

  React.useEffect(  () => {
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

  const doneCurSet = () => {
    const newLevels = levels
    newLevels[activeLevel].sets[curSet] = curReps
    setLevels(newLevels)
    const setsNum = levels[activeLevel].sets.length
    if (setsNum - (curSet + 1) > 0) {
      setCurSet(prevState => prevState + 1)
    } else {
      saveLog()
    }
  }

  const repsBuilder = (idLev, idSet) => {
    if (activeLevel === idLev) {
      return idSet === curSet ? 'exercise-reps active'
        : idSet < curSet ? 'exercise-reps done' : 'exercise-reps'
    }
    return "exercise-reps"
  }

  const saveLog = async () => {
    try {
      const data = await request('/journal/log', 'POST',
        {
          userId: userId,
          catId,
          exId: exerciseId,
          curLev: activeLevel,
          sets: levels[activeLevel].sets
        })
      console.log('log', data)
    } catch (e) {
      console.log('error', e.message)
    }
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

                {isLoaded && levels.map((level, idLev) => (
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
                        {`${level.sets.length} ${level.sets.length === 1 ? 'сет' : 'сета'} по ${level.sets[0]} повторений`}
                      </span>
                    </div>

                    <ul className="level-reps">
                      {level.sets.map((set, idSet) => (
                        <li
                          key={idSet}
                          className={repsBuilder(idLev, idSet)}
                        >
                          {set}
                        </li>
                      ))}
                    </ul>
                  </Item>
                ))}

              </div>
              <div className="exercise-amount">
                <span className="label">Делаем упражнение и вводим количество сделанных повторений</span>
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
                {levels[activeLevel].sets.length-curSet === 1
                ? (<Link to='/list'>
                    <Button
                      orange
                      onClick={doneCurSet}
                    >
                      <span>сделал</span>
                    </Button>
                  </Link>
                  )
                : (<Button
                    orange
                    onClick={doneCurSet}
                  >
                    <span>сделал</span>
                  </Button>)}
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

