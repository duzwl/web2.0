���ش��룺
var my = {
	table: $('table'),
	num: $('table').length,  // ������
	td: new Array($('table').length),  // td[0]:��һ��table������td��ɵ�����
	tdnum: new Array($('table').length),  // tdnum[0]:��һ��table��td����
	th: new Array($('table').length),
    thnum: new Array($('table').length),
    Mode: new Array($('table').length),  // Mode[0]:��һ�����th��״̬��true false)��ɵ�����
    ss: "",  // ������ı���id
    s: 0  // ��Ӧ�ĵڼ������
};
function all() {
	getReady();
	start();
}
function getReady() {  //��ȡ���б�������
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
function mode() {    // ����������߽���
	if (!my.Mode[my.s][my.ind]) {  // �������һ����ͷʱҪ��ԭ ԭ�ȵ����
		for (var i = 0; i < my.thnum[my.s]; i++) {
			my.Mode[my.s][i] = false;
			my.th[my.s][i].className = '';
		}
	}
	if (my.th[my.s][my.ind].className == 'th2') my.th[my.s][my.ind].className = 'th1';
	else my.th[my.s][my.ind].className = 'th2';
	my.Mode[my.s][my.ind] = !my.Mode[my.s][my.ind];
}
function sortCol() {   // �Ի�ȡ��һ������
	my.row = my.tdnum[my.s]/my.thnum[my.s];
	my.column = new Array(my.row);  // ���������һ��
	for (var i = 0, j = 0; i < my.tdnum[my.s]; i++)
	if (i%my.thnum[my.s] == my.ind)
	{ my.column[j] = my.td[my.s][i].textContent;
	if (!isNaN(parseFloat(my.column[j]))) my.column[j] = parseFloat(my.column[j]); ++j; }if (my.Mode[my.s][my.ind]) my.column.sort(function(a, b) { return a > b? 1 : -1;} );
	else my.column.sort(function(a, b) { return a < b? 1: -1; });
}
function change() {   // ���������б����
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

��ִ����ҳ��
http://soj.sysu.edu.cn/courses.php
http://222.201.146.216/JudgeOnline/problemset.php
http://acm.swust.edu.cn/user/ranklist/
