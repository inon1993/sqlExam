import { Model, Sequelize, DataTypes } from "sequelize";
import { Model as AppModel } from "../model";
import { ClientInterface } from "./clientTable";
import { ProductInterface } from "./productTable";

type PurchaseSchemaModel = Model<AppModel["ClientPurchase"]>;

export interface PurchaseInterface {
  insert: (
    clientPurchase: Omit<AppModel["ClientPurchase"], "purchaseNumber">
  ) => Promise<AppModel["ClientPurchase"]>;
}

export async function createTable(
  sequelize: Sequelize,
  Client: ClientInterface["Schema"],
  Product: ProductInterface["Schema"]
): Promise<PurchaseInterface> {
  const ClientPurchase = sequelize.define<PurchaseSchemaModel>(
    "client_purchase",
    {
      purchaseNumber: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      catalogNumber: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
      },
    },
    {
      schema: "store_managment",
    }
  );
  Client.belongsToMany(Product, { through: ClientPurchase });
  Product.belongsToMany(Client, { through: ClientPurchase });
  await ClientPurchase.sync();

  return {
    async insert(clientPurchase) {
      const result = await ClientPurchase.create(
        clientPurchase as AppModel["ClientPurchase"]
      );
      return result.toJSON();
    },
  };
}
