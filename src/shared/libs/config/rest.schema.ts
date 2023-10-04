import convict from 'convict';
import validator from 'convict-format-with-validator';

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

convict.addFormats(validator);

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: 'Port for incoming connectios',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
});
