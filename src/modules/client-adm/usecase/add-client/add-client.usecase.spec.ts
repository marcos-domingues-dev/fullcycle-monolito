import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      //address: "Address 1",
      document: "DOC123",
      street: "Rua Z",
      number: "321",
      zipCode: "98123000",
      city: "New York",
      complement: "",
      state: "",
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    //expect(result.address).toEqual(input.address);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.city).toBe(input.city);
    expect(result.complement).toBe(input.complement);
    expect(result.state).toBe(input.state);
  });
});
