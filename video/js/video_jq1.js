//Objet
var player={
	
	params : {
		video : '#video',
		buffer : '#buffer',
		progress : '#progress',
		control : '#control',
		button : '#button',
		file : 'random.txt',
		loaded : function(){},
		playing : function(){},
		paused : function(){},
		randomized : function(){}
	},
	
	init : function(options){
		this.property=$.extend(this.params,options);
		this.media=$(this.property.video)[0];
	},
	
	load : function(){
		this.media.load();
		$(this.property.video).on('canplaythrough',function(){
			player.property.loaded.call(this);
		});
	},
	
	play : function(){
		this.media.play();
		if(!this.media.paused){
			this.property.playing.call(this);
		}
	},
	
	pause : function(){},
	
	setTime : function(){},
	
	updateProgress : function(){},
	
	random : function(e){
		e.preventDefault();
		 $.ajax({
		 	url:player.property.file,
		 	dataType:'json',
		 	success:function(data){ 
		 		var source = data[Math.floor(Math.random()*data.length)]; 
		 		$(player.property.video).children(0).attr('src',source.src);
		 		player.load();
		 		player.property.randomized.call(this);
			}
		});
		
		
	}	
}


//Utilisateur
player.init({
	progress : '.progress',
	buffer : '.buffer',
	control : '#progressBar',
	file : 'random.json',
	loaded : function(){
		console.log('loaded'); 
		player.play(); 
	},
	playing : function(){
		console.log('playing');
		$(player.property.video).addClass('play');
		$(player.property.button).removeClass('loading').addClass('off');
	},
	randomized : function(){
		//behaviors
	}
});
player.load();
$('#random').on('click',player.random);
 















