
var http	= require( 'http' ),
	config	= require( '../config/site' ),
	manage	= require( '../lib/manage' );

/***********************************************
manage

G - info:               管理页面

************************************************/

function login( req, res ){
	
	res.render( 'manage/login.ejs', config.setting( req )  );
	
}

function loginIn( req, res ){
	
	manage.loginIn( req, res );
	
}

function logout( req, res ){
	
	manage.logout( req, res );
	
}

function info( req, res ){
	
	res.render( 'manage/info.ejs', config.setting( req )  );
	
}

function list( req, res ){
	
	res.render( 'manage/list.ejs', config.setting( req )  );
	
}

function edit( req, res ){
   
	res.render( 'manage/edit.ejs', config.setting( req )  );

}

function kindList( req, res ){

	res.render( 'manage/kindList.ejs', config.setting( req )  );

}

function rebuild( req, res ){

	manage.rebuild( req, res );

}

module.exports = {
	login:		login,
	loginIn:	loginIn,
	logout:		logout,
	info:		info,
	list:		list,
	edit:		edit,
	kindList:	kindList,
	rebuild:	rebuild
}
