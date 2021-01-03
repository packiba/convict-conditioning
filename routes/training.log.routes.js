const {Router} = require('express')
const router = Router()
const WorkoutLog = require('../models/WorkoutLog')


// /log
router.post('/log',  async (req, res) => {
    try{

      const {catId, exId, curLev, sets, userId} = req.body

      const log = new WorkoutLog({catId, exId, curLev: curLev, sets, userId})

      await log.save()
      res.status(201).json({category: catId, exercise: exId, userId, message: 'Создана запись тренировки'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })

// /journal/${catId}/${exId}/${userId}
router.get('/:catId/:exId/:userId', async (req, res) => {
  try{
    const data = await WorkoutLog.find(
      {catId: req.params.catId, exId: req.params.exId, userId: req.params.userId},
      {curLev: 1, sets: 1, _id: 0})
      .sort({$natural: -1}).limit(1)
    const log = data[0]
    console.log('level and sets', log)
    res.status(200).json({log, message: 'Текущий уровень в последнем логе упражнения'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})



module.exports = router