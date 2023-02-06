import { Sequelize } from "sequelize";

export async function createView(sequelize: Sequelize) {
  try {
    const query = `
    CREATE VIEW store_managment.client_purchases_last_month AS
    SELECT id, SUM(price) as total_purchases
    FROM store_managment.purchase_history ph
    WHERE "ph"."purchaseDate" >= NOW() - INTERVAL '1 MONTH'
    GROUP BY id
    `;

    await sequelize.query(query);
    console.log("client_purchases_last_month view created");
  } catch (err) {
    console.error(err);
  }
}
