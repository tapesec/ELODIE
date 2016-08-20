var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path
 
var childArgs = [
  path.join(__dirname, 'rasterize.js'),
  'http://localhost:3000', 'out.pdf', "29.7cm*21cm", "0.5"
]
 
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  console.log(stdout, 'stdout-->');
});