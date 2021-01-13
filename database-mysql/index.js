const waitPort = require('wait-port');
const mysql = require('mysql');
require('dotenv').config();

const {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DB: DB,
} = process.env;

let pool;

const init = () => {
  return waitPort({ host: HOST, port: 3306 })
    .then(() => {
      pool = mysql.createPool({
        connectionLimit: 5,
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DB,
      });

      return new Promise((resolve, reject) => {
        pool.query(
          `CREATE TABLE IF NOT EXISTS favorites (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        zip varchar(5) NOT NULL,
        UNIQUE (zip),
        PRIMARY KEY (ID)
        )`,
          (err) => {
            if (err) {
              return reject(err);
            }

            console.log(`Connected to mysql db at host ${HOST}`);
            resolve();
          }
        );
      });
    })
    .catch((err) => {
      console.log('Error while waiting for port:', err);
    });
};

const teardown = () => {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) {
        return reject(err);
      } 
        resolve();
    });
  });
};

const getAllFavoriteZips = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM favorites', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

const addToFavorites = ({ name, zip }) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO favorites (name, zip) VALUES ('${name}', '${zip}' )`, (err, rows) => {
      if (err) {
        console.log('DB could not insert into favorites', err)
        reject(err);
      }
      resolve(rows);
    });
  });
};

const removeFromFavorites = ({ zip }) => {
  console.log('db file zip', zip)
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM favorites WHERE zip='${zip}'`, (err, rows) => {
      if (err) {
        console.log('DB could not delete from favorites')
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  init,
  teardown,
  getAllFavoriteZips,
  addToFavorites,
  removeFromFavorites
};
