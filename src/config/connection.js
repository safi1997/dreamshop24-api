import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: 'localhost',
    port:'13306',
    dialect: 'mysql'
  });

export default sequelize;