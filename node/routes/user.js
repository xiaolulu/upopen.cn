
var http = require( 'http' ),
	config = require( '../config/site' ),
	user = require( '../lib/user' );

/***********************************************
user

G - info:               企业信息


************************************************/
function findUser( req, res ){
    
	user.findUser( req, res );

}

function addUser( req, res ){

	user.addUser( req, res );

}

function info( req, res ){

	res.render( 'user/info.ejs', config.setting( req )  );

}

module.exports = {
	addUser:    addUser,
	findUser:   findUser,
	info:		info
};
