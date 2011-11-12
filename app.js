
/**
 * Module dependencies.
 */

// declare all your system-wide variables here
var express = require('express');

// this "returns" the app object so other files
// can access it by calling require('app')
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  
  // these set up your templating engine
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  // these do magical shit
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // this tells your app to pay attention to the
  // stuff we do under "Routes" below
  app.use(app.router);

  // this will let your /public folder behave
  // kinda' like Apache; the file /public/foo.html
  // can be accessed by going to 127.0.0.1:8002/foo.html
  app.use(express.static(__dirname + '/public'));
});

// Routes

// this section sets up the pathways users can request to
// get shit. You can do a whole lot of stuff here, including
// using libraries like express-namespace to create virtual
// subfolders and using variable pathways to access arbitrary
// database entires. Lots of stuff.

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/:variable', function(req, res){
  res.render('variable', {
    title: 'Variable Page!',
    variable : req.params.variable
  });
})

// Finalize

// finally, this command starts the app up on port 8002
// and prints some debug information. These two lines
// can be replaced by a library like cluster later on

app.listen(8002);
console.log("Express server listening on port %d in %s mode", app.address().port);
