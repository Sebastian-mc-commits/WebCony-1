import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database/db.sequelize'
import OrderEntries, { OrderEntriesInput } from '../types/order.types'
import FoodItemModel from './foodItem.model'
import SpotModel from './spot.model'

class OrderModel extends Model<OrderEntries, OrderEntriesInput> implements OrderEntries {
  public id?: number | undefined
  public date?: string | undefined
  public foodItemId!: number
  public spotQr!: number
}

OrderModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_ORDEN'
  },

  date: {
    type: DataTypes.STRING,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'DATE_PEDITO'
  },

  foodItemId: {
    type: DataTypes.INTEGER,
    field: 'FK_PRODUCTO'
  },

  spotQr: {
    type: DataTypes.INTEGER,
    field: 'FK_QR_MESA'
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'pedido'
})

// SpotModel.belongsToMany(FoodItemModel, {
//   through: OrderModel,
//   foreignKey: 'spotQr',
//   otherKey: 'foodItemId',
//   as: 'spot'
// })

// FoodItemModel.belongsToMany(SpotModel, {
//   through: OrderModel,
//   foreignKey: 'foodItemId',
//   otherKey: 'spotQr',
//   as: 'food'
// })

// SpotModel.hasMany(OrderModel, {
//   foreignKey: 'spotQr'
// })

// FoodItemModel.hasMany(OrderModel, {
//   foreignKey: 'foodItemId'
// })

OrderModel.belongsTo(SpotModel, {
  foreignKey: 'spotQr',
  targetKey: 'qr'
})

SpotModel.hasMany(OrderModel, {
  foreignKey: 'spotQr',
  sourceKey: 'qr'
})

OrderModel.belongsTo(FoodItemModel, {
  foreignKey: 'foodItemId',
  targetKey: 'id'
})

FoodItemModel.hasMany(OrderModel, {
  foreignKey: 'foodItemId',
  sourceKey: 'id'
})

export default OrderModel
