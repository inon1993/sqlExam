import { Product } from "./product";
import { Client } from "./client";
import { ClientPurchase } from "./clientPurchase";

export type Model = {
  Product: Product;
  Client: Client;
  ClientPurchase: ClientPurchase;
};
