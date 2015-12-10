// $(function(){
// 			$("button").click(function(){
// 			// if($("#signup_email").val()==""||$("#signup_password").val()==""||$("#signup_confirm_password").val()==""||$("#signup_username").val()=="")
// 			// {
// 			// 	$.messager.alert('Waring!','email password and username mustn\'t be empty!');
				
// 			// }
// 			// else
// 			// {
// 			// 	if($("#signup_password").val()!=$("#signup_confirm_password").val())
// 			// 	{
// 			// 			$.messager.alert('Waring','Your password is not same!');
// 			// 			$("#signup_password").val("");
// 			// 			$("#signup_confirm_password").val("");
// 			// 	}
// 			// 	else
// 			// 	{
// 					$("#sign_form").submit();
// 				// }
// 			// }
// 		});
// 	});



var flag = { 
    "email":false, 
    "nickname":false, 
    "password":false, 
    "verify":false,
    "ids":false,
    "phone":false
}; 

$(function() { 
    $("#signup_email").blur(function() { 
        var email = $(this).val(); 
        //alert(email);
        console.log(email);
        if(email == "") {
            $("#warn_email").html("Email地址不能为空"); 
            flag.email = false;
            return; 
        }

        var pattern=/\b(^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b/; 
        
        if(!pattern.test(email)){ 
            $("#warn_email").html("Email格式不正确"); 
            flag.email = false;
            return;
        }

                $("#warn_email").html("Email可以使用"); 
                    flag.email = true;
    });


    $("#signup_username").blur(function () { 
        var nickname = $(this).val(); 
        console.log(nickname);
        if(nickname == ""){ 
            $("#warn_user").html("用户名不能为空"); 
            flag.nickname = false;
            return;
        } 
        var pattern = /\b(^[A-Za-z]['_A-Za-z0-9]{5,17}$)\b/; 
        if (!pattern.test(nickname)) { 
            if (nickname.length < 6) {
                $("#warn_user").html("用户名太短"); 
            } else if (nickname.length > 18) {
            	$("#warn_user").html("用户名太长");
            } else if (nickname[0] == '_' || (nickname[0] >= '0' && nickname <= '9')) {
            	$("#warn_user").html("用户名必须要字母开头");
            } else $("#warn_user").html("用户名含有不能使用的字符");
            flag.nickname = false;
            return;
        }else{
            var x = $.post("http://localhost:9999/",{username: nickname}
                , function(data) {console.write(data);}
                // ,function(data){ 
                //     console.log(data);
                //     $("#warn_user").html(data);
                //     if (data == "用户名可以使用") { 
                //         flag.nickname = true; 
                //     } else {
                //         flag.nickname = false;
                //     } 
                // }
             // , "json"
             ); 
            console.log(x);
            // $("#warn_user").html("用户名验证通过"); 
            // flag.nickname = true; 
            return;
        } 
   }); 


    $("#signup_stuId").blur(function () { 
        var idss = $(this).val(); 
        console.log(idss);
        if(idss == ""){ 
            $("#warn_stuID").html("学号不能为空");
            flag.ids = false; 
            return; 
        } 
        var pattern = /\b(^[1-9][0-9]{7}$)\b/; 
        if (!pattern.test(idss)) { 
            if (idss.length != 8) {
                $("#warn_stuID").html("学号长度不对"); 
            } else if (idss[0] == '0') {
            	$("#warn_stuID").html("学号不能为0开头");
            } else $("#warn_stuID").html("学号非法");
            flag.ids = false;
            return;
        }else{ 
            $("#warn_stuID").html("学号格式正确"); 
            flag.ids = true; 
            return;
        } 
   }); 

    $("#signup_phone").blur(function () { 
        var idss = $(this).val(); 
        console.log(idss);
        if(idss == ""){ 
            $("#warn_phone").html("电话不能为空");
            flag.phone = false;
            return; 
        } 
        var pattern = /\b(^[1-9][0-9]{10}$)\b/; 
        if (!pattern.test(idss)) { 
            if (idss.length != 8) {
                $("#warn_phone").html("手机号为11位数字"); 
            } else if (idss[0] == '0') {
            	$("#warn_phone").html("手机号不能为0开头");
            } else $("#warn_phone").html("手机号非法"); 
            flag.phone = false;
            return;
        }else{ 
            $("#warn_phone").html("手机号格式正确"); 
            flag.phone = true; 
            return;
        } 
   }); 
    
    $("#signup_password").blur(function () { 
        var password = $(this).val(); 
        console.log(password);
        if (password == "") { 
            $("#warn_pass").html("密码不能为空"); 
            flag.password = false;
            return;
        } 
        var pattern = /\b(^['A-Za-z0-9]{4,20}$)\b/; 
        if (!pattern.test(password)) {
            if (password.length < 4) {
                $("#warn_pass").html("密码太短"); 
            } else $("#warn_pass").html("密码太长或格式不正确");
            flag.password = false;
            return;    
        } else { 
            $("#warn_pass").html("密码可以使用");
            flag.password = true;
            return; 
        } 
    });

    $("#signup_confirm_password").blur(function () { 
        var password1 = $(this).val(); 
        console.log(password1);
        if (password1 == "") { 
            $("#warn_pwconf").html("重复密码不能为空");
            flag.verify = false;
            return; 
        } 
        var pattern = /\b(^['A-Za-z0-9]{4,20}$)\b/; 
        if (!pattern.test(password1)) { 
            if (password.length < 4) {
                $("#warn_pwconf").html("重复密码太短"); 
            } else $("#warn_pwconf").html("重复密码格式不正确");
            flag.verify = false;
            return;    
        }else if (password1 != $("#signup_password").val()) { 
            $("#warn_pwconf").html("两次输入的密码不一致");
            flag.verify = false;
            return; 
        }else { 
            $("#warn_pwconf").html("密码已验证"); 
            flag.verify = true; 
            return; 
        }                               
    }); 




$("#signup_forms_submit").click(function(){ 
    var ok = flag.email&&flag.password&&flag.verify&&flag.nickname&&flag.phone&&flag.ids;
    console.log("email:" + flag.email);
    console.log("password:" + flag.password);
    console.log("confirm:" + flag.verify);
    console.log("nickname:" + flag.nickname);
    console.log("id:" + flag.ids);
    console.log("phone:" + flag.phone);
    if(ok==false){
        window.history.back(); 
        return; 
    } else {
        $("#sign_form").submit();
    }
});

});