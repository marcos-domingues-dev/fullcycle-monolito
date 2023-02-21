import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice_address",
  timestamps: false
})
export default class AddressInvoiceModel extends Model {

  @PrimaryKey
  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false, field: "invoice_id" })
  declare invoice_id: string;
  
  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })  
  invoice: InvoiceModel;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare zipCode: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column
  declare complement: string;

  @Column({ allowNull: false })
  declare state: string;

}