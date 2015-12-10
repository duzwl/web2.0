var http = require('http');
var fs = require('fs');
var url = require('url');
var query = require('querystring');

http.createServer(function(request, response) {
	if (request.method == "POST") {
		postdata = "";
        request.addListener("data", function(chunk){ postdata += chunk; });
        request.addListener("end", postReq(response));   // postReq(postdata, response) postdata传不进去
	} else {
		otherReq(request, response);
	}
}).listen(8000);

function postReq(response) {
	return function() {
	    var us = ["name","id","phone","email"];
        var params = query.parse(postdata);  // 上传的数据
        var flagArr = [-1];     // 标记是否xx已存在
        var newData = ['','','',''];   // 所有用户数据
        console.log(postdata);
        console.log(params);
        for (var i = 0; i < 4; i++) {
			data = fs.readFileSync("txt\\"+us[i]+"_list.txt",'utf-8');
            var t = JSON.parse(data);
        	var flag = true;
            for (var j = 0; j < t[us[i]].length; j++)
            	if (params[us[i]] == t[us[i]][j]) flag = false;
            if (flag == true) {
            	t[us[i]].push(params[us[i]]);
            	newData[i] += JSON.stringify(t);  // 原先数据加上上传的数据
			} else {
				flagArr.push(i);
			}
        }
        console.log(flagArr);
        if (flagArr.length == 1) {  // 未注册则写入文件并转到详情页
        	for (var i = 0; i < 4; i++)
        		fs.writeFileSync("txt\\"+us[i]+"_list.txt",newData[i]);
        	fs.writeFileSync("txt\\"+params['name']+"_data.txt",JSON.stringify(params));
        	detailPage(params['name'],response);
        } else {   // 已注册则返回主页
        	mainPage(response,flagArr);
        }
    }
}

function otherReq(request, response) {
	var pathname = url.parse(request.url).pathname;
	var que = url.parse(request.url, true).query;
	var ext = pathname.substring(1);
	console.log(ext);
	var postfix = pathname.match(/(\.[^.]+|)$/)[0].substring(1);   // 取得路径后缀名
	if (postfix == 'ico') {     // 响应favicon的请求
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404: favicon Not found');
	} else if (postfix == 'jpg') {
        fs.readFile(ext, function(err,data) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		});
	} else {
		if (pathname == '/') {   
			if (que['username']) {  // 访问 8000/?username=abc 这样的网址
				fs.access("txt\\"+que['username']+"_data.txt", fs.F_OK, function (err) {
  					err ? mainPage(response) : detailPage(que['username'], response);
				});
			} else {  // 8000/ 返回注册页面
				mainPage(response);  
			}
		} else {  // 加载css js等文件
			fs.readFile(ext, 'utf-8', function(err,data) {
				response.writeHead(200, {"Content-Type": "text/"+postfix});
				response.write(data);
				response.end();
			});
		}
	}
}

function detailPage(filename,response) {
	fs.readFile("txt\\"+filename+"_data.txt",'utf-8', function (error, data) {
		if (error) {
			response.write("读取出现错误");
		} else {
			var data = JSON.parse(data);
			response.writeHead(200,{"Content-Type": "text/html"});
			fs.readFile('html\\info.html','utf-8',function(err,headData) {
				response.write(headData);
				fs.readFile('html\\footer.html','utf-8',function(err,footdata) {
					var arr = ['name','id','phone','email'];
					response.write('<p class="success">'+"用户名："+data[arr[0]]+'</p>');
					response.write('<p class="success">'+"学号："+data[arr[1]]+'</p>');
					response.write('<p class="success">'+"电话："+data[arr[2]]+'</p>');
					response.write('<p class="success">'+"邮箱："+data[arr[3]]+'</p>');
					response.write(footdata);
					response.end();
				});
			});
		}
	});
}
function mainPage(response) {
	var t = arguments[1] ? arguments[1] : false;
	var error_message = ["用户名","学号","电话","邮箱"];
	fs.readFile('html\\index.html','utf-8',function(err,data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		var error_code = t;
		if (error_code != false) {
			response.write("<p class='fail'>注册失败，存在相同");
			for (var i = 1; i < error_code.length; i++) {
				if (i == 1) response.write(error_message[error_code[i]]);
				else response.write(", "+error_message[error_code[i]]);
			}
			response.write("</p>");
		}
		response.end();
	});
}
