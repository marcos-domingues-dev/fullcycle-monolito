import { BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export default class ProductInvoiceModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })
  invoice: InvoiceModel[];

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}