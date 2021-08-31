const { pool } = require('./../../mysql/mysql')


async function selectCurrencies () {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM currencies`, (err, result) => {
      if ( err ) {
        console.log(err)
        return reject(err)
      }
      return resolve(result)
    })
  })
}

async function createCurrency ( currency ) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO currencies (description, symbol) VALUES (?, ?)`, [currency.description, currency.symbol] , err => {
      if ( err ) return reject(err)
      return resolve()
    })
  })
}

async function createCurrencyRate ( rate ) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO currency_rates (id_currency, value) VALUES (?, ?)`, [rate.id_currency, rate.value] , err => {
      if ( err ) return reject(err)
      return resolve()
    })
  })
}

async function selectCurrencyRate () {
  return new Promise((resolve, reject) => {
    pool.query(`
      WITH
      cte as (select *, ROW_NUMBER() OVER(partition BY ID_CURRENCY order by  created_at desc) as nro from currency_rates)
      
      select id, id_currency, value, created_at from cte where nro = 1;

      select * from currencies
    `, (err, result) => {
      if ( err ) return reject(err)

      let data = []
      result[0].forEach( item => {
        item.currency = result[1].find( currency => currency.id = item.id_currency)
        data.push(item)
      })
      return resolve(data)
    })
  })
}

async function selectCurrencyRateSymbol ( symbol ) {
  return new Promise((resolve, reject) => {
    pool.query(`
      select cr.*, c.symbol, c.description 
      from currency_rates cr inner join currencies c on c.id = cr.id_currency
      where c.symbol = ?`, [symbol], (err, result) => {
      if ( err ) return reject(err)

      let data = {
        id: result[0].id,
        id_currency: result[0].id_currency,
        value: result[0].value,
        created_at: result[0].created_at,
        currency: {
          id: result[0].id,
          description: result[0].description,
          symbol: result[0].symbol
        }
      }
      return resolve(data)
    })
  })
}


module.exports = {
  selectCurrencies,
  createCurrency,
  createCurrencyRate,
  selectCurrencyRate,
  selectCurrencyRateSymbol
}


