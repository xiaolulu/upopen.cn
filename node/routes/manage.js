
var http	= require( 'http' ),
	config	= require( '../config/site' ),
	manage	= require( '../lib/manage' );

/***********************************************
manage

G - info:               管理页面

************************************************/

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
	list:		list,
	edit:		edit,
	kindList:	kindList,
	rebuild:	rebuild
}
