import { Sequelize } from "sequelize";

export function getConnection() {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "store_managment",
    username: "postgres",
    password: "1050650",
    logging: (sql) => {
      console.log("Query: %s", sql);
    },
  });
  return sequelize;
}
