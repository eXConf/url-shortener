var express = require('express')
var mongo = require('mongodb').MongoClient
var validURL = require('valid-url')
var dbURL = 'mongodb://localhost:27017/shortener'
var port = process.env.PORT || 8080
var app = express()

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname}, function (err) {
    if (err) throw err
  })
})


app.get('/:query', function(req, res) {
  var query = req.params.query



//var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

})


app.listen(port, function() {

})


//Looks for a normal URL, return or create and return shorten URL
function findFullURL(query) {
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err
    var links = db.collection('links')
    links.find({
      fullURL: query
    }).toArray(function(err, docs) {
      if (err) throw err
      console.log(docs)
      db.close()
    })
  })
}


//Looks for a shorten URL, return normal URL or null if not found
function findShortURL(query) {
  mongo.connect(dbURL, function(err, db) {
    if (err) throw err
    var links = db.collection('links')
    links.find({
      shortURL: query
    }).toArray(function(err, docs) {
      if (err) throw err
      if (docs === '[]') {
        return 'No such entry'
      } else {
        console.log(docs)
      }
      db.close()
    })
  })
}


//Parse query to determine if it's full, shorten or not valid
function fullOrShorten(query) {
  if ( validURL.isWebUri(query) ) {
    return findFullURL(query)
  } else if ( !isNaN(Number(query)) ){
    return findShortURL(query)
  } else {
    return 'Not a valid value'
  }
}


//Generate random number for shorten URL, check if it's unique and return it
function randomNumber() {
  var min = 1000000 //1.000.000
  var max = 9999999 //9.999.999
  var rng = Math.floor(Math.random() * (max - min)) + min
  if ( findShortURL(rng) !== 'No such entry' ) {
    randomNumber()
  } else {
    return rng
  }
}


//Add new URL pair to the collection
function addURLs(full, short) {
  //
}
