# How to implement mychat

+++

## Prepare

- Install Node.js(V6.x) and npm

    - Following example is for Ubuntu 16.04

        * `$ sudo apt-get install -y nodejs npm`

        * `$ sudo npm cache clean`

        * `$ sudo npm install n -g`

        * `$ sudo n list`

            * find latest 6.x.x version, for example 6.12.3

        * `$ sudo n 6.12.3`

        * `$ sudo apt-get purge nodejs npm`

        * `$ node -v`


+++

## Create working folder

- `$ mkdir mychat`

- `$ cd mychat`

+++

## Create package.json

- `$ npm init`

    - name: test_mychat

    - version: 1.0.0

    - description: 

    - entry point: ** app.js **

    - test command:

    - git repository: 

    - keywords:

    - author:

    - license: 

    - Is this ok?: yes

+++

## (App.1)Install Express and cfenv

- `$ npm install express`

    - Express is one of the most major nodejs web framework

- `$ npm install cfenv`

    - You can get application environment with cfenv.

    - If you want to run this application on IBM Cloud, or Cloud Foundry-based paltform, your application need to decide its working port dynamically using cfenv.

+++

## (App.1)Code initial app.js

```javascript:app.js
//. app.js
var express = require( 'express' ), //. Express
    cfenv = require( 'cfenv' ),     //. cfenv
    app = express();
var appEnv = cfenv.getAppEnv();

//. 'GET /' Handler
app.get( '/', function( req, res ){
  res.write( 'Hello MyChat' );
  res.end();
});

var port = appEnv.port || 3000;     //. Find available port dynamically
app.listen( port );
console.log( "server starting " + port + " ..." );
```

+++

## (App.1)Run and execute initial app.js

- `$ node app`

- Browse http://xx.xx.xx.xx:port/ with web browser, and confirm message.

+++

## (App.2)Install ejs

- `$ npm install ejs`

    - ejs is template engine for Node.js and Express.

+++

## (App.2)Edit app.js

```javascript:app.js
//. app.js
var express = require( 'express' ), //. Express
    cfenv = require( 'cfenv' ),     //. cfenv
    fs = require( 'fs' ),           //. fs
    ejs = require( 'ejs' ),         //. ejs
    app = express();
var appEnv = cfenv.getAppEnv();

var messages = [];                  //. Posted messages

//. 'GET /' Handler
app.get( '/', function( req, res ){
  //. Render with template
  var template = fs.readFileSync( __dirname + '/public/index.ejs', 'utf-8' );
  res.write( ejs.render( template, { messages: messages } );
  res.end();
});

var port = appEnv.port || 3000;     //. Find available port dynamically
app.listen( port );
console.log( "server starting " + port + " ..." );
```

+++

## (App.2)Create template folder

- `$ mkdir public`

+++

## (App.2)Create public/index.ejs

```html:public/index.ejs
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>MyChat</title>
<script>
setTimeout( "location.reload()", 5000 );
</script>
<head>
<body>
<h1>MyChat</h1>
<hr/>
<ul>
<% for( var i = 0; i < messages.length; i ++ ){ %>
 <li><%= messages[i].body %><b><%= messages[i].name %></b></li>
<% } %>
<ul>
<form method="POST" action="/message">
Name: <input type="text" name="name" size="20" value=""/>
<input type="text" name="body" size="80" value=""/>
<input type="submit" value="Send"/>
<form>
<body>
<html>
```

+++

## (App.2)Run and execute initial app.js

- `$ node app`

- Browse http://xx.xx.xx.xx:port/ with web browser, and confirm web page(doesn't work yet).

+++

## (App.3)Install body-parser

- `$ npm install body-parser`

    - body-parsere handles posted object with Express.


+++

## (App.3)Edit app.js

```javascript:app.js
//. app.js
var express = require( 'express' ), //. Express
    cfenv = require( 'cfenv' ),     //. cfenv
    fs = require( 'fs' ),           //. fs
    ejs = require( 'ejs' ),         //. ejs
    bodyParser = require( 'body-parser' ),   //. body-parser
    app = express();
var appEnv = cfenv.getAppEnv();

var messages = [];                  //. Posted messages

app.use( bodyParser.urlencoded( { extend: true } );
app.use( bodyParser.json();

//. 'GET /' Handler
app.get( '/', function( req, res ){
  //. Render with template
  var template = fs.readFileSync( __dirname + '/public/index.ejs', 'utf-8' );
  res.write( ejs.render( template, { messages: messages } );
  res.end();
});

//. 'POST /message' Handler
app.post( '/message', function( req, res ){
  messages.push( req.body );
  res.redirect( '/' );
});

var port = appEnv.port || 3000;     //. Find available port dynamically
app.listen( port );
console.log( "server starting " + port + " ..." );
```

+++

## (App.3)Run and execute initial app.js

- `$ node app`

- Browse http://xx.xx.xx.xx:port/ with web browser, and confirm web page work as simple web chat.






