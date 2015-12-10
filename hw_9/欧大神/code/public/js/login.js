$(function(){
	$("button").click(function(){
		if($("#signup_email").val()=="" || $("#signup_password").val()=="")
		{
			$.messager.alert('警告','账号和密码不能为空!');
			 
		}
		else
		{
			$("#sign_form").submit();
		}
    });
});