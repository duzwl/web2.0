var Global = {
	id: new Array("#A", "#B", "#C", "#D", "#E"),
	success: 0,
	random: new Array(5),
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
    	  	$("#random").html('');
      	}
    ); 
}
function createRandom() {
	for (var i = 0; i < 5; i++) {
		var temp = Math.floor(Math.random()*5);
		Global.random[i] = temp;
		for (var k = 0; k < i; k++) {
			if (Global.random[k] == temp) {
				i--;
				break;
			}
		}
	}
	Global.random[5] = 5;
	for (var t = 0; t < 6; ++t) console.log(Global.random[t]);
}

function Hide() {
	for (var i = 0; i < 5; i++)
	$(Global.id[i]).hide();
}

function Click() {
	Enalbe();
	$('.apb').click(function() {
		if (Global.beclick == 0) {
			dispaly();
		    for (var i = 0; i < 5; ++i) {
			    (function(i) {
			    	Global.callbacks[Global.random[i]] = function() {
			            $(Global.id[Global.random[i]]).show();
			            $(Global.id[Global.random[i]]).html('...');
			            Disable($(Global.id[Global.random[i]]).attr("id"));
		    	        htmlobj = $.ajax({url:"/", success: function() {
		    		        $(Global.id[Global.random[i]]).html(htmlobj.responseText);
		    		        Global.success++;
		    		        Global.callbacks[Global.random[i+1]]();
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
	    	console.log(Global.random[0]);
	        Global.callbacks[Global.random[0]]();
	        Global.beclick++;
		}
	});
}

function dispaly() {
	createRandom();
	var tep = [];
	for (var j = 0; j < Global.random.length; j++) {
		if (Global.random[j] == 0) tep[j] = "A ";
		if (Global.random[j] == 1) tep[j] = "B ";
		if (Global.random[j] == 2) tep[j] = "C ";
		if (Global.random[j] == 3) tep[j] = "D ";
		if (Global.random[j] == 4) tep[j] = "E ";
	}
	$("#random").html(tep[0]+tep[1]+tep[2]+tep[3]+tep[4]);
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
