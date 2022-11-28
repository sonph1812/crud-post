const router = require('express').Router()
const postCtrl = require('../controller/post-controller')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)

router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)

router.patch('/post/:id/like', auth, postCtrl.likePost)
module.exports = router