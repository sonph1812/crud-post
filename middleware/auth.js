const Users = require("../model/user")
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        console.log(token)

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded = jwt.verify(token,"100000")
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

        const user = await Users.findOne({_id: decoded.id})
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = auth