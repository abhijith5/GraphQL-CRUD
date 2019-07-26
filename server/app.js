const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require("cors")


const app = express()
app.use(cors())


mongoose.connect('mongodb://localhost/qlcrud', {
  useNewUrlParser: true
})
  .then(() => console.log('Connected to MOngoDB'))
  .catch(() => console.log('Could not connect to MongoDB...'))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3200, () => {
  console.log('Now listening for requests on port 3200')
})