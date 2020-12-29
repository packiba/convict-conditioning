import React from 'react'
import logoPng from '../assets/img/logo.png'
import Item from '../components/Item'
import Bullets from '../components/Bullets'
import {Link} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'
import {useDispatch, useSelector} from 'react-redux'
import {setCategoryActive, setCategoryList} from '../redux/actions/categories'
import {setExercise} from '../redux/actions/exercise'

function ExercisesList() {
  const {request} = useHttp()
  const dispatch = useDispatch();
  const categoriesList = useSelector(({ categories }) => categories.categoriesList);
  const activeCategory = useSelector(({ categories }) => categories.activeCategory);
  const activeCategoryId = useSelector(({ categories }) => categories.activeCategoryId);

  const [exerList, setExerList] = React.useState([])

  const onActiveCategory = async (id) => {
    dispatch(setCategoryActive(id))
    const data = await getCategoryExercises(id)
    setExerList(data)
  }

  const onActiveExercise = (id) => {
    dispatch(setExercise(id, activeCategoryId))
  }

  const getCategoryExercises = async (categoryId) => {
    try {
      const data = await request(`/category/${categoryId}`)
      return data.categoryExercises.map(item => item.exercise.name)
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

  React.useEffect(async () => {
    getAllCategories()
    setExerList(await getCategoryExercises(0))
  }, [])


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
              {categoriesList.map((category, id) => {
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
            <div className="listpage-exercises">
              {exerList && exerList.map((exercise, id) => {
                return (
                  <Link to="/workout" key={id}>
                    <Item
                      key={id}
                      id={id}
                      height="43"
                      onClick={onActiveExercise}
                    >
                      <Bullets/>
                      <span>{exercise}</span>
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