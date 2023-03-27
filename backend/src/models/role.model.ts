import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database/db.sequelize'
import RoleEntries, { Roles } from '../types/role.types'

class RoleModel extends Model<RoleEntries> {
  declare id: number
  declare rolType: string
}

RoleModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'ID_ROL'
  },

  rolType: {
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Roles)]
    },
    allowNull: false,
    field: 'NOMB_ROL'
  }

}, {
  sequelize,
  createdAt: false,
  updatedAt: false,
  tableName: 'roles'
})

// validate: {
//   validateRolType () {
//     if (!Object.values(Roles).includes(this.rolType)) {
//       throw new HttpError('Sadness', 403)
//     }
//   }
// }

export default RoleModel
