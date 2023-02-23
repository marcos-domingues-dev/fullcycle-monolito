import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import ProductInvoice from "../domain/entity/product.invoice.entity";
import AddressInvoice from "../domain/value-object/address.invoice";
import InvoiceRepository from "./invoice.repository";
import AddressInvoiceModel from "./address.invoice.model";
import InvoiceModel from "./invoice.model";
import ProductInvoiceModel from "./product.invoice.model";
import { v4 as uuid } from "uuid";

describe("InvoiceRepository test", () => {

  let sequelize: Sequelize;

  const invoiceProps = {
    id: new Id(uuid().toString()),
    name: "Invoice 123",
    document: "abc",
    address: new AddressInvoice({
      street: "Rua A",
      number: "123",
      zipCode: "97654321",
      city: "Gotham City",
      complement: "",
      state: "WP"
    }),
    items: [
      new ProductInvoice({
        id: new Id(uuid().toString()),
        name: "Product A",
        price: 10.0
      }),
      new ProductInvoice({
        id: new Id(uuid().toString()),
        name: "Product B",
        price: 12.0
      })
    ]
  };

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      //storage: './database.sqlite',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductInvoiceModel, AddressInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a invoice", async () => {
    const invoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.save(invoice);

    const invoiceModel = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ["items", "address"],
    });

    expect(invoiceModel).toBeDefined();
    expect(invoiceModel.id).toBe(invoiceProps.id.id);
    expect(invoiceModel.name).toBe(invoiceProps.name);
    expect(invoiceModel.document).toBe(invoiceProps.document);
    
    expect(invoiceModel.address.invoice_id).toBe(invoiceModel.id);
    expect(invoiceModel.address.street).toBe(invoiceProps.address.street);
    expect(invoiceModel.address.number).toBe(invoiceProps.address.number);
    expect(invoiceModel.address.zipCode).toBe(invoiceProps.address.zipCode);
    expect(invoiceModel.address.city).toBe(invoiceProps.address.city);
    expect(invoiceModel.address.complement).toBe(invoiceProps.address.complement);
    expect(invoiceModel.address.state).toBe(invoiceProps.address.state);

    expect(invoiceModel.items).toBeDefined();
    expect(invoiceModel.items).toHaveLength(2);
    expect(invoiceModel.items[0].id).toBeDefined();
    expect(invoiceModel.items[0].name).toBe("Product A");
    expect(invoiceModel.items[0].price).toBe(10);
    expect(invoiceModel.items[1].id).toBeDefined();
    expect(invoiceModel.items[1].name).toBe("Product B");
    expect(invoiceModel.items[1].price).toBe(12);
  })

  it("should find a invoice", async () => {
    const expectedInvoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.save(expectedInvoice);

    const invoice = await repository.find(expectedInvoice.id.id);

    expect(invoice).toBeDefined();
    expect(invoice.id.id).toBe(expectedInvoice.id.id);
    expect(invoice.name).toBe(expectedInvoice.name);
    expect(invoice.document).toBe(expectedInvoice.document);
    
    expect(invoice.address.street).toBe(expectedInvoice.address.street);
    expect(invoice.address.number).toBe(expectedInvoice.address.number);
    expect(invoice.address.zipCode).toBe(expectedInvoice.address.zipCode);
    expect(invoice.address.city).toBe(expectedInvoice.address.city);
    expect(invoice.address.complement).toBe(expectedInvoice.address.complement);
    expect(invoice.address.state).toBe(expectedInvoice.address.state);

    expect(invoice.items).toBeDefined();
    expect(invoice.items).toHaveLength(2);
    expect(invoice.items[0].id.id).toBeDefined();
    expect(invoice.items[0].name).toBe("Product A");
    expect(invoice.items[0].price).toBe(10);
    expect(invoice.items[1].id.id).toBeDefined();
    expect(invoice.items[1].name).toBe("Product B");
    expect(invoice.items[1].price).toBe(12);
  })

})