var fs = require('fs');
var userData;
var loginControl;


fs.readFile('savor.json', function(err, data){
      if(err){ } else{
        // console.log(data.length);
        userData = JSON.parse(data);
        // console.log(userData);
        // console.log(userData[0]);

       }
	});

fs.readFile('login.json' , function(err , data) {
    if (err) {} else {
        loginControl = JSON.parse(data);
    }
});

function start(response , request) {
	fs.readFile('savor.json', function(err, data){
      if(err){ } else{
        // console.log(data.length);
        userData = JSON.parse(data);
        // console.log(userData);
        // console.log(userData[0]);
       }
	});

  if (request.url !== "/favicon.ico") {
    
    if (request.url == "/") {
        register(response , request);
        return;
    }

    console.log(request.url);
    var queryName = request.url.substring(request.url.indexOf('=') + 1);
    var myresult = -1;
    for (var i = 0 ; i < userData.length ; i++) {
        if (queryName == userData[i].userName) {
            myresult = i;
            break;
        }
    }

    if (myresult != -1) {
        response.writeHead(200, {
            "Content-Type":"text/html"
        });
        var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Here is the HomePage of <span id = \"usernames\">" + userData[myresult].userName + "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + userData[myresult].id + "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + userData[myresult].phone + "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + userData[myresult].email + "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
        response.write(myline);
        response.end();
    } else {
        response.writeHead(200, {
            "Content-Type":"text/html"
        });
        response.write("<center><br/><br/><br/><br/><br/><a href=\"http://localhost:8182/register\" font-size=\"25pt\" font-family=\"Microsoft YaHei Light\">User Inexist , Click Here To Register one!</a><center>");
        response.end();
    }
 
}
	console.log("start used");
}

function register(response , request) {
	fs.readFile('register.html', function(err, data){
  		if(err){ } else{
  			response.write(data);
    		response.end();
	}
});
	console.log("register used");
}

function verify(response , request) {
	response.write("</p>Verify Callde</p>");
	console.log("verify Called");
}

function login(response , request) {
    fs.readFile('login.json' , function(err , data) {
        if (err) {} else {
            loginControl = JSON.parse(data);
        }
    });
    if (request.url == "/login") {
        console.log(request.url);
        if (loginControl["login-user"] == "nouser") {
            loginPage(response , request);
            return;
        } else {
            landingHome(response , request);
            return;
        }
    } else {
        console.log(request.url);
        var findfirstPos = request.url.indexOf('&');
        var queryName = request.url.substring(request.url.indexOf('=') + 1 , findfirstPos);
        var queryPass = request.url.substring(request.url.indexOf('=' , findfirstPos) + 1);
        // var myresult = -1;
        console.log(queryName + " ::: " + queryPass);
        // for (var i = 0 ; i < userData.length ; i++) {
            // if (queryName == userData[i].userName) {
                // myresult = i;
                // break;
        // }
        }
    }
// }

function info(response , request) {
	response.write("</p>Info Called</p>");
	console.log("info called");
}

function loginPage(response , request) {
    // response.writeHead
    fs.readFile('login.html', function(err, data){
        if(err){ } else{
            response.write(data);
            response.end();
        }
    });
}

function landingHome(response , request) {
    var index = -1;
    for (var i = 0 ; i < userData.length ; i++) {
        if (userData[i].userName == loginControl.userName) {
            index = i;
        }
    }
    var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Nice to see you again , <span id = \"usernames\">" + userData[index].userName+ "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + userData[index].id+ "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + answerStrings[4]+ "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + userData[index].email+ "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
        res.write(myline);
        res.end();
}


exports.start = start;
exports.register = register;
exports.verify = verify;
exports.info = info;
exports.login = login;
exports.landingHome = landingHome;
exports.loginPage = loginPage;