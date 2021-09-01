const waitPort = require('wait-port')
let mysql = require('mysql2')
require('dotenv').config()

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
} = process.env;

let pool = mysql.createPool({
  connectionLimit: 5,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  multipleStatements: true,
  insecureAuth: true
});

async function initDb () {
  await waitPort({host: MYSQL_HOST, port: 3306})
  return new Promise((resolve, reject) => {
    pool.query(
      `
      CREATE TABLE IF NOT EXISTS currencies (
        id int(11) NOT NULL AUTO_INCREMENT,
        description varchar(45) NOT NULL,
        symbol varchar(45) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
      
      CREATE TABLE IF NOT EXISTS currency_rates (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_currency int(11) NOT NULL,
        value float NOT NULL,
        created_at timestamp NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        KEY id_currencies_fk_idx (id_currency),
        CONSTRAINT id_currencies_fk FOREIGN KEY (id_currency) REFERENCES currencies (id) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
      
      INSERT INTO currencies (description, symbol) VALUES ('bitcoin', 'BTC'), ('etherum', 'ETH'), ('cardano', 'ADA')
      `,
      err => {
        if (err) {
          console.log('err: ' + err)
          return reject(err);
        }

        console.log(`Connected to mysql db at host ${MYSQL_HOST}`);
        resolve();
    },
    )
  })

}


module.exports = {
  initDb,
  pool
}