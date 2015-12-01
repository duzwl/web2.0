神秘代码：
var my = {
	table: $('table'),
	num: $('table').length,  // 表格个数
	td: new Array($('table').length),  // td[0]:第一个table的所有td组成的数组
	tdnum: new Array($('table').length),  // tdnum[0]:第一个table的td个数
	th: new Array($('table').length),
    thnum: new Array($('table').length),
    Mode: new Array($('table').length),  // Mode[0]:第一个表格th的状态（true false)组成的数组
    ss: "",  // 被点击的表格的id
    s: 0  // 对应的第几个表格
};
function all() {
	getReady();
	start();
}
function getReady() {  //获取所有表格的数据
	for (var i = 0; i < my.num; i++) {
		my.table[i].setAttribute('id', 'table-' + i);
		my.td[i] = $('#table-' + i + ' td');
		my.th[i] = $('#table-' + i + ' th');
		my.tdnum[i] = my.td[i].length; 
		my.thnum[i] = my.th[i].length;
		my.Mode[i] = new Array(my.thnum[i]);
		for (var j = 0; j < my.thnum[i]; j++) my.Mode[i][j] = false;
	}
}
function start() {
    for (var i = 0; i < my.num; i++)
	    my.th[i].each(function(index) {
	    	this.onclick = function() {
		        my.ind = index; my.ss = $(this).parents('table').attr('id');
                my.s = parseInt(my.ss[my.ss.length - 1]);
                $("#table-" + my.s + " tbody").children().remove();
		        mode();
		        sortCol();
		        change();
	        }
	    });
}
function mode() {    // 决定升序或者降序
	if (!my.Mode[my.s][my.ind]) {  // 点击另外一个表头时要复原 原先的类的
		for (var i = 0; i < my.thnum[my.s]; i++) {
			my.Mode[my.s][i] = false;
			my.th[my.s][i].className = '';
		}
	}
	if (my.th[my.s][my.ind].className == 'th2') my.th[my.s][my.ind].className = 'th1';
	else my.th[my.s][my.ind].className = 'th2';
	my.Mode[my.s][my.ind] = !my.Mode[my.s][my.ind];
}
function sortCol() {   // 对获取的一列排序
	my.row = my.tdnum[my.s]/my.thnum[my.s];
	my.column = new Array(my.row);  // 被点击的那一列
	for (var i = 0, j = 0; i < my.tdnum[my.s]; i++)
	if (i%my.thnum[my.s] == my.ind)
	{ my.column[j] = my.td[my.s][i].textContent;
	if (!isNaN(parseFloat(my.column[j]))) my.column[j] = parseFloat(my.column[j]); ++j; }if (my.Mode[my.s][my.ind]) my.column.sort(function(a, b) { return a > b? 1 : -1;} );
	else my.column.sort(function(a, b) { return a < b? 1: -1; });
}
function change() {   // 将排序后的列表更新
	for (var i = 0; i < my.row; i++)
		for (var j = 0; j < my.tdnum[my.s]; j++)
			if (my.column[i] == my.td[my.s][j].textContent) {
				var temp = '<tr>';
				for (var k = 0; k < my.thnum[my.s]; k++)
					temp += '<td>'+my.td[my.s][j-my.ind+k].textContent+'</td>';
				temp += '</tr>';
				$("#table-" + my.s + " tbody").append(temp);
			}
	$("#table-" + my.s + " tbody").children().each(function(i) {
		if (i%2 != 0) $(this).addClass('alternate');
	});
}
all();

可执行网页：
http://soj.sysu.edu.cn/courses.php
http://222.201.146.216/JudgeOnline/problemset.php
http://acm.swust.edu.cn/user/ranklist/
