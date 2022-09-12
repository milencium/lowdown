module.exports = {

    async create(ctx) {

        try {
            const comment = await ctx.db.AnonymousComment.create({
                optionalName: ctx.request.body.optionalName,
                comment: ctx.request.body.comment,
            });
            ctx.body = await ctx.db.Application.create({
                ProductReviewId: ctx.request.body.ProductReviewId,
                CommenterId: comment.id
            });
        } catch (err) {
            ctx.throw(500, err);
        }
    }
}