var Global = {
	id: new Array("#A", "#B", "#C", "#D", "#E"),
	success: 0,
	beclick: 0
};

$(document).ready(function(){
    Hide();
    Click();
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
	      	Global.success = 0, Global.beclick = 0;
	     	$('#info').html('');
  	    }
  	); 
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
				    var random = Math.random();
			    	$(Global.id[i]).show();
			        $(Global.id[i]).html('...');
			        Disable($(Global.id[i]).attr("id"));
			        $.get('/'+random, function(data) {
			    	    $(Global.id[i]).html(data);
			    	    Global.success++;
			    	    if (Global.success == 5) {
	                        var sum = 0;
		                    for (var ii = 0; ii < 5; ii++)   // 用var i = 0;  错
	                        sum = sum+parseInt($(Global.id[ii]).html());
	                        $('#info').html(sum);
	                    }
			        });
		    	})(i);
		    }
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
