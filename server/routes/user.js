var user = require( '../lib/user' );

function create( req, res ){
	user.create( req, res );
}

function fetch(){
	user.fetch.call( this )
}

module.exports = {
	create: create,
	fetch: fetch
}
