import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from "./invoice.facade.interface";

export interface UseCasesProps {
  findInvoiceUsecase: UseCaseInterface;
  generateInvoiceUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUsecase: UseCaseInterface;
  private _generateInvoiceUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCasesProps) {
    this._findInvoiceUsecase = usecaseProps.findInvoiceUsecase;
    this._generateInvoiceUsecase = usecaseProps.generateInvoiceUsecase;
  }

  findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    // caso o dto do caso de uso for != do dto da facade, será necessário
    // converter o dto da facade para o dto do caso de uso
    return this._findInvoiceUsecase.execute(input);
  }

  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    // caso o dto do caso de uso for != do dto da facade, será necessário
    // converter o dto da facade para o dto do caso de uso
    return this._generateInvoiceUsecase.execute(input);
  }

}