
/**
 * Module dependencies.
 */

var config = require('./config');
var express = require('express');

var routes = require('./source/routes');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var app = express();
var recaptcha = require('recaptcha').Recaptcha;

var fs = require('fs');

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb'}));
  app.use(express.cookieParser(config.secret));
  app.use(require('less-middleware')({ src : path.join(__dirname, 'public'), compress : true }));
  app.set('port', config.port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  
  app.use(app.router);

  routes.load(config);  
  
  app.use(express.static(path.join(__dirname, 'public')));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
});

for(method in routes) {
  (function(m) {
    for(route in routes[m]) {
      (function(r) {
        app[m]('/' + r, function(req, res) { routes[m][r](req, res, config); });
      })(route);
    }
  })(method);
}

if(routes['get'] && routes['get']['index']) {
  app.get('/', function(req, res) { routes['get']['index'](req, res, config); });
}

var server = http.createServer(app);

if(config.usesSocketIO) {
  io = socketio.listen(server);
}

server.listen(app.get('port'), function() {});
