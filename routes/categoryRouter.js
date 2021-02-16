const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
// const postValidations = require('../validations/postValidations')
const auth = require('../middlewares/sellerauth')


router.post('/',auth,categoryController.addpost)
router.get('/', categoryController.getpost)
// router.put('/:id',auth, postController.updatepost)



module.exports = router
