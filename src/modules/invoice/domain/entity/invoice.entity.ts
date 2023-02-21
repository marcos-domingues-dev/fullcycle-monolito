import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import AddressInvoice from "../value-object/address.invoice";
import ProductInvoice from "./product.invoice.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: AddressInvoice;
  items: ProductInvoice[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: AddressInvoice;
  private _items: ProductInvoice[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this.validate();
  }
  
  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): AddressInvoice {
    return this._address;
  }

  get items(): ProductInvoice[] {
    return this._items;
  }

  validate(): void {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._document.length === 0) {
      throw new Error("Document is required");
    }
    if (this._address == undefined) {
      throw new Error("Address is required");
    }
    if (this._items.length <= 0) {
      throw new Error("Items must be greater than zero");
    }
  }

}