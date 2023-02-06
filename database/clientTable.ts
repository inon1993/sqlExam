import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Model as AppModel } from "../model";

type ClientSchemaModel = Model<AppModel["Client"]>;

export interface ClientInterface {
  Schema: ModelStatic<ClientSchemaModel>;
  insert: (
    student: Omit<AppModel["Client"], "id">
  ) => Promise<AppModel["Client"]>;
}

export async function createTable(
  sequelize: Sequelize
): Promise<ClientInterface> {
  const ClientSchema = sequelize.define<ClientSchemaModel>(
    "client",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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

  await ClientSchema.sync();

  return {
    Schema: ClientSchema,
    async insert(client) {
      const result = await ClientSchema.create(client as AppModel["Client"]);
      return result.toJSON();
    },
  };
}
