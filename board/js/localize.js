var localize={
	
	defaults : {
		map : '#mapCanvas',
		localized : function(){},
		found : function(){}
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
		if(pos){
			var latLng=new google.maps.LatLng(pos.latitude,pos.longitude);
		}
		else{
			var latLng=new google.maps.LatLng(48.857713,2.347271);
		}
		//var latLng = (typeof pos==='object') ? new google.maps.LatLng(pos.latitude,pos.longitude) : new google.maps.LatLng(48.857713,2.347271);
		var settings = {
			zoom: 17,
			center: latLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		this.map=new google.maps.Map(document.querySelector(this.params.map),settings);
	},
	
	find : function(address){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({"address":address},function(data,status){
			if(status=='OK'){
				var destPos=data[0].geometry.location;
				localize.map.setCenter(destPos);
				var marker = new google.maps.Marker({position: destPos,map: localize.map});
				localize.params.found.call(this,destPos);
			}
			else{
				localize.params.found.call(this,null);
			}
		});
		
	}
	
};















