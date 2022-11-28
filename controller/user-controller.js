const Users = require('../model/user')

const userCtrl = {
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
                .populate("followers following", "-password")
            if (!user) return res.status(400).json({msg: "User does not exist."})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {fullname} = req.body
            if (!fullname) return res.status(400).json({msg: "Please add your full name."})

            await Users.findOneAndUpdate({_id: req.user._id}, {
              fullname
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}


module.exports = userCtrl