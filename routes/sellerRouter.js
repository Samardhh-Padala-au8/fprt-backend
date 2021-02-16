const express = require('express')
const router = express.Router()
const sellerController = require('../controllers/sellerController')
const userValidations = require('../validations/userValidation')
const auth = require('../middlewares/sellerauth')


router.post('/register', userValidations.register, sellerController.register)
router.post('/login', userValidations.login, sellerController.login)
router.post('/logout', auth, sellerController.logout)
router.get('/', auth, sellerController.getprofile)


module.exports = router