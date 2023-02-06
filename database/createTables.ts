import { Model, Sequelize, DataTypes } from "sequelize";
import { createTable as createClient } from "./clientTable";
import { createTable as createProduct } from "./productTable";
import { createTable as createClientPurchase } from "./clientPurchaseTable";

export async function createTables(sequelize: Sequelize) {
  const Client = await createClient(sequelize);
  const Product = await createProduct(sequelize);
  const ClientPurchase = await createClientPurchase(
    sequelize,
    Client.Schema,
    Product.Schema
  );
  return {
    Client,
    Product,
    ClientPurchase,
  };
}
