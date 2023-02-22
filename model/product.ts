import { Model as AppModels } from ".";

export interface Product {
  catalogNumber: string;
  name: string;
  supplier?: Array<AppModels["Product"]>;
  price: number;
}
