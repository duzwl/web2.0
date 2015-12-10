$(function(){

	$("#signup_username").blur(function() {
		if(this.val()=="") {
			showMessage("warn_user" , "warn_line_warn" , "账号不能为空");
		} else {
			showMessage("warn_user" , "warn_line_norm" , "aaa");
		}
	});

	$("#signup_password").blur(function() {
		if(this.val()=="") {
			showMessage("warn_pass" , "warn_line_warn" , "密码不能为空");
		} else {
			showMessage("warn_pass" , "warn_line_norm" , "aaa");
		}
	})

	$("button").click(function(){
		if($("#signup_username").val()=="" || $("#signup_password").val()=="") {
			// $.messager.alert('警告','账号和密码不能为空!');
			showMessage("warn_user" , "warn_line_warn" , "请检查账号");
			showMessage("warn_pass" , "warn_line_warn" , "请检查密码");
		}
		else
		{
			$("#sign_form").submit();
		}
    });
});

function showMessage(elem_id , class_type , message) {
    var ways = "#" + elem_id;
    // console.log(elem_id + ":::" + class_type + "  +++  " + message);
    $(ways).fadeOut(300);
    $(ways)[0].className = class_type;
    $(ways).html(message);
    $(ways).fadeIn(600);
}