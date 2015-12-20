var Global = {
	id: new Array("#A", "#B", "#C", "#D", "#E"),
	success: 0
};

$(document).ready(function(){
  Hide();
  Click();
  InfoClick();
  HoverOut();
});

function HoverOut() {
	$('#at-plus-container').hover(
  	function() {}, 
  	function() {
  	  	for (var i = 0; i < 5; i++) {
			$(Global.id[i]).hide();
			$(Global.id[i]).parent().removeClass('disable enable click');
	  	}
	  	Global.success = 0;
	  	$('#info').html('');
  	});
}
function Hide() {
	for (var i = 0; i < 5; i++)
	$(Global.id[i]).hide();
}

function Click() {
	for (var i = 0; i < 5; i++) {
		$(Global.id[i]).parent().click(function() {
			if ($(this).hasClass("disable") || $(this).hasClass("click")) return;
			$(this).addClass('click');
			$(this).children().show();
			$(this).children().html('...');
			Disable($(this).children().attr("id"));
			var that = this;
			htmlobj = $.ajax({url:"/", success: function() {
				$(that).children().html(htmlobj.responseText);
				Enalbe($(that).children().attr("id"));
				Global.success++;
			}})
		})
	}
}

function InfoClick() {
	$("#info").click(function() {
		if (Global.success != 5) return;
		var sum = 0;
		for (var i = 0; i < 5; i++)
			sum =  sum + parseInt($(Global.id[i]).html());
		$(this).html(sum);
	});
}

function Disable(currentId) {
	for (var i = 0; i < 5; i++) {
		if (Global.id[i] == "#" + currentId || $(Global.id[i]).parent().hasClass('click')) continue;
		$(Global.id[i]).parent().removeClass('enable');
		$(Global.id[i]).parent().addClass('disable');
	}
}

function Enalbe(currentId) {
	for (var i = 0; i < 5; i++) {
		if (Global.id[i] == "#" + currentId || $(Global.id[i]).parent().hasClass('click')) continue;
		$(Global.id[i]).parent().removeClass('disable');
		$(Global.id[i]).parent().addClass('enable');
	}
}
