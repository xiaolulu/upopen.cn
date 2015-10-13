
var Events = require( 'events' );

console.log( Events );

var emiiter = new Events();

console.log( emiiter );
console.log( '#################')
var Dialog = function(){

}



function apply( source ){
     var args = Array.prototype.slice.call( arguments, 1 );
         for( var i = 0, parent; parent = args[i]; i++ ){
             for( var prop in parent ){
                 source[ prop ] = parent[ prop ];
             }
         }
}

var extend = function(){
    // inline overrides
    var io = function(o){
        for(var m in o){
            this[m] = o[m];
        }
    };
    var oc = Object.prototype.constructor;

    return function(sb, sp, overrides){
        if(typeof sp == 'object'){
            overrides = sp;
            sp = sb;
            sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
        }
        var F = function(){},
            sbp,
            spp = sp.prototype;

        F.prototype = spp;
        sbp = sb.prototype = new F();
        sbp.constructor=sb;
        sb.superclass=spp;
        if(spp.constructor == oc){
            spp.constructor=sp;
        }
        sb.override = function(o){
            Ext.override(sb, o);
        };
        sbp.superclass = sbp.supr = (function(){
            return spp;
        });
        sbp.override = io;
        apply(sb, overrides);
        sb.extend = function(o){return extend(sb, o);};
        return sb;
    };
}();

Dialog = extend( Dialog, Events );

Dialog.prototype.show = function( txt ){
		this.emit( 'show', txt );
	}

var dialog = new Dialog();

dialog.on( 'show', function(txt){ console.log( txt )});

dialog.show( 'this is show' );
console.log( dialog.show );
console.log( 111111111111111 )
setTimeout( function(){
	console.log( '$$$$$$$$$$$$$$$$$$')
	debugger
	dialog;
}, 5000 );

/*var domain = require( 'domain' );
console.log( domain );


function async_error() {
    setTimeout(function(){
        var r =  6;//Math.random() * 10;
        console.log("random num is " + r);
        if (r > 5) {
            throw new Error("Error: random num" + r + " > 5");
        }
    },10)

}

setTimeout( function(){
	console.log( '#################################' )
}, 3000)

setInterval(function () {
    try {
        async_error();
    } catch (err) {
        console.log(err);
    }
}, 1000)

process.on('uncaughtException', function (err) {
    console.log(err);
});

/*
function sync_error() {
    var r = Math.random() * 10;
    console.log("random num is " + r);
    if (r > 5) {
        throw new Error("Error: random num" + r + " > 5");
    }
}

setInterval(function () {
    try {
        sync_error();
    } catch (err) {
        console.log(err);
    }

}, 1000)




/*
var path = require( 'path' );

console.log( path );

var p = path.normalize( '/foo/bar/baz/asdf/..' );
p = path.join( 'foo', '//bar//','..', '///baz' );
p = path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
p = path.dirname( 'foo/bar/demo' );
p = path.relative('/data/orandea/test/aaa', '/data/orandea/test/aaa');
p = path.isAbsolute( '/foo/bar' );
p = 'foo\\bar\\baz'.split( path.sep );
p = path.parse('/home/user/dir/file.txt');
p = path.format({ root: '/',
dir: '/home/user/dir',
base: 'file.txt',
ext: '.txt',
name: 'file' })
console.log( p );

/*var util = require( 'util' );



console.log( util );
var debuglog = util.debuglog( 'foo' );
var bar = '123';
debuglog( 'hello form foo [%d]', bar );

var Events = require( 'events' );

console.log( Events );
var event = new Events();

event.setMaxListeners( 20 );

event.on( 'removeListener', function(){
	console.log( event.listeners( 'show' ) );
	console.log( arguments );
})
event.on( 'show', function( txt ){ console.log( 'one ' + txt )})
event.on( 'show', function( txt ){ console.log( 'tow ' + txt )})
event.once( 'hide', function( txt ){ console.log( 'one ' + txt )})

function show( txt ){ console.log( txt ) };
event.on( 'show', show );

event.removeAllListeners( 'show' );
//console.log( event.listeners( 'show' ) );

var assert = require( 'assert' );
console.log( assert );

//assert.fail( 1, 1, ['test', '==' );
assert.throws(function() {
　　throw new Error("Seven Fingers. Ten is too mainstream.");
});

assert.equal(1, 0, 'Truthy');



/*
var qs = require( 'querystring' );

var c = qs.stringify({foo: 'bar', baz: 'qux'}, '*','%' );
c = qs.escape("'<>&");
c = qs.unescape(c);
console.log( c );
console.log( qs.parse( c, '*', '%' ) );

var os = require( 'os' );
console.log( os );

console.log( os.hostname() );
console.log( os.type() );
console.log( os.platform() );
console.log( os.arch() );
console.log( os.release() );
console.log( os.uptime() );
console.log( os.loadavg() );
console.log( os.totalmem() );
console.log( os.freemem() );
console.log( os.cpus() );
console.log( os.networkInterfaces() );
/*
var util = require( 'util' );
var Event = require( 'events' ).EventEmitter;

var e = new Event();

e.on( 'newListener', function(s){
	console.log( arguments );
});

e.on( 'removeListener', function(){
	console.log( '=========' );
	console.log( arguments );
})

function c( s ){
	console.log( s )
}

e.on( 'click', function(s){
	console.log(s)
}).on( 'click', c );


//e.removeAllListeners( ['click'] );

e.emit( 'click', 'he' );

e.setMaxListeners( 100 );

console.log( e.listeners( 'click' ) );
console.log( __dirname );


//console.log( util );
/*
var path = require( 'path' );

var c = path.normalize('/foo/bar//baz/asdf/quux/../..');
c = path.join('foo','a','e','..');
c = path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
c = path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
c = path.extname('wwwroot/gif/image.gif');
//c = path.isAbsolute('/foo/bar');
//console.log('asdf: %s', c );
console.time('100-elements');
for (var i = 0; i < 1000000; i++) {
  ;
}
console.timeEnd('100-elements');
console.log('%cxxx','red')
console.info(111)
console.error(path)
console.warn(111)
console.dir(path)
console.trace('trace');
//console.trace(111)
function test(){};

exports.test = test;

/*

{ protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }


var fs = require( 'fs' );

console.log( process.cwd() );
/*
fs.rename( 'tool/test.js', 'tool/demo.js', function( err ){
	if( err ){
		throw err
	}
	console.log( 'success rename' );
})

fs.unlink( 'tool/test.js', function( err ){
	if( err ){
		throw err;
	}
	console.log( 'success' );
});

fs.unlinkSync( 'tool/test2.js' );
console.log( 'success2' );
*/
