
var http = require( 'http' ),
	config = require( '../config/site' ),
	redis = require( '../tool/redis' ),
	toy = require( '../tool/toy' ),
	talk = require( '../lib/talk' );

/***********************************************
user

G - info:               企业信息


************************************************/

function list( req, res ){
	
	res.render( 'talk/list.ejs', config.setting( req, '/interact' )  );
	
}

function fetchTalk( req, res ){
    
	talk.fetchTalk( req, res );

}

function addTalk( req, res ){
	
	console.log( req.headers.cookie );
	var sid = toy.getCookie( req.headers.cookie, 'connectSid' ),
		user = '',
		userid = '';
	if( sid ){
		console.log( sid );
		redis.get( sid, function( ret ){
			console.log( user )
			console.log( typeof user )
			user = ret;
			if( user ){
				user = JSON.parse( user )
				userid = user.username;
				req.body.userId = userid;
				talk.addTalk( req, res );
			} else {
				//req.body.userId = userid;
				//talk.addTalk( req, res );
				res.send( {code: 2001, msg: 'login please'} );
			}
		} );
	} else {
		//req.body.userId = userid;
		//talk.addTalk( req, res );
		res.send( {code: 2001, msg: 'login please'} );
	}
	
	

}

module.exports = {
	list:               list,
	fetchTalk:   fetchTalk,
	addTalk:     addTalk
};
