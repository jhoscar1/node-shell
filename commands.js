var fs = require('fs');
var request = require('request');

var commands = {
    pwd: function(args, callback) {
        var pwd = process.argv[1].split('/').slice(0, -1).join('/');
        callback(pwd);
    },
    date: function(args, callback) {
        var date = new Date();
        callback(date.toUTCString());
    },
    ls: function(target, callback) {
        fs.readdir('./' + target, function(err, files) {
            var outputString = ''
            if (err) throw err;
            files.forEach(function(file) {
                outputString += file + "\n";
            });
            callback(outputString);
        });
    },
    echo: function(echoed, callback) {
        if (echoed[0] === '$') {
            process.stdout.write(process.env[echoed.slice(1)] + '\n');
            return;
        }
        process.stdout.write(echoed + '\n');
    },
    cat: function(filename, callback){
        fs.readFile('./' + filename, function(err, data){
            if(err) throw err;
            callback(data.toString() + '\n');
        });
    },
    head: function(filename, callback){
      //var n = n || 5;
      fs.readFile('./' + filename, function(err, data){
          if(err) throw err;
          var outputString = '';
          var head = data.toString().split('\n');
            for (var i=0; i<5; i++){
                outputString += head[i] + '\n'; 
            }
            callback(outputString);
      });  
    },
    tail: function(filename, callback){
      //var n = n || 5;
      fs.readFile('./' + filename, function(err, data){
            if(err) throw err;
            var outputString = '';
            var tail = data.toString().split('\n');
            for (var i=tail.length - 5; i<tail.length; i++){
                outputString += tail[i] + '\n'; 
            }
            callback(outputString);
      });  
    },
    sort: function(filename, callback){
      fs.readFile('./' + filename, function(err, data){
          if(err) throw err;
          var outputString = '';
        var sorted = data.toString().split('\n').map(function(element) {
            return element.trim();
        }).sort();
        for (var i=0; i<sorted.length; i++){
            outputString += sorted[i] + '\n'; 
        }
        callback(outputString);
    });
  }, 
  wc: function(filename, callback){
      fs.readFile('./' + filename, function(err, data){
          if(err) throw err;
        var sorted = data.toString().split('\n')
        callback(sorted.length);
    })
  },
    uniq: function(filename, callback){
      fs.readFile('./' + filename, function(err, data){
          if(err) throw err;
          var outputString = '';
        var sorted = data.toString().split('\n').map(function(element) {
            return element.trim();
        }).sort();
        for (var i=0; i<sorted.length; i++){
            if (sorted[i] === sorted[i - 1]) {
                continue;
            }
            else {
                outputString += sorted[i] + '\n';
            }
        }
        callback(outputString);
    });
  }, 
  curl: function(url, callback) {
    request(url, function (error, response, body) {
        var outputString = '';
        if (error) callback('error:' + error);
        outputString += 'statusCode:' + response && response.statusCode + '\n';
        outputString += 'body:' + body + '\n';
        callback(outputString);
    });
  }
}

module.exports = commands;