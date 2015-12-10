var http = require("http");
var url = require("url");
function start(route , handle , userData) {
	function onRequest(request , response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");
		// route(handle , pathname , response);
		response.writeHead(
			200 , {"Content-Type" : "text/html"}
			);
		route(handle , pathname , response , request , userData);
	}
	http.createServer(onRequest).listen(8182);
	console.log("start main server");
}
exports.start = start;
