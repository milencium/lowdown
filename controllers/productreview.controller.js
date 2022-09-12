module.exports = {

    async create(ctx) {
        try {
            if (!ctx.request.body.review || !ctx.request.body.ProductId) {
                ctx.throw(400, 'Please provide review or product id');
            }
            ctx.body = await ctx.db.ProductReview.create({
                review: ctx.request.body.review,
                ProductId: ctx.request.body.ProductId,
            });
        } catch (err) {
            ctx.throw(500, err)
        }
    },

    async find(ctx) {
        try {
            ctx.body = await ctx.db.ProductReview.findAll({
                include: [
                    {
                        model: ctx.db.AnonymousComment
                    }
                ]
            });
        } catch (err) {
            ctx.throw(500, err)
        }
    }
}