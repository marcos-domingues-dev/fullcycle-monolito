export interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  //address: string;
  document: string;
  street: string;
  number: string;
  zipCode: string;
  city: string;
  complement: string;
  state: string;
}

export interface AddClientOutputDto {
  id: string;
  name: string;
  email: string;
  //address: string;
  document: string;
  street: string;
  number: string;
  zipCode: string;
  city: string;
  complement: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}
