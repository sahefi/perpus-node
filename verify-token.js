const { verify } = require("jsonwebtoken")

module.exports = function (req, res, next) {
    // mendapatkan token dari header
    const authHeader = req.headers['authorization']

    // memecah Bearer token
    const token = authHeader && authHeader.split(' ')[1]
    
    // cek jika token tidak ada
    if (token == null) return res.sendStatus(401)

    verify(token, 'verysecretkey', function (err, user) {
        console.log(err)
        if (err) return res.sendStatus(403)

        // menyimpan data user ke request
        req.user = user

        // lanjut eksekusi route yang sebenarnya
        next()
    })
}