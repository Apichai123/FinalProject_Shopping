module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING(255),
    image: DataTypes.STRING(255),
    description: DataTypes.STRING(1000),
    price: DataTypes.FLOAT(2),
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.ProductCategory)
    Product.hasMany(models.OrderItem)
  };
  return Product;
};