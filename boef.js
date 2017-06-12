Boef = (function () {
    var emitters = [];
    var sensors = [];
    var rijen = [];

    return {
        plaatsEmitter: function (latitude, longitude) {
            emitters.push({latitude: latitude, longitude: longitude})
        },
        emitters: function () {
            return emitters;
        },
        plaatsSensor: function (latitude, longitude) {
            sensors.push({
                latitude: latitude,
                longitude: longitude,
                pulses: [],
                afstand: function () {
                    var lat1 = latitude/180.0*Math.PI;
                    var lat2 = emitters[0].latitude/180.0*Math.PI;

                    var long1 = longitude/180.0*Math.PI;
                    var long2 = emitters[0].longitude/180.0*Math.PI;
                    var R = 6371000;


                    var a = Math.pow(Math.sin(0.5*(lat2 - lat1)), 2) +
                        Math.cos(lat1)*Math.cos(lat2)*
                        Math.pow(Math.sin(0.5*(long2 - long1)),2);

                    return 2*R* Math.asin(Math.sqrt(a));
                },
                pulse: function(tijd) {
                    this.pulses.push(tijd);
                },
                aantalMeterGrondstof: function() {
                    var snelheidGrondstof = 1493.0;
                    var snelheidNormaal = 4176.0;
                    return (this.pulses[0]-this.afstand()/
                        snelheidNormaal)/(1.0/snelheidGrondstof - 1.0/snelheidNormaal);
                }
            })
        },
		sensors: function () {
            return sensors;
        },
        plaatsSensoren: function (latitude, longitude, number) {
            var rij = [];
            var latitudeE = emitters[0].latitude;
            var longitudeE = emitters[0].longitude;
            for (var i = 1 ; i <= number; i++) {
                lati = latitudeE + i* (latitude-latitudeE);
                longi = longitudeE + i*(longitude-longitudeE);
                this.plaatsSensor(lati, longi);
                rij.push(sensors[sensors.length-1]);
            }

            rijen.push(rij);

        },
        rijen: function() {
            return rijen;
        },

        reset: function() {
            emitters = [];
            sensors = [];
			rijen = [];

        }

    }

})();
