function initMap() {

    var map;
    var marker;
    var nummer = 10;

    Boef.plaatsEmitter(52.102346, 5.175269);
    Boef.plaatsSensoren(52.101448, 5.175354, nummer);


    var middle = {
        lat: (Boef.emitters()[0].latitude + Boef.rijen()[0][nummer - 1].latitude) / 2,
        lng: (Boef.emitters()[0].longitude + Boef.rijen()[0][nummer - 1].longitude) / 2

    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: middle,
        zoom: 15


    });

    marker = new google.maps.Marker({
        position: {lat:Boef.emitters()[0].latitude, lng: Boef.emitters()[0].longitude},
        map: map


    });

    for (var i = 0; i < nummer; i++) {
        marker = new google.maps.Marker({
            position: {lat:Boef.rijen()[0][i].latitude, lng: Boef.rijen()[0][i].longitude},
            map: map

        });

    }


}