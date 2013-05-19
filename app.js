
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , landing = require('./routes/landing')
  , visualization = require('./routes/visualization')
  , fs = require('fs')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/heatmaps', landing.heatmaps);
app.get('/heatmap/store/:store/segment/:segment/:weighted?*', visualization.heatmap);
app.get('/graphs', landing.graphs);
app.get('/graph/store/:store/segment/:segment', visualization.graph);
app.get('/scatters', landing.scatters);
app.get('/scatter/:x/:y/store/:store/segment/:segment/:distance?*', visualization.scatter);
//app.get('/pie/by/:method/select/:select/', visualization.pie);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});