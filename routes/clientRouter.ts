import express, { Response, Request } from "express";
import { DB } from "../database";
import { Model as AppModels } from "../model";
import {
  clientValidator,
  purchaseValidator,
  supplierValidator,
  uuidValidator,
} from "../utils/validators";

export function createRouter(db: DB) {
  const clientRouter = express.Router();

  clientRouter.post("/add", async (req: Request, res: Response) => {
    const data: Omit<AppModels["Client"], "id"> = req.body;
    try {
      const validatedData = clientValidator(data);
      const result = await db.Client.insert(validatedData);
      return res.status(200).json({ status: "created", data: result });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  clientRouter.post("/add_purchase", async (req: Request, res: Response) => {
    try {
      const data: Omit<AppModels["ClientPurchase"], "id"> = req.body;
      if (!purchaseValidator(data)) {
        throw new Error("Invalid input");
      }

      const result = await db.ClientPurchase.insert(data);
      if (result) {
        return res.status(200).json({ status: "success", data: data });
      } else {
        return res.status(404).json({ status: "not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  });
}
