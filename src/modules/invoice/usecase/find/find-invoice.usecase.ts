import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {

  constructor(private gateway: InvoiceGateway) { }

  async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
    const invoice = await this.gateway.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt
    };
  }

}