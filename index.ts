import express from "express";
import { main as initDB } from "./database";
import { createRouter as clientRouter } from "./routes/clientRouter";
import { createRouter as supplierRouter } from "./routes/supplierRouter";

async function main() {
  const app = express();
  const db = await initDB();
  app.use(express.json({ limit: "10kb" }));

  app.use("/supplier", supplierRouter);
  app.use("/client", clientRouter);

  app.listen(8088, () => {
    console.log(`Server is listening on port 8088`);
  });
}

main().then(() => {
  console.log("Exiting");
});
