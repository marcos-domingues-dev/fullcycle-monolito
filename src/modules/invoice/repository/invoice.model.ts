import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import AddressInvoiceModel from "./address.invoice.model";
import ProductInvoiceModel from "./product.invoice.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare document: string;

  @HasMany(() => ProductInvoiceModel, { foreignKey: "invoice_id" })
  declare items: ProductInvoiceModel[];

  @HasOne(() => AddressInvoiceModel, { foreignKey: "invoice_id" })
  declare address: Awaited<AddressInvoiceModel>;

  @Column({ allowNull: false, field: "created_at" })
  declare createdAt: Date;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;

}