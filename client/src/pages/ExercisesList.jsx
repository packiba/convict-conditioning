import React from 'react'
import logoPng from '../assets/img/logo.png'
import Item from '../components/Item'
import Bullets from '../components/Bullets'
import {Link} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'
import {useDispatch, useSelector} from 'react-redux'
import {setCategoryActive, setCategoryList} from '../redux/actions/categories'
import {setExerciseActive} from '../redux/actions/exercise'

function ExercisesList() {
  const {request} = useHttp()
  const dispatch = useDispatch();
  const categoriesList = useSelector(({ categories }) => categories.categoriesList);
  const activeCategory = useSelector(({ categories }) => categories.activeCategory);

  const [exerList, setExerList] = React.useState([])

  const onActiveCategory = async (id) => {
    console.log('id', id)
    dispatch(setCategoryActive(id))
    const data = await getCategoryExercises(id)
    console.log(data)
    setExerList(data)

  }

  const onActiveExer = async (id) => {
    dispatch(setExerciseActive(id))
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
      console.log(data.categories)
      const catList = []
      data.categories.map(item => catList.push(item.name))
      console.log('catList', catList)
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
              {exerList && exerList.map((exer, id) => {
                return (
                  <Link to="/workout" key={id}>
                    <Item
                      key={id}
                      height="43"
                      onClick={onActiveExer}
                    >
                      <Bullets/>
                      <span>{exer}</span>
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