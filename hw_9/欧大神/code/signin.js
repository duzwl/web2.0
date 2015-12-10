var http = require('http');
var fs = require('fs');
var url = require('url');
var router = require("./router");
var server = require("./server");
var handler = require("./handler");
var datas , x1 , e1;
var userData;
var answerStrings = new Array();

var tempAccount = {
    userName:"noname",
    password: "123456",
    email:"xxx@yyy.zzz",
    phone:"13800138000",
    id:"88888888"
};

fs.readFile('savor.json', function(err, data){
      if(err){ } else{
        // console.log(data.length);
        userData = JSON.parse(data);
        // console.log(userData);
        // console.log(userData[0]);
       }
});

var handle = {};
handle["/"] = handler.start;
handle["/start"] = handler.start;
handle["/login"] = handler.login;
handle["/register"] = handler.register;
handle["/verify"] = handler.verify;
handle["/info"] = handler.info;
server.start(router.route , handle);

var server = http.createServer(function(req , res) {
	
  if (req.url !== "/favicon.ico") {
		req.on('data' , function(data) {
			datas = decodeURIComponent(data);
			console.log("服务器接收到的数据： " + datas);
			console.log(typeof(datas));
			console.log(datas.length);
			// console.log(datas.match(/username=/));
			x1 = datas.indexOf('=');
			e1 = datas.indexOf('&');
			console.log("x1 == " + x1 + " , e1 == " + e1);
			console.log(datas.substring(x1 + 1 , e1));
            
            answerStrings[0] = datas.substring(x1 + 1 , e1);
            tempAccount.userName = answerStrings[0];


			for (var i = 0 ; i < 3 ; i++) {
				x1 = datas.indexOf('=' , e1);
				e1 = datas.indexOf('&' , x1);
				console.log("x" + (i + 2) + " == " + x1 + " , e" + (i + 2) + " == " + e1);
				console.log(datas.substring(x1 + 1 , e1));
                answerStrings[i + 1] = datas.substring(x1 + 1 , e1);
			}

			x1 = datas.indexOf('=' , e1);
			// e1 = datas.indexOf('&' , x1);

			console.log("x5 == " + x1 + " , e5 == " + datas.length);
			console.log(datas.substring(x1 + 1));
            answerStrings[4] = datas.substring(x1 + 1);
			console.log(datas[0]);
            tempAccount.email = answerStrings[1];
            tempAccount.password = answerStrings[2];
            tempAccount.id = answerStrings[3];
            tempAccount.phone = answerStrings[4];
            verify(tempAccount , res);
            // var failed_count = 0;
            // verify.userName = true;
            // verify.id = true;
            // verify.email = true;
            // verify.phone = true;
            // for (var i = 0 ; i < userData.length ; i++) {
            //     if (userData[i].userName == tempAccount.userName) {
            //         verify.userName = false;
            //         failed_count++;
            //     }
            //     if (userData[i].email == tempAccount.email) {
            //         verify.email = false;
            //         failed_count++;
            //     }
            //     if (userData[i].id == tempAccount.id) {
            //         verify.id = false;
            //         failed_count++;
            //     }
            //     if (userData[i].phone == tempAccount.phone) {
            //         verify.phone = false;
            //         failed_count++;
            //     }
            // }
            // if (failed_count == 0) {
            //     userData[userData.length] = tempAccount;
            //     saveToFile(userData);
            //     res.writeHead(200, {
            //           "Content-Type":"text/html"
            //     });
            //     var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Nice to see you again , <span id = \"usernames\">" + answerStrings[0]+ "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + answerStrings[3]+ "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + answerStrings[4]+ "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + answerStrings[1]+ "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
            //     res.write(myline);
            //     res.end();
            // } else {
            //     res.writeHead(200, {
            //           "Content-Type":"text/html"});
            //     res.write("<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>- ERROR| Home -</title></head><body>");
            //     if (!verify.userName) res.write("<p>用户名已经被占用</p><br/>");
            //     if (!verify.email) res.write("<p>邮箱已经被其他用户注册</p><br/>");
            //     if (!verify.id) res.write("<p>学号已被注册</p><br/>");
            //     if (!verify.phone) res.write("<p>手机号已经注册</p><br/>");
            //     res.write("<br/><br/><a href=\"http://localhost:8182/register\">点击返回<br /></a></body></html>");
            // }   res.end();

		});
		req.on("end" , function() {
			console.log("请求数据全部接受完毕");
      // res.writeHead(200, {
      //     "Content-Type":"text/html"
      // });
      // var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Nice to see you again , <span id = \"usernames\">" + answerStrings[0]+ "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + answerStrings[3]+ "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + answerStrings[4]+ "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + answerStrings[1]+ "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
      // res.write(myline);
      // res.end();
      });
 
	}

	// res.end();
}).listen(2333 , "localhost" , function() {
	console.log("Listened");
});


// http.createServer(function(req , res) {
//     var check = false;

//     req.on('data' , function(data) {
//     var datasing = decodeURIComponent(data);
//     console.log("req::" + datasing);
//     var sing = datasing.substring(datasing.indexOf('=') + 1);
//     console.log(sing);
//     for (var i = 0 ; i < userData.length ; i++) {
//         // console.log("userName[" + (i + 1) + "] : " + userData[i].userName);
//         if (userData[i].userName == sing) {
//             check = true;
//             // console.log(res);
//             res.writeHead(200, {
//                 "Content-Type":"application/json"
//             });
//             break;
//         }
//     }
//     });
//     req.on('end' , function() {
//     });
// }).listen(9999 , "localhost" , function() {
//     console.log("Verify System Loaded.");
// })

function doSomething(req , res) {
var pathname = req;
		console.log(pathname);
        var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
        console.log(ext);
        fs.readFile('html/web/index.html','utf-8',function(err, data) {//读取内容
                    if(err) throw err;
                    res.writeHead(200, {
                        "Content-Type":"text/html"
                    });
                    res.write(data);
                    res.end();
                });

}


function saveToFile(usrArr) {
    fs.writeFile('savor.json' , JSON.stringify(usrArr), function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });

}

function verify(myAccount , res) {
    var failed_count = 0;
    var verify = {
        userName:true,
        email:true,
        phone:true,
        id:true
    };
    verify.userName = true;
    verify.id = true;
    verify.email = true;
    verify.phone = true;
    for (var i = 0 ; i < userData.length ; i++) {
        if (userData[i].userName == myAccount.userName) {
            verify.userName = false;
            failed_count++;
        }
        if (userData[i].email == myAccount.email) {
            verify.email = false;
            failed_count++;
        }
        if (userData[i].id == myAccount.id) {
            verify.id = false;
            failed_count++;
        }
        if (userData[i].phone == myAccount.phone) {
            verify.phone = false;
            failed_count++;
        }
    }
    if (failed_count == 0) {
        userData[userData.length] = myAccount;
        saveToFile(userData);
        res.writeHead(200, {
              "Content-Type":"text/html"
        });
        var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Nice to see you again , <span id = \"usernames\">" + answerStrings[0]+ "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + answerStrings[3]+ "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + answerStrings[4]+ "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + answerStrings[1]+ "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
        res.write(myline);
        res.end();
    } else {
        res.writeHead(200, {
              "Content-Type":"text/html"});
        res.write("<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>- ERROR| Home -</title></head><body><center>");
        res.write("<h1 style=\"font-size:30pt; color:red;\">注册失败</h1><br/>")
        if (!verify.userName) res.write("<p>用户名已经被占用</p><br/>");
        if (!verify.email) res.write("<p>邮箱已经被其他用户注册</p><br/>");
        if (!verify.id) res.write("<p>学号已被注册</p><br/>");
        if (!verify.phone) res.write("<p>手机号已经注册</p><br/>");
        res.write("<br/><br/><a href=\"http://localhost:8182/register\">点击返回修改<br /></a></center></body></html>");
    }   res.end();
}

// var server2 = http.createServer(function(req , res) {
    
//   if (req.url !== "/favicon.ico") {
//     console.log(req.url);
//     // console.log(typeof(req.url));
//     var queryName = req.url.substring(req.url.indexOf('=') + 1);
//     var myresult = -1;
//     for (var i = 0 ; i < userData.length ; i++) {
//         if (queryName == userData[i].userName) {
//             myresult = i;
//             break;
//         }
//     }

//     if (myresult != -1) {
//         res.writeHead(200, {
//             "Content-Type":"text/html"
//         });
//         var myline = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/bootstrap.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.souler.me/past/style.css\"><div class=\"header\"><div class=\"header-banner\"><div class=\"container\"><div class=\"top-menu\"><span class=\"menu\"></span><ul><li><a href=\"#HOME\" class=\"scroll\">HOME</a></li><li><a href=\"#BROWSE\" class=\"scroll\">BROWSE</a></li><li><a href=\"#SETTINGS\" class=\"scroll\">SETTING</a></li><li><a href=\"#LOGOUT\" class=\"scroll\">LOGOUT</a></li><div class=\"clearfix\"></div></ul></div><div class=\"header-banner-info text-center\"><a href=\"#\"><img src=\"http://www.souler.me/past/logo.png\" alt=\"\" /></a><h3>Welcome Home</h3><h1>Here is the HomePage of <span id = \"usernames\">" + userData[myresult].userName + "</span>.</h1><p>&nbsp;</p><span class=\"line\"></span><ul class=\"social-icons\"><li><a href=\"#\"><i class=\"twitter\"></i></a></li><li><a href=\"#\"><i class=\"dribble\"></i></a></li><li><a href=\"#\"><i class=\"behance\"></i></a></li></ul><label></label><ul class=\"details\"><li>ID No.     :    <a href=\"#\" id=\"studentId\">" + userData[myresult].id + "</a></li><li>Phone      :    <a href=\"#\" id=\"phonenum\">" + userData[myresult].phone + "</a></li><li>E-mail     :    <a href=\"#\" id=\"emailadd\">" + userData[myresult].email + "</a></li></ul></div></div></div></div><div class=\"footer\"><div class=\"container\"><div class=\"copy-rights text-center\"><p>&copy; Origin Designer <a href=\"http://www.souler.me\" target=\"target_blank\">Maxwell Ou</a></p></div></div></div>";
//         res.write(myline);
//         res.end();
//     } else {
//         res.writeHead(200, {
//             "Content-Type":"text/html"
//         });
//         res.write("No such User!");
//         res.end();
//     }
 
// }

//     // res.end();
// }).listen(8081 , "localhost" , function() {
//     console.log("Listened");
// });