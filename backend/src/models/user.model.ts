import UserEntries from './../types/user.types'
import sequelize from '../config/database/db.sequelize'
import {
  CreationOptional,
  DataTypes,
  Model,
  Optional
} from 'sequelize'
import RoleModel from './role.model'

type UserTypesInput = Optional<UserEntries, 'id'>

class UserModel extends Model<UserEntries, UserTypesInput> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare role: number
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_USER'
    },

    name: {
      type: DataTypes.STRING,
      field: 'NOMB_USER'
    },

    email: {
      type: DataTypes.STRING,
      field: 'MAIL_USER'
    },

    password: {
      type: DataTypes.STRING,
      field: 'PASS_USER'
    },

    role: {
      type: DataTypes.INTEGER,
      field: 'FK_ID_ROL'
      // references: {
      //   model: RoleModel,
      //   key: 'id'
      // }
    }
  },
  {
    createdAt: false,
    sequelize,
    tableName: 'usuarios',
    updatedAt: false
  }
)

RoleModel.hasMany(UserModel, {
  foreignKey: 'role'
})

UserModel.belongsTo(RoleModel, {
  foreignKey: 'role'
})

export default UserModel
