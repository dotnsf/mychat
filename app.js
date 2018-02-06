//.  app.js
var express = require( 'express' ),
    cfenv = require( 'cfenv' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    ejs = require( 'ejs' ),
    app = express();
var appEnv = cfenv.getAppEnv();

var messages = [];

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.static( __dirname + '/public' ) );

app.get( '/', function( req, res ){
  var template = fs.readFileSync( __dirname + '/public/index.ejs', 'utf-8' );
  res.write( ejs.render( template, { messages: messages } ) );
  res.end();
});

app.post( '/message', function( req, res ){
  messages.push( req.body );
  res.redirect( '/' );
});


var port = appEnv.port || 3000;
app.listen( port );
console.log( "server starting on " + port + " ..." );



