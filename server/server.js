require('dotenv').config()

// Bringing in modules
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , converter = require('json-2-csv')
    , fs = require('fs')
    , querystring = require('querystring')
    , axios = require('axios')

const app = express()

// const asyncMiddleware = fn =>
//   (req, res, next) => {
//     Promise.resolve(fn(req, res, next))
//       .catch(next);
//   };

app.use(bodyParser.json())
app.use(cors())

// Establish connection to database
massive(process.env.CONNECTION_STRING).then((db) => {
  app.set('db', db)
})

app.post('/api/updateRankData', (req, res) => {
  const db = app.get('db')
  let avgArr = []
  db.get_seniorplus([req.body.rank])
    .then(response => {
      for(i = 0; i < response.length; i++){
        console.log(i)
        let associateID = response[i].associateid
        db.calculate_average([associateID])
          .then(response => {
            db.update_average([associateID, response[0].percentagetimeactive])
              .then(response => {
                console.log("Completed.")
              })
          })
      }
    }).then(console.log("Actually Completed."))
})

app.post('/api/getRankData', (req, res) => {
  const db = app.get('db')
  db.get_rankdata([req.body.rank])
    .then(response => {
      res.send(response)
    })
})


// Express Listen
const PORT = 6969
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))