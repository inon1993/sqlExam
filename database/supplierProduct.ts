import { Model, Sequelize, DataTypes } from "sequelize";
import { Model as AppModel } from "../model";
import { SupplierInterface } from "./supplierTable";
import { ProductInterface } from "./productTable";

type SupplierProductsSchemaModel = Model<AppModel["SupplierProducts"]>;

export interface SupplierProductsInterface {
  insert: (
    supplierProducts: Omit<AppModel["SupplierProducts"], "id">
  ) => Promise<AppModel["SupplierProducts"]>;
  getProducts: (supplierId: string) => Promise<AppModel["SupplierProducts"][]>;
}

export async function createTable(
  sequelize: Sequelize,
  Supplier: SupplierInterface["Schema"],
  Product: ProductInterface["Schema"]
): Promise<SupplierProductsInterface> {
  const SupplierProducts = sequelize.define<SupplierProductsSchemaModel>(
    "client_purchase",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      supplierId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      schema: "store_managment",
    }
  );
  Supplier.hasMany(SupplierProducts, { foreignKey: "supplierId" });
  SupplierProducts.belongsTo(Supplier, { foreignKey: "productId" });
  await SupplierProducts.sync();

  return {
    async insert(supplierProducts) {
      const supplier = await Supplier.findByPk(supplierProducts.supplierId);
      if (!supplier) {
        throw new Error(
          `Supplier ID ${supplierProducts.supplierId} not found.`
        );
      }
      const result = await SupplierProducts.create(
        supplierProducts as AppModel["SupplierProducts"]
      );
      return result.toJSON();
    },
    async getProducts(supplierId: string) {
      const result = await SupplierProducts.findAll({
        where: {
          supplierId: supplierId,
        },
      });
      if (!result) {
        throw new Error(`Supplier ID: ${supplierId} not found.`);
      }

      const products = result.map((p) => p.toJSON());
      return products;
    },
  };
}
