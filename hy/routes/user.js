var site = require( '../config/site' ),
	user = require( '../lib/user' );
function center( req, res ){
    res.render( 'user/center.ejs', site.setting( req ) );
}

function info( req, res ){
    res.render( 'user/info.ejs', site.setting( req ) );
}

function blog( req, res ){
    res.render( 'user/blog.ejs', site.setting( req ) );
}

function addUser( req, res ){
	user.addUser( req, res );
}

function findUser( req, res ){
	user.findUser( req, res );
}

function removeUser( req, res ){
	user.removeUser( req, res );
}

function addPoint( req, res ){
	user.addPoint( req, res );
}

function findPoint( req, res ){
	user.findPoint( req, res );
}

function removePoint( req, res ){
	user.removePoint( req, res );
}

function updatePoint( req, res ){
	user.updatePoint( req, res );
}

module.exports = {
    center: center,
    info: info,
    blog: blog,
	addUser: addUser,
	findUser: findUser,
	removeUser: removeUser,
	addPoint: addPoint,
	findPoint: findPoint,
	removePoint: removePoint,
	updatePoint: updatePoint
}
