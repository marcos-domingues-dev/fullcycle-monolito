import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import AddressInvoiceModel from "../repository/address.invoice.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository"
import ProductInvoiceModel from "../repository/product.invoice.model";
import FindInvoiceUsecase from "../usecase/find/find-invoice.usecase"
import GenerateInvoiceUsecase from "../usecase/generate/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("InvoiceFacadeUsecase test", () => { 
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductInvoiceModel, AddressInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const invoiceInputDto = {
    name: "Jack Sparrow",
    document: "ABC123",
    street: "Av Port Royal",
    number: "369",
    complement: "-",
    city: "Port Royal",
    state: "Jamaica",
    zipCode: "87654321",
    items: [
      {
        id: "1",
        name: "Bússola",
        price: 120.0
      },
      {
        id: "2",
        name: "Luneta",
        price: 380.0
      }]
  };

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.generate(invoiceInputDto);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Jack Sparrow");
    expect(result.document).toBe("ABC123");
    expect(result.street).toBe("Av Port Royal");
    expect(result.number).toBe("369");
    expect(result.complement).toBe("-");
    expect(result.city).toBe("Port Royal");
    expect(result.state).toBe("Jamaica");
    expect(result.zipCode).toBe("87654321");

    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Bússola");
    expect(result.items[0].price).toBe(120);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Luneta");
    expect(result.items[1].price).toBe(380);

    expect(result.total).toBe(500.0);
  })

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const invoiceGenerated = await facade.generate(invoiceInputDto);

    const input = { id: invoiceGenerated.id };
    const result = await facade.findInvoice(input);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Jack Sparrow");
    expect(result.document).toBe("ABC123");
    expect(result.address.street).toBe("Av Port Royal");
    expect(result.address.number).toBe("369");
    expect(result.address.complement).toBe("-");
    expect(result.address.city).toBe("Port Royal");
    expect(result.address.state).toBe("Jamaica");
    expect(result.address.zipCode).toBe("87654321");

    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Bússola");
    expect(result.items[0].price).toBe(120);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Luneta");
    expect(result.items[1].price).toBe(380);

    expect(result.total).toBe(500.0);
  })

})