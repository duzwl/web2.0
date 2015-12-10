
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
            // $("#warn_email").html("Email不能为空"); 
            showMessage("warn_email" , "warn_line_warn" , "Email不能为空");
           
            flag.email = false;
            return; 
        }

        var pattern=/\b(^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b/; 
        
        if(!pattern.test(email)){ 
            // $("#warn_email").html("Email格式不正确"); 
            showMessage("warn_email" , "warn_line_warn" , "Email格式不正确");
           
            flag.email = false;
            return;
        }

                // $("#warn_email").html("Email可以使用");
                showMessage("warn_email" , "warn_line_success" , "Email可以使用");
                flag.email = true;
    });


    $("#signup_username").blur(function () { 
        var nickname = $(this).val(); 
        console.log(nickname);
        if(nickname == ""){ 
            // $("#warn_user").html("用户名不能为空"); 
            showMessage("warn_user" , "warn_line_warn" , "用户名不能为空");
           
            flag.nickname = false;
            return;
        } 
        var pattern = /\b(^[A-Za-z]['_A-Za-z0-9]{5,17}$)\b/; 
        if (!pattern.test(nickname)) { 
            if (nickname.length < 6) {
                // $("#warn_user").html("用户名太短"); 
            showMessage("warn_user" , "warn_line_warn" , "用户名太短");
           
            } else if (nickname.length > 18) {
            	// $("#warn_user").html("用户名太长");
            showMessage("warn_user" , "warn_line_warn" , "用户名太长");
           
            } else if (nickname[0] == '_' || (nickname[0] >= '0' && nickname <= '9')) {
            	// $("#warn_user").html("用户名必须要字母开头");
            showMessage("warn_user" , "warn_line_warn" , "用户名必须要字母开头");
           
            } else 
            // $("#warn_user").html("用户名含有不能使用的字符");
            showMessage("warn_user" , "warn_line_warn" , "用户名含有不能使用的字符");
           
            flag.nickname = false;
            return;
        }else{
            // var x = $.post("http://localhost:9999/",{username: nickname}
            //     , function(data) {console.write(data);}
            //     // ,function(data){ 
            //     //     console.log(data);
            //     //     $("#warn_user").html(data);
            //     //     if (data == "用户名可以使用") { 
            //     //         flag.nickname = true; 
            //     //     } else {
            //     //         flag.nickname = false;
            //     //     } 
            //     // }
            //  // , "json"
            //  ); 
            // console.log(x);
            // $("#warn_user").html("用户名格式正确"); 
            showMessage("warn_user" , "warn_line_success" , "用户名格式正确");

            flag.nickname = true; 
            return;
        } 
   }); 


    $("#signup_stuId").blur(function () { 
        var idss = $(this).val(); 
        console.log(idss);
        if(idss == ""){ 
            // $("#warn_stuID").html("学号不能为空");
            showMessage("warn_stuID" , "warn_line_warn" , "学号不能为空");
           
            flag.ids = false; 
            return; 
        } 
        var pattern = /\b(^[1-9][0-9]{7}$)\b/; 
        if (!pattern.test(idss)) { 
            if (idss.length != 8) {
                // $("#warn_stuID").html("学号长度不对"); 
            showMessage("warn_stuID" , "warn_line_warn" , "学号长度不对");
           
            } else if (idss[0] == '0') {
            showMessage("warn_stuID" , "warn_line_warn" , "学号不能为0开头");
           
            	// $("#warn_stuID").html("学号不能为0开头");
            } else 
            // $("#warn_stuID").html("学号非法");
            showMessage("warn_stuID" , "warn_line_warn" , "学号非法");
           
            flag.ids = false;
            return;
        }else{ 
            // $("#warn_stuID").html("学号格式正确"); 
            showMessage("warn_stuID" , "warn_line_success" , "学号格式正确");

            flag.ids = true; 
            return;
        } 
   }); 

    $("#signup_phone").blur(function () { 
        var idss = $(this).val(); 
        console.log(idss);
        if(idss == ""){ 
            // $("#warn_phone").html("电话不能为空");
            showMessage("warn_phone" , "warn_line_warn" , "电话不能为空");

            flag.phone = false;
            return; 
        } 
        var pattern = /\b(^[1-9][0-9]{10}$)\b/; 
        if (!pattern.test(idss)) { 
            if (idss.length != 8) {
                // $("#warn_phone").html("手机号为11位数字"); 
            showMessage("warn_phone" , "warn_line_warn" , "手机号为11位数字");

            } else if (idss[0] == '0') {
            	// $("#warn_phone").html("手机号不能为0开头");

            showMessage("warn_phone" , "warn_line_warn" , "手机号不能为0开头");

            } else 
            // $("#warn_phone").html("手机号非法"); 
            showMessage("warn_phone" , "warn_line_warn" , "手机号非法");
            
            flag.phone = false;
            return;
        }else{ 
            // $("#warn_phone").html("手机号格式正确");
            // showMessage("" , "warn_line_warn" , "")
            showMessage("warn_phone" , "warn_line_success" , "手机号格式正确");

            flag.phone = true; 
            return;
        } 
   }); 
    
    $("#signup_password").blur(function () { 
        var password = $(this).val(); 
        console.log(password);
        if (password == "") { 
            // $("#warn_pass").html("密码不能为空");
            showMessage("warn_pass" , "warn_line_warn" , "密码不能为空");

            flag.password = false;
            return;
        } 

            if (password.length >= 6 && password.length <= 18) {
                showMessage("warn_pass" , "warn_line_success" , "密码可以使用");
                flag.password = true;
                return; 
            }else if (password.length < 6) {
                // $("#warn_pass").html("密码太短"); 
                showMessage("warn_pass" , "warn_line_warn" , "密码太短");
            } else if (password > 18) {
            // $("#warn_pass").html("密码太长或格式不正确");
            showMessage("warn_pass" , "warn_line_warn" , "密码太长");
            }
            flag.password = false;
            return;
    });

    $("#signup_confirm_password").blur(function () { 
        var password1 = $(this).val(); 
        console.log(password1);
        if (password1 == "") { 
            // $("#warn_pwconf").html("重复密码不能为空");
            showMessage("warn_pwconf" , "warn_line_warn" , "重复密码不能为空");
            flag.verify = false;
            return; 
        } 
            
            if (password1.length <= 18 && password1.length >= 6 && password1 == $("#signup_password").val()) {
                showMessage("warn_pwconf" , "warn_line_success" , "密码已验证");
                flag.verify = true; 
                return; 
            } else if (password1 != $("#signup_password").val()) { 
            // $("#warn_pwconf").html("两次输入的密码不一致");
                showMessage("warn_pwconf" , "warn_line_warn" , "两次密码不一致"); 
            }else if (password1.length < 6) {
                // $("#warn_pwconf").html("重复密码太短"); 
                showMessage("warn_pwconf" , "warn_line_warn" , "重复密码太短");
            } else if (password1.length > 18) {
            // $("#warn_pwconf").html("重复密码格式不正确");
                showMessage("warn_pwconf" , "warn_line_warn" , "重复密码太长");
            }
        flag.verify = false;
        return;
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
        // window.history.back();
        if (!flag.email) {
            // $("warn_email").html("请重新检查邮件");
            showMessage("warn_email" , "warn_line_warn" , "请重新检查邮件");

        }
        if (!flag.nickname) {
            // $("warn_user").html("请重新检查用户名");
            showMessage("warn_user" , "warn_line_warn" , "请重新检查用户名");

        }
        if (!flag.password) {
            // $("warn_pass").html("请重新检查密码");
            showMessage("warn_pass" , "warn_line_warn" , "请重新检查密码");

        }
        if (!flag.verify) {
            // $("warn_pwconf").html("密码重复检验失败");
            showMessage("warn_pwconf" , "warn_line_warn" , "密码重复检验失败");
        }
        if (!flag.ids) {
            // $("warn_stuID").html("请重新检查学号");
            showMessage("warn_stuID" , "warn_line_warn" , "请重新检查学号");
        }
        if (!flag.phone) {
            showMessage("warn_phone" , "warn_line_warn" , "请重新检查手机号")
        }
        return; 
    } else {
        $("#sign_form").submit();
    }
});

$("#signup_forms_reset").click(function() {
    $("#signup_username").val("");
    $("#signup_phone").val("");
    $("#signup_password").val("");
    $("#signup_confirm_password").val("");
    $("#signup_stuId").val("");
    $("#signup_email").val("");
    flag.email = flag.password = flag.verify = flag.nickname = flag.phone = flag.ids = false;
})

});

function showMessage(elem_id , class_type , message) {
    var ways = "#" + elem_id;
    console.log(elem_id + ":::" + class_type + "  +++  " + message);
    $(ways).fadeOut(300);
    $(ways)[0].className = class_type;
    $(ways).html(message);
    $(ways).fadeIn(600);
}
