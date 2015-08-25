
var http = require( 'http' ),
	config = require( '../config/site' ),
	talk = require( '../lib/talk' );

/***********************************************
user

G - info:               企业信息


************************************************/

function list( req, res ){
	
	res.render( 'talk/list.ejs', config.setting( req, '/interact' )  );
	
}

function fetchTalk( req, res ){
    console.log( '=====================' );
	talk.fetchTalk( req, res );

}

function addTalk( req, res ){

	talk.addTalk( req, res );

}

module.exports = {
	list:               list,
	fetchTalk:   fetchTalk,
	addTalk:     addTalk
};
