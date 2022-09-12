'use strict'
module.exports = (sequelize, DataTypes) => {
    var ProductReview = sequelize.define('ProductReview', {
        review: DataTypes.STRING,
    });

    ProductReview.associate = (models) => {
        ProductReview.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
        ProductReview.belongsToMany(models.AnonymousComment, {
            through: 'Application'
        })
    };
    return ProductReview;
}