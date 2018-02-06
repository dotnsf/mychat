//.  app.js
var express = require( 'express' ),        //. Express
    cfenv = require( 'cfenv' ),            //. cfenv
    bodyParser = require( 'body-parser' ), //. body-parser
    fs = require( 'fs' ),                  //. fs
    ejs = require( 'ejs' ),                //. ejs
    app = express();
var appEnv = cfenv.getAppEnv();

var messages = [];                         //. Posted messages

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

//. 'GET /' Handler
app.get( '/', function( req, res ){
  //. Render with template
  var template = fs.readFileSync( __dirname + '/public/index.ejs', 'utf-8' );
  res.write( ejs.render( template, { messages: messages } ) );
  res.end();
});

//. 'POST /message' Handler
app.post( '/message', function( req, res ){
  messages.push( req.body );
  res.redirect( '/' );
});


var port = appEnv.port || 3000;            //. Find available port dinamically
app.listen( port );
console.log( "server starting on " + port + " ..." );



