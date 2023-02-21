import AddressInvoiceModel from "./address.invoice.model";
import InvoiceModel from "./invoice.model";

InvoiceModel.hasOne(AddressInvoiceModel);

AddressInvoiceModel.belongsTo(InvoiceModel, {
  foreignKey: {
    name: 'fk_invoice_address_to_invoices'
  }
});
