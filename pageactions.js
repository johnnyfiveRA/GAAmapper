// pageactions.js running actor for GAA main mapper

if (require.main === module) {
	console.log("This file should not be run directly from node");
	process.exit(-1);
}

var fs= require('fs');
var http= require('http');
var sio=require('socket.io');

var currentdate = function(){
	var date = new Date();
	return date.getMonth() + ":" + date.getDate() + ":" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +"\n";
};


exports.run = function (){
	var server=http.createServer(function (request, response) {
		
		response.writeHead(200, {"Content type" : "text/html"});
		response.write(fs.readFileSync('index.html'));
		response.end();
	}).listen(80);

		var io=sio.listen(server);

		io.sockets.on('connection' , function(socket){ 

		socket.on('new message', function(msg){

			var changeMe=msg;
			msg =changeMe.replace(/edit/i, "embed");
			//msg="modified:... "+ changeMe;

			io.sockets.emit('new message', msg);
		
		});

	});
};