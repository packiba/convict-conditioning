const {Router} = require('express')
const router = Router()
const WorkoutLog = require('../models/WorkoutLog')


// /log
router.post('/log', async (req, res) => {
  try {

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
  try {
    const data = await WorkoutLog.find(
      {catId: req.params.catId, exId: req.params.exId, userId: req.params.userId},
      {curLev: 1, sets: 1, _id: 0})
      .sort({$natural: -1}).limit(1)
    const log = data[0]
    res.status(200).json({log, message: 'Текущий уровень в последнем логе упражнения'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})

// /journal/account/${userId}
router.get('/account/:userId', async (req, res) => {
  try {
    const data = await WorkoutLog.find({userId: req.params.userId}).sort({$natural: -1})
    const logs = data.map(log => {
      const d = log._id.getTimestamp()
      return {
        date: (d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()),
        catId: log.catId,
        exId: log.exId,
        curLev: log.curLev,
        sets: log.sets
      }
    })
    res.status(200).json({logs, message: 'Выборка записей текущено аккаунта'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})

// /journal/${catId}/${userId}
router.get('/:catId/:userId', async (req, res) => {
  try {
    const data = await WorkoutLog.find(
      {catId: req.params.catId, userId: req.params.userId},
      {curLev: 1, exId: 1, _id: 0})
      .sort({$natural: -1})
    const levels = []
    for (let i = 0; i < 10; i++) {
      const exLvl = []
      data.forEach(log => {
        if (log.exId === i) {
          exLvl.push(log.curLev)
        }
      })
      levels.push(exLvl.length !== 0 ? exLvl[0] : -1)
    }
    res.status(200).json({levels, message: 'Список упражнений с текущим уровнем'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})


// /journal/${userId}
router.delete('/:userId', async (req, res) => {
  try {
    console.log('userId', req.params.userId)
    const data = await WorkoutLog.remove({userId: req.params.userId})

    res.status(200).json({message: 'Записи пользователя очищены'})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})


module.exports = router