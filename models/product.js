'use strict'
module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        desc: DataTypes.STRING,
        cost: DataTypes.INTEGER,
    });

    Product.associate = models => {
        Product.hasMany(models.ProductReview);
        Product.belongsTo(models.User);
    };
    return Product;
}