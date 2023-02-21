import { 
  FindInvoiceUseCaseInputDto,
  FindInvoiceUseCaseOutputDto,
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from "./invoice.facade.interface";

export default class InvoiceFacade {
  
  findInvoice(input: FindInvoiceUseCaseInputDto) : Promise<FindInvoiceUseCaseOutputDto> {
    return null;
  };
  
  generate(input: GenerateInvoiceUseCaseInputDto) : Promise<GenerateInvoiceUseCaseOutputDto> {
    return null;
  };

}