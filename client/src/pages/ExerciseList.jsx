import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


import logoPng from '../assets/img/logo.png'
import spinner from '../assets/img/spinner.gif'
import Item from '../components/Item'
import Bullets from '../components/Bullets'
import {useHttp} from '../hooks/http.hook'
import {setCategoryActive, setCategoryList} from '../redux/actions/categories'
import {setExercise} from '../redux/actions/exercise'


function ExerciseList() {
  const {request} = useHttp()
  const dispatch = useDispatch()
  const userId = useSelector(({user}) => user.id)
  const categoryList = useSelector(({categories}) => categories.categoryList)
  const activeCategory = useSelector(({categories}) => categories.activeCategory)
  const activeCategoryId = useSelector(({categories}) => categories.activeCategoryId)

  const [containerHeight, setContainerHeight] = React.useState('100vh')
  const [exerList, setExerList] = React.useState([])
  const [levels, setLevels] = React.useState([])

  const onActiveCategory = async (id) => {
    dispatch(setCategoryActive(id))
    setExerList(new Array(10).fill(''))
    const data = await getCategoryExercises(id)
    setExerList(data)
    document.getElementById('exercises').scrollIntoView(
      {behavior: 'smooth', block: 'start'}
    )
  }

  const onActiveExercise = id => {
    dispatch(setExercise(id, activeCategoryId))
  }

  const getCategoryExercises = async (categoryId) => {
    await getCategoryLog(categoryId, userId)
    try {
      const data = await request(`/category/${categoryId}`)
      return data.categoryExercises.map(item => item.exercise.name)
    } catch (e) {
      console.log('error', e.message)
    }
  }

  const getCategoryLog = async (catId, userId) => {
    try {
      const data = await request(`/journal/${catId}/${userId}`)
      setLevels(data.levels)
    } catch (e) {
      console.log('error', e.message)
    }
  }

  const getAllCategories = async () => {
    try {
      const data = await request('/categories')
      const catList = []
      data.categories.map(item => catList.push(item.name))
      dispatch(setCategoryList(catList))
    } catch (e) {
      console.log('error', e.message)
    }
  }

  React.useEffect(() => {
    async function load() {
      await getAllCategories()
      setExerList(await getCategoryExercises(activeCategoryId))
      setContainerHeight('auto')
    }

    load()
  }, [])

  const bulletsBuilder = (lvl) => {
    switch (lvl) {
      case 0:
        return [true, false, false]
      case 1:
        return [true, true, false]
      case 2:
        return [true, true, true]
      case -1:
        return [false, false, false]
    }
  }


  return (
    <div className="background">
      <div className="container" style={{height: containerHeight}}>
        <div className="listpage-header">
          <Link to="/">
            <div className="logo center">
              <img src={logoPng} alt="logo"/>
            </div>
          </Link>
        </div>
        <div className="listpage-content">
          <div className="listpage-categories">
            <span className='label'>список категорий</span>
            {categoryList.map((category, id) => {
              return (
                <Item
                  onClick={onActiveCategory}
                  key={id}
                  id={id}
                  height="57"
                  big
                  active={activeCategory[id]}
                >
                  <span>{category}</span>
                </Item>
              )
            })}
          </div>
          <div className="listpage-exercises" id='exercises'>
            <span className='label'>упражнения выбранной категории</span>
            {exerList && exerList.map((exercise, id) => {
              return (
                <Link to="/workout" key={id}>
                  <Item
                    key={id}
                    id={id}
                    height="43"
                    onClick={onActiveExercise}
                  >
                    <Bullets
                      levelList={bulletsBuilder(levels[id])}
                    />
                    {exercise === '' ? <img src={spinner} width="20" alt="logo"/> : <span>{exercise}</span>}
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

export default ExerciseList