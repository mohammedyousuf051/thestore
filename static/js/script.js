

var storeget ="http://127.0.0.1:8000/"
var storeuser = localStorage.getItem("username");



var allblogresp,renderdash;
function renderallblogs(){

$("#allblogs").empty();
		$.ajax({
					  url:storeget+"stores/getstores/"+storeuser,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					    allblogresp = res;
					    console.log(allblogresp);
					    for (var k in allblogresp){
					    	renderdash = '';
					    renderdash +='<div class="card" onclick="openstore(this)" stid ="'+k+'">'
						renderdash +=conversiontoimg(allblogresp[k]["image"])
						renderdash +='  <div class="container">'
						renderdash +='    <h4 ><b>'+allblogresp[k]["name"]+'</b></h4><br><br> <div class = "des">'
						renderdash +='    <p>Created by <span>'+allblogresp[k]["creator"]+'<span></p>'
						var date = allblogresp[k]["date"].split(" ");
						renderdash +='    <p>Date '+date[0]+'</p>'
						renderdash +='    <p>'+allblogresp[k]["description"]+'</p>'
						renderdash +='  </div>'
						renderdash +='</div>'
						$("#allblogs").append(renderdash)
					}

					  },
					  error: function(e) {
					    console.log(e);
					  },
					});

}


function openstore(elm){
	localStorage.setItem("storeid",elm.getAttribute("stid"));
	window.location.href="../lists/";
}
function closeform(){
            document.getElementById("addblogcontent").style.display="none"
            }
function conversiontoimg(con){

	var item_image=con;
	var src = "data:image/jpeg;base64,";
	src += item_image;
	var newImage = document.createElement('img');
	newImage.src = src;
	// newImage.width = "100 %";
	// newImage.height = "60";
	console.log(newImage);
	/*document.querySelector('#imageContainer').innerHTML = newImage.outerHTML;*/
	return newImage.outerHTML;

	}

var base;

 function encodeImagetoBase64(element) {


    var file = element.files[0];

    var reader = new FileReader();

    reader.onloadend = function() {

      base=reader.result.split(',')[1];
      console.log(base);

    }

    reader.readAsDataURL(file);

  }

  function encodegaltoBase64(element) {


    var file = element.files[0];

    var reader = new FileReader();

    reader.onloadend = function() {

      base=reader.result.split(',')[1];
      console.log(base);


    }

    reader.readAsDataURL(file);

    setTimeout(function(){ sendphoto();}, 3000);

  }



function create(){
	document.getElementById("addblogcontent").style.display="block";
}

var timeresp = {}
function addtime(){
	var key = $("#days").val()
timeresp[key] = {"From":$("#fr").val(),"To":$("#to").val()}
console.log(timeresp);
$("#display-times").append('<a>'+$("#days").val()+' - From : '+$("#fr").val()+' To : '+$("#to").val()+',</a>')

}


var latlng;
function sendthis(){
		console.log($("#range").val());
		var items = {
			"name": $("#name").val(),
			"description": $("#detail").val(),
			"location": $("#pac-input").val(),
			"center": latlng,
			"time": timeresp,
			"range":$("#range").val().split(","),
			"image": base
		}
		console.log(items);
		$.ajax({
					  url:storeget+"stores/create/"+storeuser,
					  type:"POST",
					  contentType: "application/json",
					  data:JSON.stringify(items),
					  dataType: "json",
					  success: function(){
					    window.location.reload();
					  },
					  error: function(e) {
					    console.log(e);
					  },
					});
	}


var singlestore,storerender,store_id;
function renderstores(){
	store_id = localStorage.getItem("storeid");
	$("#storepage").empty();
	$.ajax({
					  url:storeget+"stores/getstores/"+storeuser,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  				singlestore =res;
					  				storerender='';
					  			storerender +='<div class="item1">'+conversiontoimg(singlestore[store_id]["image"])+'<a><h5>'+singlestore[store_id]["name"]+'</h5></a></div>';
					  			storerender +='<div class="item2"> <h2> About Us </h2> <p>'+singlestore[store_id]["description"]+'</p></div>';
					  			storerender +='<div class="item3"> <h2> Our Product Catogories </h2><div class="showall">';
					  			// var ranges = .split(",");
					  			for(var i in singlestore[store_id]["range"]){
					  				storerender +='<p> <i class="fa fa-tag"></i> '+singlestore[store_id]["range"][i]+'</p>';
					  			}
					  			storerender +='</div></div>'
					  			storerender +='<div class="item4"><h2>Shop Timing</h2><div class="galtab"> <table>';
					  			for(var k in singlestore[store_id]["time"]){
					  				storerender+='<tr><td> <i class="fa fa-calendar-o"></i> '+k+' </td><td> Opens From '+singlestore[store_id]["time"][k]["From"]+'</td><td> To '+singlestore[store_id]["time"][k]["To"]+'</td></tr>'
					  			}
					  			storerender+='</table></div></div>';
					  			storerender +='<div class="item5"><h2>Address </h2><p class="addp"><i class="fa fa-map-marker"></i> '+singlestore[store_id]["location"]+'</p>';
					  			storerender+='<div id="map_store"></div> </div>'
								storerender+='<div class="item6"><h2>Gallery</h2><span><input type="file" onchange="encodegaltoBase64(this)"></span><br><div id="allphotos"></div></div>'
								 // storerender+='';
					  			$("#storepage").append(storerender);
					  			initMap1();getgallery();
							  	}
					  		});
}

function sendphoto(){
		var items = {
			"pic": base
		}
		console.log(items);
		$.ajax({
					  url:storeget+"stores/create_gallery/"+store_id,
					  type:"POST",
					  contentType: "application/json",
					  data:JSON.stringify(items),
					  dataType: "json",
					  success: function(){
					    // window.location.reload();
					    getgallery();
					  },
					  error: function(e) {
					    console.log(e);
					  },
					});
	}
var galresp,galren;
function getgallery(){
	$("#allphotos").empty()
	$.ajax({
					  url:storeget+"stores/get_gallery/"+store_id,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					    // window.location.reload();
					    galresp=res;
					    console.log(galresp);
					    for(var k in galresp){
					    	galren = '';
					    	galren+='<a data-toggle="modal" data-target="#myModal" onclick="bigimg(this)" imgid="'+k+'">'+conversiontoimg(galresp[k]["picture"])+'</a>'
					    	$("#allphotos").append(galren);
					    }
					  },
					  error: function(e) {
					    console.log(e);
					  },
					});

}

var getlatlng;
function initMap1() {
getlatlng = 	singlestore[store_id]["center"].split(",");
  const myLatLng = { lat: parseFloat(getlatlng[0]), lng: parseFloat(getlatlng[1]) };
  const map = new google.maps.Map(document.getElementById("map_store"), {
    zoom: 9,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}


function bigimg(elm){
	$("#singleimg").empty();
	var date = galresp[elm.getAttribute("imgid")]["date"].split(" ");
	document.getElementById("imgtitle").innerHTML = "Created on "+date[0];
	$("#singleimg").append(conversiontoimg(galresp[elm.getAttribute("imgid")]["picture"]));
}

 function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -33.8688, lng: 151.2195 },
          zoom: 13,
        });
        const card = document.getElementById("pac-card");
        const input = document.getElementById("pac-input");
        console.log("dei",input)
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
        const autocomplete = new google.maps.places.Autocomplete(input);
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
        // Set the data fields to return when the user selects a place.
        autocomplete.setFields([
          "address_components",
          "geometry",
          "icon",
          "name",
        ]);
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        const marker = new google.maps.Marker({
          map,
          anchorPoint: new google.maps.Point(0, -29),
        });
        autocomplete.addListener("place_changed", () => {
          infowindow.close();
          marker.setVisible(false);
          const place = autocomplete.getPlace();
          console.log("hey ", place.geometry.location.lat())
          latlng = place.geometry.location.lat()+","+place.geometry.location.lng();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(
              "No details available for input: '" + place.name + "'"
            );
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          let address = "";

          if (place.address_components) {
            address = [
              (place.address_components[0] &&
                place.address_components[0].short_name) ||
                "",
              (place.address_components[1] &&
                place.address_components[1].short_name) ||
                "",
              (place.address_components[2] &&
                place.address_components[2].short_name) ||
                "",
            ].join(" ");
          }
          infowindowContent.children["place-icon"].src = place.icon;
          infowindowContent.children["place-name"].textContent = place.name;
          infowindowContent.children["place-address"].textContent = address;
          infowindow.open(map, marker);
        });

      }





window.onload = renderallblogs(),renderstores();