const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');

module.exports = {

    async signup(ctx) {
        try {
            let { email, password } = ctx.request.body;
            if (!email || !password) {
                ctx.throw(400, "Enter email or password");
            }
            const hashedPassword = await UtilService.hashPassword(password);
            await ctx.db.User.create({
                email,
                password: hashedPassword,
            });
            ctx.body = 'Sign up to Lowdown succesfull !'
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async login(ctx) {
        try {
            let { email, password } = ctx.request.body;
            if (!email || !password) {
                ctx.throw(400, "Please enter Lowdown username and password");
            }
            const user = await ctx.db.User.findOne({
                where: {
                    email,
                }
            });
            if (!user) {
                ctx.throw(500, "User does not exist in database");
            }
            const matched = UtilService.comparePassword(password, user.password);
            if (matched) {
                const token = JwtService.issue({
                    payload: {
                        user: user.id
                    }
                }, '1 day');

                ctx.body = { token };
            } else {
                ctx.throw(500, "Wrong password or email");
            }
        } catch (err) {
            ctx.throw(500, err);
        }
    }
}