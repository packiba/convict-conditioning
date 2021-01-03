const {Router} = require('express')
const router = Router()
const WorkoutLog = require('../models/WorkoutLog')


// /log
router.post(
  '/',
  async (req, res) =>{
    try{
      console.log('Logging:', req.body)

      const {catId, exId, level, sets, userId} = req.body

      const log = new WorkoutLog({catId, exId, curLev: level, sets, userId})

      await log.save()
      res.status(201).json({category: catId, exercise: exId, userId, message: 'Создана запись тренировки'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })



module.exports = router