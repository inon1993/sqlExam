import { Sequelize } from "sequelize";

export async function createView(sequelize: Sequelize, supplierID: string) {
  try {
    const query = `
    CREATE VIEW store_managment.supplier_sells AS
    SELECT p.catalogNumber, p.name, p.price
    FROM store_managment.Products p
    JOIN store_managment.ClientPurchases cp
    ON p.catalogNumber = cp.catalogNumber
    JOIN supplierProducts sp
    ON p.catalogNumber = sp.
    WHERE sp.supplierId = '${supplierID}'
    `;

    await sequelize.query(query);
    console.log("supplier_sells view created");
  } catch (err) {
    console.error(err);
  }
}
