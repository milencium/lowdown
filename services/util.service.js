const bcrypt = require('bcrypt');
const SALT = 11;

module.exports = {

    async hashPassword(password) {
        try {
            return await bcrypt.hash(password, SALT);
        } catch (err) {
            throw err;
        }
    },

    async comparePassword(password, hash) {
        try {
            return await bcrypt.compare(password, hash);
        } catch (err) {
            throw err;
        }
    }
};