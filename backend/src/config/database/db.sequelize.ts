/* eslint-disable @typescript-eslint/naming-convention */
import { Sequelize } from 'sequelize'
import config from '../config'

const { DB_NAME, DB_USER_PASSWORD, DB_USERNAME, DB_HOST } = config

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_USER_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  define: {
    underscored: true,
    freezeTableName: true, // use singular table name
    timestamps: false // I do not want timestamp fields by default
  },
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: function (field: any, next: Function) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    }
  },

  timezone: '+10:00'
})

sequelize.authenticate().then(() => console.log('Connection established')).catch((err: Error) => console.log(`Unable to connect ${err.message}}`))

export default sequelize
