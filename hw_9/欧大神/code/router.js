function route(handle , pathname , response , request , userData) {
	console.log("About a route request for" + pathname);
	if (typeof(handle[pathname]) === 'function') {
		handle[pathname](response , request , userData);
	} else {
		console.log("No handler for path : " + pathname);
	}
}

exports.route = route;