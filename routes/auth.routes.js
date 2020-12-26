const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
// const config = require('config')


// /api/auth/register
router.post(
  '/register',
  check('email', 'Некорректный email').isEmail(),
  async (req, res) =>{
    try{
      console.log('Body:', req.body)
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const {name, email} = req.body
      const candidate = await User.findOne({email})

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь уже существует'})
      }

      const user = new User({name, email})

      await user.save()
      res.status(201).json({name: name, userId: user.id, message: 'Пользователь создан'})

    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
    }
  })

// /api/auth/login
router.post('/login',
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  async (req, res) =>{
    try{
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const {email} = req.body


      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
      }

      // const token = jwt.sign(
      //   {userId: user.id},
      //   config.get('jwtSecret'),
      //   {expiresIn: '3h'}
      // )

      res.json({userId: user.id})


    } catch (e) {
      res.status(500).json({message: `Что-то пошло не так, серверная ошибка, ${e.message}`})
    }
  })

module.exports = router