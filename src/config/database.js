import sequelize from "./connection.js";
import Customer from "../model/customer-model.js";
import Product from "../model/product-model.js";
import ShippingAddress from "../model/shippingAddress-model.js"

Customer.hasMany(Product,{foreignKey: 'customerId'});
Product.belongsTo(Customer,{foreignKey: 'customerId'});
Customer.hasOne(ShippingAddress, {foreignKey: 'customerId'});

const connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  connectToDatabase();