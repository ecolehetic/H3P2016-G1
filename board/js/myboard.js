board.init({
	board : '#board',
	recorded : function(datas){
		this.render(datas);
	}
});

localize.init({
	map : '#map div',
	localized : function(pos){
		localize.render(pos);
		$('#map, .loader').toggleClass('on');
	},
	found : function(pos){
		
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
	var datas={title:name,date:newDate};
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

$('.deleteButton').on('click',function(e){ 
	e.preventDefault();
	var key=$(this).data('key');
	board.delete(key);
	$(this).parent('.card').remove();
});










