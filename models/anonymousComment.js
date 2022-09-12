'use strict'
module.exports = (sequelize, DataTypes) => {
    var anonymousComment = sequelize.define('AnonymousComment', {
        optionalName: DataTypes.STRING,
        comment: DataTypes.STRING,
    });

    anonymousComment.associate = models => {

        anonymousComment.belongsToMany(models.ProductReview, {
            through: 'Application'
        });
    };

    return anonymousComment;
}