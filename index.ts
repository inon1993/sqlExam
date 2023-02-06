import { getConnection } from "./database/connection";
import { createTables } from "./database/createTables";
import { createView as createView4 } from "./viewQueries/view4";
import { createView as createView5 } from "./viewQueries/view5";

async function main() {
  const connection = getConnection();
  const DB = await createTables(connection);
  const p1 = await DB.Product.insert({
    name: "iPhone 14",
    description: "A great phone",
    sellPrice: 5000,
    buyPrice: 6000,
    stock: 100,
  });
  const p2 = await DB.Product.insert({
    name: "iPhone 13",
    description: "A good phone",
    sellPrice: 4000,
    buyPrice: 5000,
    stock: 100,
  });
  const p3 = await DB.Product.insert({
    name: "iPhone 12",
    description: "A bad phone",
    sellPrice: 3000,
    buyPrice: 4000,
    stock: 100,
  });
  const c1 = await DB.Client.insert({
    name: "Inon",
    address: "Lod",
    phoneNumber: "0543333333",
  });
  const c2 = await DB.Client.insert({
    name: "Avi",
    address: "Tel Aviv",
    phoneNumber: "0544444444",
  });

  const cp1 = await DB.ClientPurchase.insert({
    catalogNumber: "06967769-cba6-448f-80b4-029dad437e65",
    clientId: "0de878da-de27-401b-898e-fc1fbb8fd539",
    price: 6000,
    discount: 0,
    purchaseDate: new Date(),
  });

  await createView4(connection);
  await createView5(connection);
}

main().then(() => {
  console.log("Exiting");
});
