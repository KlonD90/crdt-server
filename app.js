var http = require('http');

var express = require('express');


var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
app.use('/', express.static('public'));

io.on('connection', function(socket){
  
});

function generateChars(len){
  var str = '';
  for (var i=0; i<len; i++)
    str += String.fromCharCode(65+Math.round(Math.random()*40));
  return str;
}

function IncrementId(){
  this.id = 0;
  this.hash = generateChars(10);
  var self = this;
  return function(){
    return self.hash + (self.id++);
  }
}
IncrementId.prototype.valueOf = function(){
  return this.hash + (this.id++);
}

function CrdtText(text){
  this.idGen = new IncrementId();
  var symbols = [];
  this.oplog = [];
  for (var i=0; i<text.length; i++)
    symbols[i] = this.processSymbol(text[i]);
  for (var i=0; i<symbols.length; i++)
  {
    if (i >0)
      symbols[i].prev = symbols[i-1].id;
    if (i < symbols.length -1)
      symbols[i].next = symbols[i+1].id;
  }
  this.mapText = symbols;
}

CrdtText.prototype.processSymbol = function(symbol){
  var id = this.idGen();
  var stamp = Date.now();
  return {id: id, stamp: stamp, symbol: symbol};
};

CrdtText.prototype.loadMap = function(map){
  this.mapText = this.mapText.concat(map);
}

CrdtText.prototype.insert = function(prevId, nextId, symbol){

};

CrdtText.prototype.del = function(symId){
};

CrdtText.prototype.toString = function(){
}
