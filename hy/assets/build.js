({ 
	appDir: './',   	//项目根目录，给后面的baseUrl做参考;非必要项;默认为与r.js平级目录
	dir: './min', 		//压缩后的文件的输出目录 
	baseUrl: './', 		//模块相对目录，与后面的paths配置使用
	modules: [      
		{ name:'login'},
		{ name: 'register' },
		{ name: 'center' }
	], 
	fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/, //过滤文件不压缩
	optimizeCss: 'standard', 	//css的标准方式
	optimize: 'uglify',			//设置是否压缩;uglify(压缩格式)|none(只合并不压缩)
	removeCombined: true,		//设置移除压缩后的文件
	paths: {   					//设置模块别名，方便引用，压缩后require.js引用的模块路径就在这里定义的，不是require.config里的
			md5: 'core/js/md5',
			validate: 'widget/validate/validate',
		    all: 'public/js/all',
			login: 'module/issue/login/login',
			register: 'module/issue/register/register',
			center: 'module/user/center/center'
		}
})
