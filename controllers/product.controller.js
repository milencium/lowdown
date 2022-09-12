module.exports = {

    async create(ctx) {
        try {
            ctx.body = await ctx.db.Product.create({
                name: ctx.request.body.name,
                desc: ctx.request.body.desc,
                cost: ctx.request.body.cost,
            });
        } catch (err) {
            ctx.throw(500, err)
        }
    },

    async find(ctx) {
        try {
            ctx.body = await ctx.db.Product.findAll({
                UserId: ctx.state.user,
                include: [
                    {
                        model: ctx.db.ProductReview
                    }
                ]
            });
        } catch (err) {
            ctx.throw(500, err)
        }

    },

    async findOne(ctx) {
        try {
            const product = await ctx.db.Product.findOne({
                id: ctx.params.id
            });
            if (!product) {
                ctx.throw(404, 'Product id is wrong');
            }
            ctx.body = product;
        } catch (err) {
            ctx.throw(500, err)
        }
    },

    async destroy(ctx) {
        try {
            const product = await ctx.db.Product.destroy({
                where: {
                    id: ctx.params.id,
                }
            });
            product === 0 ? ctx.throw(500, 'Wrong product id provided') : ctx.body = `Product is deleted with id ${ctx.params.id}`;
        } catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx) {
        try {
            const product = await ctx.db.Product.update({
                name: ctx.request.body.name,
                desc: ctx.request.body.desc,
                cost: ctx.request.body.cost,
            }, {
                where: {
                    id: ctx.params.id,
                }
            });
            product === 0 ? ctx.throw(500, 'Wrong product id provided') : ctx.body = `Product is updated with id ${ctx.params.id}`;
        } catch (err) {
            ctx.throw(500, err)
        }
    }
}