var result = "0";
var equal = false;
document.getElementById("result").value = result;
window.onload = function() {
    var allEle = document.getElementById("part");
    var ss = allEle.getElementsByTagName("input");
    for (var i = 1; i < ss.length; ++i) {
    	ss[i].onclick = function() {
            if (result.length > 30) {
                alert("Input too long!");
            }
    		if (equal == true) {
    			if (this.value == "=") {   // 多次按下等号
    				result = result;
    			} else {
                    if (this.value == "+" || this.value == "-" || this.value == "*" || this.value == "/")
                        result = result;   // 利用上次计算所得结果
    				else result = "0";
    		        document.getElementById("result").value = result;
    			}
    		    equal = false;
    		}
    		if (this.value == "CE") {
        	    result = "0";
            } else if (this.value == "=") {
            	if (result == "0") {   // 开机时多次按等号
            		reslut = "0";
            	} else {
        	    	try {
        		        result = parseFloat(eval(result).toFixed(8), 10);  // 控制误差
        		        equal = true;
        	        } catch(exception) {
        		        alert("Invalid input!");
        	        }
        	    }
            } else if (this.value == "←") {
                if (result.length == 1) result = "0";
                else result = result.substring(0, result.length - 1);
            } else {
            	if (result == "0") result = "";
        		result += this.value;
            }
            document.getElementById("result").value = result;
        }
    }
}
