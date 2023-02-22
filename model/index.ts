import { Product } from "./product";
import { Client } from "./client";
import { ClientPurchase } from "./clientPurchase";
import { Supplier } from "./supplier";
import { SupplierProducts } from "./supplierProducts";

export type Model = {
  Product: Product;
  Client: Client;
  ClientPurchase: ClientPurchase;
  Supplier: Supplier;
  SupplierProducts: SupplierProducts;
};
