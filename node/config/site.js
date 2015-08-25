/**
@module site config
*/
var siteTitle = '优品开源',
	pageTitle = {
		    '/'				: '首页',
			'/index'		: '首页',
			'/error'		: '惊呆了',
			'/product'		: '产品介绍',
			'/talk'			: '随便聊聊',
			'/wiki'			: '帮助中心',
			'/article/list'	: '文章列表',
			'/article/info'	: '文章详情',
			'/article/edit'	: '文章编辑',
			'/introduction'	: '关于我们'
	    },
	basePath = 'http://www.upopen.com';

module.exports = {
	siteTitle	: siteTitle,
	pageTitle	: pageTitle,
	basePath	: basePath, 
	setting		: function( req, path, file ){
		return {
			title		: pageTitle[ req.path ] + '-' + siteTitle,
			basePath	: basePath,
			currentPage	: ( path || '' ) + ( file || req.path.replace(/(\/[a-z|A-Z]*)?$/, function( $1 ){ return $1 + $1 } ) )
		}
	}
}
