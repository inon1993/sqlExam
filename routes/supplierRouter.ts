import express, { Response, Request } from "express";
import { DB } from "../database";
import { Model as AppModels } from "../model";
import { supplierValidator, uuidValidator } from "../utils/validators";
import { createView } from "../viewQueries/view6";

export function createRouter(db: DB) {
  const supplierRouter = express.Router();

  supplierRouter.post("/add", async (req: Request, res: Response) => {
    const data: Omit<AppModels["Supplier"], "id"> = req.body;
    try {
      const validatedData = supplierValidator(data);
      const result = await db.Supplier.insert(validatedData);
      return res.status(200).json({ status: "created", data: result });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  supplierRouter.post("/add_product", async (req: Request, res: Response) => {
    try {
      const data: Omit<AppModels["SupplierProducts"], "id"> = req.body;
      if (
        !uuidValidator.test(data.supplierId) ||
        !uuidValidator.test(data.productId)
      ) {
        throw new Error("Invalid inputs");
      }

      const result = await db.SupplierProducts.insert(data);
      if (result) {
        return res.status(200).json({ status: "created", data: result });
      } else {
        return res.status(404).json({ status: "not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  supplierRouter.get(
    "/get_products/:supplierId",
    async (req: Request, res: Response) => {
      try {
        const id = req.params.supplierId;
        if (!uuidValidator.test(id)) {
          throw new Error("Invalid input.");
        }
        const result = await db.SupplierProducts.getProducts(id);
        if (result) {
          return res.status(200).json({ status: "success", data: result });
        } else {
          return res.status(404).json({ status: "not found" });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  );

  supplierRouter.get(
    "/get_sells/:supplierID",
    async (req: Request, res: Response) => {
      try {
        const supplierId: string = req.params.supplierId;
        if (!uuidValidator.test(supplierId)) {
          throw new Error("Invalid input.");
        }
        await db.Supplier.getSupplierSells(supplierId);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  );
}
