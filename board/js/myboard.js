board.init({
	board : '#board',
	recorded : function(datas){
		this.render(datas);
	}
});

localize.init({
	map : '#map',
	localized : function(pos){
		localize.render(pos);
		$('#map').toggleClass('on');
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
});










