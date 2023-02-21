import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import ProductInvoice from "../domain/entity/product.invoice.entity";
import AddressInvoice from "../domain/value-object/address.invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import AddressInvoiceModel from "./address.invoice.model";
import InvoiceModel from "./invoice.model";
import ProductInvoiceModel from "./product.invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

  async save(entity: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: entity.id.id,
        name: entity.name,
        document: entity.document,
        address: {
          invoice_id: entity.id.id,
          street: entity.address.street,
          number: entity.address.number,
          zipCode: entity.address.zipCode,
          city: entity.address.city,
          complement: entity.address.complement,
          state: entity.address.state
        },
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        items: entity.items.map((item) => {
          return {
            id: item.id.id,
            name: item.name,
            price: item.price,
          }
        })
      },
      {
        include: [
          { model: ProductInvoiceModel },
          { model: AddressInvoiceModel }
        ],
      }
    );
  };

  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id: id },
      include: ["items", "address"],
    });

    if (!invoiceModel) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    return new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address: new AddressInvoice({
        street: invoiceModel.address.street,
        number: invoiceModel.address.number,
        zipCode: invoiceModel.address.zipCode,
        city: invoiceModel.address.city,
        complement: invoiceModel.address.complement,
        state: invoiceModel.address.state
      }),
      items: invoiceModel.items.map((product) => new ProductInvoice({
        id: new Id(product.id),
        name: product.name,
        price: product.price,
      })),
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt
    });
  };

}