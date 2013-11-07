
var localize={
	
	defaults : {
		map : '#mapCanvas',
		localized : function(){}
	},
	
	
	init : function (options) {
		this.params=$.extend(this.defaults,options);
	},
	
	getUserLocation : function(){
		navigator.geolocation.getCurrentPosition(
		function(position){
			var userPos=position.coords;
			localize.params.localized.call(this,userPos);
		},
		function(){
			localize.params.localized.call(this,null);
		},
		{enableHighAccuracy:true}
		);
		
	},
	
	render : function(pos){
		var latLng=new google.maps.LatLng(pos.latitude,pos.longitude);
		var settings = {
			zoom: 17,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		new google.maps.Map(document.querySelector(this.params.map),settings);
	},
	
	
};















