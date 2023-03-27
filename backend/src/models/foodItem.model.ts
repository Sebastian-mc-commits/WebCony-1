import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database/db.sequelize'
import FoodItemEntries, { FoodItemEntriesInput } from '../types/foodItem.types'
import CategoryModel from './categories.models'

class FoodItemModel extends Model<FoodItemEntries, FoodItemEntriesInput> implements FoodItemEntries {
  public id?: number
  public name!: string
  public quantity!: number
  public categoryType!: number
  public status!: number
  public description!: string
  public price!: number
  public thumbnailUrl!: string
}

FoodItemModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_PROD'
  },

  name: {
    type: DataTypes.STRING,
    field: 'NOM_PROD'
  },

  quantity: {
    type: DataTypes.INTEGER,
    field: 'CANT_PROD'
  },

  categoryType: {
    type: DataTypes.INTEGER,
    field: 'FK_CATEGO'
  },

  status: {
    type: DataTypes.INTEGER,
    field: 'ESTADO_PROD'
  },

  description: {
    type: DataTypes.STRING,
    field: 'DESCR_PROD'
  },

  price: {
    type: DataTypes.INTEGER,
    field: 'PRECIO_PROD'
  },

  thumbnailUrl: {
    type: DataTypes.STRING,
    field: 'IMAGEN_PROD'
  }

}, {
  sequelize,
  timestamps: false,
  tableName: 'producto'
})

CategoryModel.hasMany(FoodItemModel, {
  foreignKey: 'categoryType'
})

FoodItemModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryType'
})

export default FoodItemModel
