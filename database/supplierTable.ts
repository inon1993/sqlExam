import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Model as AppModel } from "../model";
import { createView } from "../viewQueries/view6";

type SupplierSchemaModel = Model<AppModel["Supplier"]>;

export interface SupplierInterface {
  Schema: ModelStatic<SupplierSchemaModel>;
  insert: (
    supplier: Omit<AppModel["Supplier"], "id">
  ) => Promise<AppModel["Supplier"]>;
  getSupplierSells: (supplierId: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export async function createTable(
  sequelize: Sequelize
): Promise<SupplierInterface> {
  const SupplierSchema = sequelize.define<SupplierSchemaModel>(
    "supplier",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      schema: "store_managment",
    }
  );

  await SupplierSchema.sync();

  return {
    Schema: SupplierSchema,
    async insert(supplier) {
      const result = await SupplierSchema.create(
        supplier as AppModel["Supplier"]
      );
      return result.toJSON();
    },
    async getSupplierSells(supplierId: string) {
      await createView(sequelize, supplierId);
    },
    async delete(id: string) {
      await SupplierSchema.destroy({
        where: {
          id: id,
        },
      });
    },
  };
}
