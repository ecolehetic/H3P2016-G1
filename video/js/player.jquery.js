(function($){
	
	var methods={
		
		
		
		init:function(options) {
			var $this=$(this);
			var params=$.extend($.fn.player.defaults,options);
	       	this.each(function(){
							$(this).load();
							$(this).on('timeupdate',methods.updateProgress.call(this,params,$(this))).on('canplaythrough',function(){params.onloaded.call(this)});
	       	});
		},
		
		play : function () {
			return this.each(function(){
				$(this)[0].play();
				
			});
		},
		
		updateProgress : function (params,el) {
			var $this=$(this);
			console.log(el[0]); 
			var progressWidth=$this.currentTime*100/$this.duration;
			$(params.progress).width(progressWidth+'%');
						
			var bufferWidth=$this.buffered.end(0)*100/$this.duration;
			$(params.buffer).width(bufferWidth+'%');
		}
	
  };

  	$.fn.player=function(method){
	
    	if ( methods[method] ) {
      		return methods[method].apply( this, Array.prototype.slice.call(arguments,1));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.init.apply( this, arguments );
    	} else {
      		console.log( 'Method ' +  method + ' does not exist on jQuery.myplug' );
    	}   
  	};

	$.fn.player.defaults={video:'#video',controller:'.progress',progress:'#progressBar',buffer:'.buffer',onloaded:function(){}};

})(jQuery);
