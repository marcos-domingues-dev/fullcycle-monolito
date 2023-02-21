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
    expect(invoiceProps.id.id).toBe(invoiceModel.id);
    expect(invoiceProps.name).toBe(invoiceModel.name);
    expect(invoiceProps.document).toBe(invoiceModel.document);
    //expect(invoiceProps.address).toBe(invoiceModel.address);

    expect(invoiceModel.items).toBeDefined();
    expect(invoiceModel.items).toHaveLength(2);
    expect(invoiceModel.items[0].id).toBeDefined();
    expect(invoiceModel.items[0].name).toBe("Product A");
    expect(invoiceModel.items[0].price).toBe(10);
    expect(invoiceModel.items[1].id).toBeDefined();
    expect(invoiceModel.items[1].name).toBe("Product B");
    expect(invoiceModel.items[1].price).toBe(12);
  })

  it("should find a product", async () => {
    const expectedInvoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.save(expectedInvoice);

    const invoice = await repository.find(expectedInvoice.id.id);

    expect(invoice).toBeDefined();
    expect(expectedInvoice.id.id).toBe(invoice.id.id);
    expect(expectedInvoice.name).toBe(invoice.name);
    expect(expectedInvoice.document).toBe(invoice.document);
    //expect(expectedInvoice.address).toBe(invoice.address);

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