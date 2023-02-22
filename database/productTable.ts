import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Model as AppModel } from "../model";

type ProductSchemaModel = Model<Omit<AppModel["Product"], "supplier">>;

export interface ProductInterface {
  Schema: ModelStatic<ProductSchemaModel>;
  insert: (
    student: Omit<AppModel["Product"], "catalogNumber">
  ) => Promise<AppModel["Product"]>;
}

export async function createTable(
  sequelize: Sequelize
): Promise<ProductInterface> {
  const ProductSchema = sequelize.define<ProductSchemaModel>(
    "product",
    {
      catalogNumber: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: "store_managment",
    }
  );

  await ProductSchema.sync();

  return {
    Schema: ProductSchema,
    async insert(product) {
      const result = await ProductSchema.create(product as AppModel["Product"]);
      return result.toJSON();
    },
  };
}
