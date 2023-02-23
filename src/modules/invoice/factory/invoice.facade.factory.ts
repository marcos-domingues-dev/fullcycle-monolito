import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {

  static create(): InvoiceFacadeInterface {    
    const repository = new InvoiceRepository();
    const findInvoiceUsecase = new FindInvoiceUsecase(repository);
    const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);
    const facade = new InvoiceFacade({findInvoiceUsecase, generateInvoiceUsecase});
    return facade;
  }

}