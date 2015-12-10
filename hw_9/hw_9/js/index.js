$( function() {
	var submit = $("button[type='submit']");
	var reset = $("button[type='reset']");
	var name = $("#name");
	var id = $("#id");
	var phone = $("#phone");
	var email = $("#email");

	submit.attr('disabled','disabled');
	submit.click(function() { toSubmit(); });
	reset.click(function() {
		$('.reminder').css('visibility','hidden');
	});
	$("input").keypress(function() { toSubmit(); });
	$("input").blur(function() {
		var value = $(this).val();
		var input = $(this).attr('name');
		if (input == 'name') {
			if (!(/[A-Za-z]{1}[0-9a-zA-Z]*_*/.test(value)) || value.length > 18 || value.length < 6) name.css('visibility','visible');
			else name.css('visibility','hidden');
		}
		if (input == 'id') {
			if (!(/[1-9]{1}[0-9]{7}/.test(value)) || value.length > 8) id.css('visibility','visible');
			else id.css('visibility','hidden');
		}
		if (input == 'phone') {
			if (!(/[1-9]{1}[0-9]{10}/.test(value)) || value.length > 11) phone.css('visibility','visible');
			else phone.css('visibility','hidden');
		}
		if (input == 'email') {
			if (!(/^[A-Za-z0-9_\-]+@(([A-Za-z0-9_\-])+\.)+[A-Za-z]{2,4}$/.test(value))) email.css('visibility','visible');
			else email.css('visibility','hidden');
		}
		toSubmit();
	});
});

function toSubmit() {
	var flag = true;
	for (var i = 0; i < 4; i++) {
		if ($(".reminder").eq(i).css('visibility') == 'visible') {
			$("button[type='submit']").attr('disabled','disabled');
			flag = false;
		}
		if ($("input").eq(i).val() == "") flag = false;
	}
	if (flag) $("button[type='submit']").removeAttr('disabled');
	else $("button[type='submit']").attr('disabled','disabled');
}
