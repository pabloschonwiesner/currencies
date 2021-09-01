const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const db = require('../mysql/mysql')

const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(require('./routes/currencies.route'))
  

db.initDb()
  .then( () => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
    })
  })
  .catch( err => {
    console.error(err)
    process.exit(1)
  })

app.on('err', (err) => console.error('Error servidor: ' + err))
