export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutputDto {
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
