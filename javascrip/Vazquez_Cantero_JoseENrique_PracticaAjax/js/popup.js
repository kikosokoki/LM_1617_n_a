
//This function will draw the map where the selected bike station is
function drawMap(lat,long,text) {
  var myLatlng = new google.maps.LatLng(lat,long);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: text
  });
}

//This function recover data from the web service

    
function loadData() {
   $.ajax({
       url : "http://datos.santander.es/api/rest/datasets/comercios_actividades.json", 
   })
           .done(function(data) {
                var resources = data.resources;
                console.log(resources);
                for (i=0; i<resources.length;i++) {
                   var text="";
                   var valor = resources[i];
                    
                   text+="<a href='"+resources[i]["uri"]+"'><h4>Nombre del Distrito Comercial:  "+resources[i]["dc:name"]+"</span></br></br>";
                    
//                
                    
                   $("#resultados").append("<li>"+text+"</li></a>");
                   
                //   $("div.estacion:odd").css("background-color", "#DDDDDD");
               }
       
       $("a").click(function(event){
          event.preventDefault();
           $("#detalles").html("");
           $.ajax({
               url : $(this).attr("href"),
           })
           .done(function(data){
               
               var text1, text2, text3, text4, text5, text6, text7, text8;
               
               var text1="<span>Nombre del Distrito Comercial: "+data.resources[0]["dc:name"]+"</span></br></br>";
                    
               var text2="<span>Identificador del comercio: "+data.resources[0]["ayto:IdComercio"]+"<span>"+"</br></br>";                    
               
               var text3="<span>Código de verificación: "+data.resources[0]["ayto:ok"]+"</span>"+"</br></br>";
   
               var text4="<span>Código del ayuntamiento: "+data.resources[0]
                                       ["ayto:codigo"]+"</span>"+"</br></br>";
                    
               var text5="<span>Fecha modificacion: "+data.resources[0]["dc:modified"]+"<span>"+"</br></br>";                    
               var text6="<span>Identificador: "+data.resources[0]["dc:identifier"]+"</span></br></br>";

               var text7="<span>Nombre del comercio: "+data.resources[0]["ayto:nombreComercio"]+"</span></br></br>";
                                       
               var text8="<span>Enlace: "+data.resources[0]["uri"]+"</span></br></br>";
                            
               $("#detalles").append("<li>"+text1+"</li>");
               $("#detalles").append("<li>"+text2+"</li>");
               $("#detalles").append("<li>"+text3+"</li>");
               $("#detalles").append("<li>"+text4+"</li>");
               $("#detalles").append("<li>"+text5+"</li>");
               $("#detalles").append("<li>"+text6+"</li>");
               $("#detalles").append("<li>"+text7+"</li>");
               $("#detalles").append("<li>"+text8+"</li>");
               
               
           })
       });
               
           })
           .fail(function() {
               $("#resultados").append("<h2>Imposible recuperar los datos</h2>");
           });
}




//On Document ready
$(function() {
 
    //Binding click event to future data click() is direct binding and doesn't work here
   
   
   $("#cargar").click(function() {
      $("resultados").empty();
      loadData();
   });
   
   
   
});
