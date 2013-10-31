var player={};

player.video=$('#video');

player.button=$('#button');

$(player.video)[0].load();


player.playPause = function () {
	$(player.button).removeClass('loading');
	var media=$(player.video).get(0);
	if(media.paused){
		media.play();
		$(player.video).addClass('play');
		$(player.button).addClass('off');
	}
	else{
		media.pause();
		$(player.button).removeClass('off');
	}
}

player.updateProgress = function () {
	var $this=$(this)[0];

	var progressW=$this.currentTime*100/$this.duration;
	$('.progress').width(progressW+'%');
	
	var bufferW=$this.buffered.end(0)*100/$this.duration;
	$('.buffer').width(bufferW+'%');
}

player.setTime = function (e) {
	var $this=$(this);
	var media=$(player.video)[0];
	var offsetX=e.pageX-$this.offset().left;
	media.currentTime=offsetX*media.duration/$this.width();
}


$(player.video)
.on({'canplaythrough':player.playPause,'click':player.playPause})
.bind('timeupdate',player.updateProgress);
$(player.button).on('click',player.playPause);
$('#progressBar').on('click',player.setTime);


