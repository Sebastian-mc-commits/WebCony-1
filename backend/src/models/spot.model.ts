import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database/db.sequelize'
import SpotEntries, { SpotEntriesinput } from '../types/spot.types'
import UserModel from './user.model'

class SpotModel extends Model<SpotEntries, SpotEntriesinput> implements SpotEntries {
  public qr?: number | undefined
  public placeSet!: string
  public userId?: number | undefined
}

SpotModel.init({
  qr: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'QR_MESA'
  },

  placeSet: {
    type: DataTypes.STRING,
    field: 'ZONA_MESA'
  },

  userId: {
    type: DataTypes.INTEGER,
    field: 'FK_ID_USER'
  }

}, {
  sequelize,
  timestamps: false,
  tableName: 'mesas'
})

UserModel.hasMany(SpotModel, {
  foreignKey: 'userId'
})

SpotModel.belongsTo(UserModel, {
  foreignKey: 'userId'
})

export default SpotModel
