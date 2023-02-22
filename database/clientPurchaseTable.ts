import { Model, Sequelize, DataTypes } from "sequelize";
import { Model as AppModel } from "../model";
import { ClientInterface } from "./clientTable";
import { ProductInterface } from "./productTable";

type PurchaseSchemaModel = Model<AppModel["ClientPurchase"]>;

export interface PurchaseInterface {
  insert: (
    clientPurchase: Omit<AppModel["ClientPurchase"], "id">
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
      id: {
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
      const catalogNumber = await Product.findByPk(
        clientPurchase.catalogNumber
      );
      if (!catalogNumber) {
        throw new Error(
          `Product ID: ${clientPurchase.catalogNumber} not found`
        );
      }
      const clientId = await Client.findByPk(clientPurchase.clientId);
      if (!clientId) {
        throw new Error(`Client ID ${clientPurchase.clientId} npt found`);
      }
      const result = await ClientPurchase.create(
        clientPurchase as AppModel["ClientPurchase"]
      );
      return result.toJSON();
    },
  };
}
