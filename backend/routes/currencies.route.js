const express = require('express')
const app = express()
const { getCurrencies, setCurrency, setCurrencyRate, getCurrencyRate} = require('./../services/currencies.service')

app.get('/currencies', async (req, res) => {
  try {
    let currencies = await getCurrencies()
    res.json(currencies)
  } catch ( err ) { res.json( { err } )}
})

app.post('/currencies', async (req, res) => {
  try {
    let result = await setCurrency( req.body )
    res.json(result)
  } catch ( err ) { res.json( { err } )}
})

app.post('/rates', async (req, res) => {
  try {
    let result = await setCurrencyRate( req.body )
    res.json(result)
  } catch ( err ) { res.json( { err } )}
})

app.get('/rates/:symbol?', async (req, res) => {
  try {
    let rates = await getCurrencyRate( req.params.symbol )
    res.json(rates)
  } catch ( err ) { res.json( { err } )}
})

module.exports = app
