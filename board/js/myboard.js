//applicationCache.update();
// applicationCache.addEventListener("updateready", function(){
// 	applicationCache.swapCache();
// 	console.log('appCache reloaded');
// 	window.location.reload();
// }, false);

var datas={};

board.init({
	board : '#board',
	recorded : function(datas){
		this.render(datas);
	},
	rendered : function(){
		$('input[name]').val('');
		$('#map').removeClass('on');
	}
});

localize.init({
	map : '#map div',
	localized : function(pos){
		datas.userPos={latitude:pos.latitude,longitude:pos.longitude}; 
		localize.render(pos);
		$('#map, .loader').toggleClass('on');
	},
	found : function(pos){
	 datas.destPos={latitude:pos.lat(),longitude:pos.lng()}
	}
})

board.checkout();

$('#addCard').on('submit',function(e){
	e.preventDefault();
	var name=$('input[name=name]').val();
	var date=$('input[name=date]').val();
	if(!name){
		return;
	}
	if(!date){
		var newDate=new Date().getTime();
	}
	else{
		var newDate=new Date(date).getTime();
	}
	//var newDate=!date?new Date().getTime():new Date(date).getTime();
	datas.title=name;
	datas.date=newDate;
	console.log(datas);
	board.record(datas);

});

$('#addLocation').on('click',function(e){
	e.preventDefault();
	localize.getUserLocation();
	$('.loader').toggleClass('on');
});

$('#geocoder').on('submit',function(e){
	e.preventDefault();
	var address=$('input[name=address]').val();
	if(!address){
		return;
	}
	localize.find(address);
});

$('#board').on('click','.deleteButton',function(e){ 
	e.preventDefault();
	var key=$(this).data('key');
	board.delete(key);
	$(this).parent('.card').remove();
});










