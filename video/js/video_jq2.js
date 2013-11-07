var player={
	
	params : {
		video:'',
		progressBar:'',
		button:'',
		buffer:'',
		onloaded:function(){},
		onplay:function(){},
		onrandom:function(){}
	},

	init : function (options) {
		this.params=$.extend(this.params,options);
		$(this.params.video).bind('timeupdate',this.updateProgress);
	},
	
	
	playPause : function () {
		var media=$(player.params.video)[0];
		$(player.params.button).removeClass('loading');
		if(media.paused){
			media.play();
			$(player.params.video).addClass('play');
			$(player.params.button).addClass('off');
			player.params.onplay.call(this);
		}
		else{
			media.pause();
			$(player.params.button).removeClass('off');
		}
	},

	updateProgress : function () {
		var media=$(this)[0];
		var progressW=media.currentTime*100/media.duration;
		$(player.params.progressBar).width(progressW+'%');
	
		var bufferW=media.buffered.end(0)*100/media.duration;
		$(player.params.buffer).width(bufferW+'%');
	},

	setTime : function (e) {
		var media=$(player.params.video)[0];
		media.currentTime=e.offsetX*media.duration/$(this).width();
	},
	
	random : function (e){
		$.ajax({
			url : 'random.js',
			dataType: "json",
			beforeSend : function(){
				$(player.params.button).addClass('loading');
				$(player.params.video)[0].pause();
			},
			success : function(data){
				var source = data[Math.floor(Math.random()*data.length)]
				$(player.params.video).children(0).attr('src',source.src);
				player.params.onrandom.call(this);
				$(player.params.video)[0].load();
				$(player.params.video).on('canplaythrough',function(){
					player.params.onloaded.call(this);
				});
				
				$(player.params.button).removeClass('loading');
			}
		});
		if(e){
			e.preventDefault();
		}
		
	}
} 


player.init({
	video:'#video',
	button:'#button',
	progressBar:'.progress',
	buffer:'.buffer',
	onloaded:function(){
		console.log('loaded');
		player.playPause();
	},
	onplay:function(){
		console.log('playing');  
	},
	onrandom:function(){
		console.log('random'); 
		
	}
});
player.random();
$('#video, #button').on('click',player.playPause);
$('#progressBar').on('click',player.setTime);
$('#random').on('click',player.random);
















