import ClientGateway from "../../gateway/client.gateway";
import {
  FindClientInputDto,
  FindClientOutputDto,
} from "./find-client.usecase.dto";

export default class FindClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this._clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      //address: client.address,
      document: client.document,
      street: client.street,
      number: client.number,
      zipCode: client.zipCode,
      city: client.city,
      complement: client.complement,
      state: client.state,
      
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
