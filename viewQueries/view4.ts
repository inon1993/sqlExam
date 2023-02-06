import { Sequelize } from "sequelize";

export async function createView(sequelize: Sequelize) {
  try {
    const query = `
    CREATE OR REPLACE VIEW store_managment.purchase_history AS
    SELECT c.id, c.name as client_name, p.name AS product_name, "cp"."purchaseDate", cp.price
    FROM store_managment.Clients c
    JOIN store_managment.client_purchases cp
    ON c.id = "clientId"
    JOIN store_managment.Products p
    ON "cp"."catalogNumber" = "p"."catalogNumber";
    `;

    await sequelize.query(query);
    console.log("purchase_history view created");
  } catch (err) {
    console.error(err);
  }
}
