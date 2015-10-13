define('module/m/a', ['$'], function(reuqire) {
	var $ = reuqire('$');
	return function(c) {
		alert('moduleA加载成功，参数：' + $.param(c));
	}
});