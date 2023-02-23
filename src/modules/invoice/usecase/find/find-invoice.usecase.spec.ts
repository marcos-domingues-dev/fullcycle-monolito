import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import ProductInvoice from "../../domain/entity/product.invoice.entity";
import AddressInvoice from "../../domain/value-object/address.invoice";
import FindInvoiceUsecase from "./find-invoice.usecase";
import { v4 as uuid } from "uuid";

describe("FindInvoiceUsecase test", () => {

  const invoiceProps = {
    id: new Id(uuid().toString()),
    name: "Batman",
    document: "abc",
    address: new AddressInvoice({
      street: "Rua Sombria",
      number: "321",
      zipCode: "87654321",
      city: "Gotham City",
      complement: "Ap 7A",
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

  const invoice = new Invoice(invoiceProps);

  const MockRepository = () => {
    return {
      save: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
  };

  it("should generate invoice usecase", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUsecase(repository);

    const input = {
      id: "1"
    }

    const result = await usecase.execute(input);

    expect(result).toBeDefined();
    expect(result.id).toBe(invoiceProps.id.id);
    expect(invoice.name).toBe(invoiceProps.name);
    expect(invoice.document).toBe(invoiceProps.document);
    
    expect(invoice.address.street).toBe(invoiceProps.address.street);
    expect(invoice.address.number).toBe(invoiceProps.address.number);
    expect(invoice.address.zipCode).toBe(invoiceProps.address.zipCode);
    expect(invoice.address.city).toBe(invoiceProps.address.city);
    expect(invoice.address.complement).toBe(invoiceProps.address.complement);
    expect(invoice.address.state).toBe(invoiceProps.address.state);

    expect(invoice.items).toBeDefined();
    expect(invoice.items).toHaveLength(2);
    expect(invoice.items[0].id.id).toBeDefined();
    expect(invoice.items[0].name).toBe("Product A");
    expect(invoice.items[0].price).toBe(10);
    expect(invoice.items[1].id.id).toBeDefined();
    expect(invoice.items[1].name).toBe("Product B");
    expect(invoice.items[1].price).toBe(12);

    expect(invoice.total()).toBe(22);

  });

});