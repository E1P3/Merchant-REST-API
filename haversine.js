var haversine = (function(){
//Calculates distance in km
    return function haversine(pointA, pointB){

        function toRad(x) {
            return x * Math.PI / 180;
        }

        var R = 6371; //km
        var dLat = toRad(pointB.latitude - pointA.latitude);
        var dLon = toRad(pointB.longitude - pointB.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(pointA.latitude)) * Math.cos(toRad(pointB.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var d = R * c;

        console.log(d)

        return d;
    }
})()

module.exports = haversine;
