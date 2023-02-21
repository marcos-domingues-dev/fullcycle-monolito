
// --------------------------------------------------
// DTO Find
export interface FindInvoiceUseCaseInputDto {
  id: string;
}

export interface FindInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

// --------------------------------------------------
// DTO Generate
export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

// --------------------------------------------------
// Facade

export default interface InvoiceFacadeInterface {
  findInvoice(input: FindInvoiceUseCaseInputDto) : Promise<FindInvoiceUseCaseOutputDto>;
  generate(input: GenerateInvoiceUseCaseInputDto) : Promise<GenerateInvoiceUseCaseOutputDto>;
}