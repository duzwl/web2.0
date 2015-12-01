var my = {
    curPosition: 15,
    str: false,   // 开始按钮
    anotherbg: false,    // 记录换背景图
    m: 1,     // 记录选择的难度
    t: 9999,   // 剩余时间
    clock: null,
    w: true   // 输赢
}
$(document).ready(function() {
    start();
    reset();
    onClick();
    changebg();
    choosemode();
});
function judge(t) {   // 随机悬着符合要求的位置
    while (1) {
        t = parseInt(Math.random()*16);
        if (my.curPosition == 3 && (t == 2 || t == 7)) break;
        if (my.curPosition == 4 && (t == 0 || t == 5 || t == 8)) break;
        if (my.curPosition == 7 && (t == 6 || t == 3 || t == 11)) break;
        if (my.curPosition == 8 && (t == 9 || t == 4 || t == 12)) break;
        if (my.curPosition == 11 && (t == 10 || t == 15 || t == 7)) break;
        if (my.curPosition == 12 && (t == 13 || t == 8)) break;
        if (my.curPosition == 0 && (t == 1 || t == 4)) break;
        if (my.curPosition == 1 && (t == 0 || t == 2 || t == 5)) break;
        if (my.curPosition == 2 && (t == 1 || t == 3 || t == 6)) break;
        if (my.curPosition == 5 && (t == 4 || t == 6 || t == 1 || t == 9)) break;
        if (my.curPosition == 6 && (t == 5 || t == 7 || t == 2 || t == 10)) break;
        if (my.curPosition == 9 && (t == 8 || t == 10 || t == 5 || t == 13)) break;
        if (my.curPosition == 10 && (t == 9 || t == 11 || t == 6 || t == 14)) break;
        if (my.curPosition == 13 && (t == 12 || t == 14 || t == 9)) break;
        if (my.curPosition == 14 && (t == 13 || t == 15 || t == 10)) break;
        if (my.curPosition == 15 && (t == 14 || t == 11)) break;
    }
    return t;
}
function start() {
    $("#bt1").click(function() {
        if (!my.str) {
            my.clock = setInterval(time, 1000); my.str = true;
            var t = parseInt(Math.random()*16);  // 临时的t,与全局的不同
            var tempf = ""; var tempt = "";  // 临时id 
            for (var i = 0; i < 200*my.m; ++i) {
                t = judge(t);
                tempt = "d"+my.curPosition.toString(); tempf = "d"+t.toString();
                var temp = $("#"+tempf).attr("class");
                $("#"+tempf).attr("class", $("#"+tempt).attr("class"));
                $("#"+tempt).attr("class", temp);
                my.curPosition = t;
            }
        }
    });
}
function won() {   // 当c0...与位置相对应时即获胜
    if (my.str == true) {
        my.w = true;
        $("#all").children().each(function(i) {
            var s = "c"+i.toString();
            if ($(this).attr("class") != s) {
                my.w = false;
            }
        });
        if (my.w == true) {
            alert("You won!");
            my.str = false; my.curPosition = 15;
            $("#all").children().each(function(i) {
                if (my.anotherbg == true) $(this).attr("class", "c"+i.toString()+"c");
                else $(this).attr("class", "c"+i.toString());
            });
            if (my.m == 1) my.t = 9999;
            else if (my.m == 2) my.t = 360;
            else my.t = 180;
            $("#leftt").html(my.t);
            clearInterval(my.clock);
        }
    } 
}
function onClick() {    // 图片被点击
    var s = "";
    var tempf = ""; var tempt = "";  // 临时id
    $("#all").delegate("div", "click", function() {
        if (my.str) {
            s = this.id.substring(1);
            if (s == (my.curPosition-1).toString() || s == (my.curPosition+1).toString()
            || s == (my.curPosition+4).toString() || s == (my.curPosition-4).toString()) {
                tempt = "d"+my.curPosition.toString(); tempf = "d"+s.toString();
                var temp = $("#"+tempf).attr("class");
                $("#"+tempf).attr("class", $("#"+tempt).attr("class"));
                $("#"+tempt).attr("class", temp);
                my.curPosition = parseInt(s);
            }
        }
    });
}
function reset() {    // 重新开始游戏
    $("#bt2").click(function() {
        if (my.str) {
            my.str = false; my.curPosition = 15;
            $("#all").children().each(function(i) {
                if (my.anotherbg == true) $(this).attr("class", "c"+i+"c");
                else $(this).attr("class", "c"+i.toString());
            });
            if (my.m == 1) my.t = 9999;
            else if (my.m == 2) my.t = 360;
            else my.t = 180;
            $("#leftt").html(my.t);
            clearInterval(my.clock);
        }
    });
}
function changebg() {   // 改变背景图
    $("#bg1").click(function() {
        if (!my.str) {
            if (my.anotherbg == false) {
                my.anotherbg = true;
                bg1.className = "bg11";
            } else {
                my.anotherbg = false;
                bg1.className = "bg1c";
            }
            if (my.anotherbg == true) {
                $("#all").children().each(function() {
                    $(this).attr("class", $(this).attr("class")+"c");
                });
            } else {
                $("#all").children().each(function(i) {
                    $(this).attr("class", "c"+i.toString());
                });
            }
        }
    });
}
function choosemode() {
    mode1();
    mode2();
    mode3();
}
function mode1() {
    $("#mode1").click(function() {
        if (!my.str) {
            if (my.m == 2) $("#mode2").attr("class", "bg1c");
            if (my.m == 3) $("#mode3").attr("class", "bg1c");
            my.m = 1; my.t = 9999;
            this.className = "bg11";
            $("#leftt").html(my.t);
        }
    });
}
function mode2() {
    $("#mode2").click(function() {
        if (!my.str) {
            if (my.m == 1) $("#mode1").attr("class", "bg1c");
            if (my.m == 3) $("#mode3").attr("class", "bg1c");
            my.m = 2; my.t = 360;
            this.className = "bg11";
            $("#leftt").html(my.t);
        }
    });
}
function mode3() {
    $("#mode3").click(function() {
        if (!my.str) {
            if (my.m == 2) $("#mode2").attr("class", "bg1c");
            if (my.m == 1) $("#mode1").attr("class", "bg1c");
            my.m = 3; my.t = 180;
            this.className = "bg11";
            $("#leftt").html(my.t);
        }
    });
}
function time() {
    if (my.str) {
        my.t--;
        $("#leftt").html(my.t);
        won();
        if (my.t <= 0) {
            alert("You lose!");
            my.str = false; my.curPosition = 15;
            $("#all").children().each(function(i) {
                if (my.anotherbg == true) $(this).attr("class", "c"+i.toString()+"c");
                else $(this).attr("class", "c"+i.toString());
            });
            if (my.m == 1) my.t = 9999;
            else if (my.m == 2) my.t = 360;
            else my.t = 180;
            $("#leftt").html(my.t);
            clearInterval(my.clock);
        }
    }
}