import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "clients",
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  /// ------------------------------
  // @Column({ allowNull: false })
  // address: string;

  @Column({ allowNull: false })
  declare document: string;

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
  /// ------------------------------

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
