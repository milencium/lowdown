const jwt = require('jsonwebtoken');

module.exports = {

    issue(paylod, expiresIn) {
        return jwt.sign(paylod, "secretKey", {
            expiresIn: expiresIn
        })

    },
    verify(token) {
        return jwt.verify(token, "secretKey");
    }
};