const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userValidations = require('../validations/userValidation')
const auth = require('../middlewares/auth')

// const checkrole = require('../middlewares/checkRole')

router.post('/register', userValidations.register, userController.register)
router.post('/login', userValidations.login, userController.login)
router.post('/logout', auth, userController.logout)
router.get('/', auth, userController.getprofile)


module.exports = router