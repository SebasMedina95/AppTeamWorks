import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  // Base de datos
  DB_MYSQL_ROOT_PASSWORD: get('DB_MYSQL_ROOT_PASSWORD').required().asString(),
  DB_MYSQL_DATABASE: get('DB_MYSQL_DATABASE').required().asString(),
  DB_MYSQL_USER: get('DB_MYSQL_USER').required().asString(),
  DB_MYSQL_PASSWORD: get('DB_MYSQL_PASSWORD').required().asString(),
  DB_MYSQL_PORT_MYSQL: get('DB_MYSQL_PORT_MYSQL').required().asPortNumber(),
  DB_MYSQL_PORT_DOCKER: get('DB_MYSQL_PORT_DOCKER').required().asPortNumber(),
  DB_HOST: get('DB_HOST').required().asString(),
  DB_TYPE: get('DB_TYPE').required().asString(),

}