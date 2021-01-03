const {Router} = require('express')
const router = Router()
const Exercise = require('../models/Exercise')


// /categories
router.get('/categories', async (req, res) =>{
    try{
      console.log(req)
      const categories = await Exercise.distinct("category")
      res.status(200).json({categories, message: 'Все категории'})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })

// /category
router.get('/category/:id', async (req, res) => {
    try{
      const categoryNum = req.params.id
      const categoryExercises = await Exercise.find(
        {"category.id": categoryNum},
        {"exercise.name": true, _id: false})
      res.status(200).json({categoryExercises, message: 'Выборка по категории'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })

// /exercise/${catId}/${id}
router.get('/exercise/:catId/:id', async (req, res) => {
    try{
      const exerciseData = await Exercise.find(
        {"category.id": req.params.catId, "exercise.id": req.params.id})
      res.status(200).json({exerciseData, message: 'Выборка упражнения'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })


module.exports = router