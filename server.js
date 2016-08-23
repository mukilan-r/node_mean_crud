var express = require('express')
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser')
var app = express()
var db

app.set('view engine', 'ejs')

MongoClient.connect("mongodb://admin:admin%40123@ds013206.mlab.com:13206/node-crud", function(error, database){
  if(error) console.log(error)
  db = database
  app.listen(3000, function(){
    console.log("App Listening on PORT 3000")
  })
})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
  var curs = db.collection('quotes').find().toArray(function(error, result){
    if(error) console.log(error)
    res.render('index.ejs', {'quotes': result})
  })
})

app.post('/quotes', function(req, res){
  db.collection('quotes').save(req.body, (error, result) => {
    res.redirect('/')
  })
})
