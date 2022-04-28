const { sign } = require('jsonwebtoken');
const models = require('../models');

module.exports = {
    async login(req, res){
        let credentials = {
            username: req.body.username,
            password: req.body.password
        }
        if (!credentials.username || !credentials.password) {
            return res.send('Username/password cannot empty');
        }
        
        let user = await models.User.findOne({
            where: credentials
        });

        if(!user) return res.send({
            message: "Username/password incorrect"
        });

        token = sign(credentials, 'verysecretkey') // <--
        
        return res.send({
            message: "Login success, copy token below for data access",
            token: token,
            data: credentials
        })
    },

    async register(req, res) {
        let user = await models.User.create(
            {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                address: req.body.address
            }
        )

        return res.send({
            message: "Succesfully added new user, go check for new update at your table (users)",
            data: user
        })
    }
}