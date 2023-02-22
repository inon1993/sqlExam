import { Model, Sequelize, DataTypes } from "sequelize";
import { createTable as createClient } from "./clientTable";
import { createTable as createProduct } from "./productTable";
import { createTable as createClientPurchase } from "./clientPurchaseTable";
import { createTable as createSupplier } from "./supplierTable";
import { createTable as createSupplierProducts } from "./supplierProduct";

export async function createTables(sequelize: Sequelize) {
  const Client = await createClient(sequelize);
  const Product = await createProduct(sequelize);
  const Supplier = await createSupplier(sequelize);
  const ClientPurchase = await createClientPurchase(
    sequelize,
    Client.Schema,
    Product.Schema
  );
  const SupplierProducts = await createSupplierProducts(
    sequelize,
    Supplier.Schema,
    Product.Schema
  );
  return {
    Client,
    Product,
    Supplier,
    ClientPurchase,
    SupplierProducts,
  };
}
