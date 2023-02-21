  type AddressInvoiceProps = {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    complement?: string;
    state: string;
  };
  
export default class AddressInvoice {
    private _street: string = "";
    private _number: string = "0";
    private _zipCode: string = "";
    private _city: string = "";
    private _complement: string = "";
    private _state: string = "";
  
    constructor(address: AddressInvoiceProps) {
      this._street = address.street;
      this._number = address.number;
      this._zipCode = address.zipCode;
      this._city = address.city;
      this._complement = address.complement;
      this._state = address.state;
  
      this.validate();
    }
  
    get complement(): string {
      return this._complement;
    }
  
    get state(): string {
      return this._state;
    }
  
    get street(): string {
      return this._street;
    }
  
    get number(): string {
      return this._number;
    }
  
    get zipCode(): string {
      return this._zipCode;
    }
  
    get city(): string {
      return this._city;
    }
  
    validate() {
      if (this._street.length === 0) {
        throw new Error("Street is required");
      }
      if (this._number.length === 0) {
        throw new Error("Number is required");
      }
      if (this._zipCode.length === 0) {
        throw new Error("Zip is required");
      }
      if (this._city.length === 0) {
        throw new Error("City is required");
      }
    }

  }