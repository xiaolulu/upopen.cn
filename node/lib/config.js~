
global.webConfig = {
	title: '仟金顶网络科技有限公司',
	page: {
		'/': '首页',
		'/index': '首页',
		'/error': '惊呆了',
		'/product': '产品介绍',
		'/wiki': '帮助中心',
		'/introduction': '关于我们',
		'/news': '媒体报道',
		'/aboutus': '联系我们',
		'/legal': '法律声明',
		'/protocol': '注册协议',
		'/user/findPwd': '找回密码',
		'/user/resetPwd': '重置密码',
		'/user/resetPwdSuccess': '重置密码成功',
		'/user/info': '企业信息',
		'/user/join': '申请会员',
		'/user/partners': '合作厂家',
		'/loan/list': '贷款列表',
		'/loan/apply': '贷款申请',
		'/loan/success': '贷款成功',
		'/loan/failed': '贷款失败',
		'/loan/status': '贷款状态'
	},
	basePath: 'http://web.qjdchina.com',
	min: '',//'/min',
	resSetting: function( req, path ){
		console.log( req.path + ' =========')
		return {
			title:       global.webConfig.page[ req.path ] + '-' + global.webConfig.title,
			basePath:    global.webConfig.basePath,
			min:         global.webConfig.min,  
			currentPage: ( path || '' ) + req.path.replace(/(\/[a-z|A-Z]*)?$/,function($1){ ;return $1 + $1}),
		}
	}
}

/**************************************
http request config
***************************************/
global.hostConfig = {
	hostname  : 'qjdchina.com',
	host      : '10.1.1.62',//'172.16.22.180',//'10.175.192.189',  //
	port      : 80,
	uploadDir : './assets/upload'   //file upload dir
}

/**************************************
redis config
***************************************/
global.redisConfig = {
	host      : '10.1.1.182', //host      : '172.16.22.180', //
	port      : 7777
}

module.exports = {};
