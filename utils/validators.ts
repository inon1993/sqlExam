import { Model as AppModels } from "../model";

export const uuidValidator =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;

export const phoneNoValidator =
  /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gim;

export const idNumberValidator = /[0-9]{9}/i;

export const nameValidator = /^[a-zA-Z ]+$/i;

export const supplierValidator = (
  input: Omit<AppModels["Supplier"], "id">
): Omit<AppModels["Supplier"], "id"> => {
  if (
    !nameValidator.test(input.name) ||
    !phoneNoValidator.test(input.phoneNumber)
  ) {
    throw new Error("Invalid input.");
  }
  return {
    name: input.name,
    address: input.address,
    phoneNumber: input.phoneNumber,
  };
};

export const clientValidator = (
  input: Omit<AppModels["Client"], "id">
): Omit<AppModels["Client"], "id"> => {
  if (
    !nameValidator.test(input.name) ||
    !phoneNoValidator.test(input.phoneNumber) ||
    !idNumberValidator.test(input.idNumber)
  ) {
    throw new Error("Invalid input.");
  }
  return {
    idNumber: input.idNumber,
    name: input.name,
    address: input.address,
    phoneNumber: input.phoneNumber,
  };
};

export const purchaseValidator = (
  input: Omit<AppModels["ClientPurchase"], "id">
): Omit<AppModels["ClientPurchase"], "id"> => {
  if (
    !uuidValidator.test(input.clientId) ||
    !uuidValidator.test(input.catalogNumber) ||
    input.price < 0
  ) {
    throw new Error("Invalid input");
  }

  return {
    clientId: input.clientId,
    catalogNumber: input.catalogNumber,
    price: input.price,
  };
};
