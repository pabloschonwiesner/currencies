const { selectCurrencies, createCurrency, createCurrencyRate, selectCurrencyRate, selectCurrencyRateSymbol } = require('./../models/currencies.model')

async function getCurrencies () {
  try {
    let currencies = await selectCurrencies()
    return currencies
  } catch ( err ) { throw err }
}

async function setCurrency ( currency ) {
  try {
    await createCurrency( currency )
    return true
  } catch ( err ) { throw err }
}

async function setCurrencyRate ( rate ) {
  try {
    await createCurrencyRate( rate )
    return true
  } catch ( err ) { throw err }
}

async function getCurrencyRate ( symbol ) {
  try {

    if(symbol) {
      return await selectCurrencyRateSymbol(symbol)
    } else {
      return await selectCurrencyRate()
    }
  } catch ( err ) { throw err }
}


module.exports = {
  getCurrencies,
  setCurrency,
  setCurrencyRate,
  getCurrencyRate
}