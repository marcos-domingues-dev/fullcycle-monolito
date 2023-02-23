import GenerateInvoiceUsecase from "./generate-invoice.usecase";

describe("GenerateInvoiceUsecase test", () => {

  const MockRepository = () => {
    return {
      save: jest.fn(),
      find: jest.fn()
    };
  };

  it("should generate invoice usecase", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    const input = {
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

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);

    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Bússola");
    expect(result.items[0].price).toBe(120.0);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Luneta");
    expect(result.items[1].price).toBe(380.0);

    expect(result.total).toBe(500);
  });

});