
define(function(){
	
	
	function isArray( data ){
		
		return Object.prototype.toString.call( data ).toLowerCase() == '[object array]';

	}

	return {
		
		isArray: isArray

	}
})
