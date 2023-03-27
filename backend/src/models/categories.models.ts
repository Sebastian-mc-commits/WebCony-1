import CategoryEntries, { CategoryEntriesInput } from './../types/category.types'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database/db.sequelize'

class CategoryModel extends Model<CategoryEntries, CategoryEntriesInput> {
  public id?: number
  public name!: string
}

CategoryModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'ID_CATEG'
  },

  name: {
    type: DataTypes.STRING,
    field: 'NAME_CATEG'
  }
}, {
  sequelize,
  tableName: 'categoria',
  timestamps: false
})

export default CategoryModel
