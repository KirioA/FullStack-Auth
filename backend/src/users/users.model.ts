import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttributes {
    login: string;
    password: string;
    tabel: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({ example: 'user123', description: 'Login' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare login: string;

    @ApiProperty({ example: '123456789', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @ApiProperty({ example: '1234560', description: 'Tabel' })
    @Column({ type: DataType.STRING, allowNull: false })
    declare tabel: string;

   

    
}   