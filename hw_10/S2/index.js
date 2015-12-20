var Global = {
	id: new Array("#A", "#B", "#C", "#D", "#E"),
	success: 0,
	beclick: 0,
	callbacks: new Array(6)
};

$(document).ready(function() {
  Hide();
  Click();
  HoverOut();
});

function HoverOut() {
	$('#at-plus-container').hover(
  	function() {}, 
  	function() {
  	  	for (var i = 0; i < 5; i++) {
  	  		Global.callbacks[i] = function(){};
			$(Global.id[i]).hide();
			$(Global.id[i]).parent().removeClass('disable enable click');
	  	}
	  	Global.success = 0, Global.beclick = 0;
	  	$('#info').html('');
  	}); 
}

function Hide() {
	for (var i = 0; i < 5; i++)
	$(Global.id[i]).hide();
}

function Click() {
	Enalbe();
	$('.apb').click(function() {
		if (Global.beclick == 0) {
		for (var i = 0; i < 5; ++i) {
			(function(i) {
				Global.callbacks[i] = function() {
			        $(Global.id[i]).show();
			        $(Global.id[i]).html('...');
			        Disable($(Global.id[i]).attr("id"));
			        htmlobj = $.ajax({url:"/", success: function() {
				        $(Global.id[i]).html(htmlobj.responseText);
				        Global.success++;
				        Global.callbacks[i+1]();
			        }});
				}
			})(i);
		}
		Global.callbacks[5] = function() {
			var sum = 0;
		    for (var i = 0; i < 5; i++)
	        sum =  sum+parseInt($(Global.id[i]).html());
	        $('#info').html(sum);
		}
	    Global.callbacks[0]();
	    Global.beclick++;
		}
	});
}

function Disable(id) {
	$('#'+id).parent().removeClass('enable');
	$('#'+id).parent().addClass('disable');
}

function Enalbe() {
	for (var i = 0; i < 5; i++) {
		$(Global.id[i]).parent().addClass('enable');
	}
}
