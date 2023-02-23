import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import ProductInvoice from "../../domain/entity/product.invoice.entity";
import AddressInvoice from "../../domain/value-object/address.invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { v4 as uuid } from "uuid";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
  
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const invoiceProps = {
      id: new Id(uuid().toString()),
      name: input.name,
      document: input.document,
      address: new AddressInvoice({
        street: input.street,
        number: input.number,
        zipCode: input.zipCode,
        city: input.city,
        complement: input.complement,
        state: input.state
      }),
      items: input.items.map(
        (item) => {
          return new ProductInvoice({
            id: new Id(item.id),
            name: item.name,
            price: item.price
          })
        }
      )
    };
    
    const invoice = new Invoice(invoiceProps);
    
    await this.invoiceRepository.save(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total()
    };
  }

}