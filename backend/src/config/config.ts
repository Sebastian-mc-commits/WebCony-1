import { config } from 'dotenv'
import program from '../utils/commander.util'

config({
  path: '.env.dev'
})

const PORT: any = process.env.PORT

export default {
  port: program.opts()?.port | PORT as number,
  DB_NAME: process.env?.DB_NAME as string,
  DB_PORT: process.env?.DB_PORT as string,
  DB_USERNAME: process.env?.DB_USERNAME as string,
  DB_USER_PASSWORD: process.env?.DB_USER_PASSWORD as string,
  DB_HOST: process.env?.DB_HOST as string,
  LOCALHOST_CORS: process.env?.LOCALHOST_CORS as string
}
