const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controller/user-controller")



router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user', auth, userCtrl.updateUser)


module.exports = router