const express = require('express')
const router = express.Router()
const medicineController = require('../controllers/medicineController')
// const postValidations = require('../validations/postValidations')
const auth = require('../middlewares/sellerauth')


router.post('/',auth,medicineController.addpost)
router.get('/', medicineController.getpost)
router.get("/indi/:name",medicineController.getmedi)
// router.put('/:id',auth, postController.updatepost)



module.exports = router
