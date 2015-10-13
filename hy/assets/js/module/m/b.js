define('module/m/b', ['$'], function(reuqire) {
	return function(c) {
		alert('moduleB加载成功，参数：' + c);
	}
});