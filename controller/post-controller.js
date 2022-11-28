const Posts = require('../model/post')
const Users = require('../model/user')

const postCtrl = {
    createPost: async (req, res) => {
        try {
            const {content} = req.body

            const newPost = new Posts({
                content, user: req.user._id
            })
            await newPost.save()

            res.json({
                msg: 'Created Post!',
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPosts: async (req, res) => {
        try {
            const features = new Posts.find({
                user: [...req.user.following, req.user._id]
            })

            const posts = await features.query.sort('-createdAt')
                .populate("user likes", "avatar username fullname followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async (req, res) => {
        try {
            const {content, images} = req.body

            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
                content, images
            }).populate("user likes")

            res.json({
                msg: "Updated Post!",
                newPost: {
                    ...post._doc,content
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if (post.length > 0) return res.status(400).json({msg: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if (!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'Liked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = postCtrl