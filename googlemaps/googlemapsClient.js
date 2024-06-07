
const axios = require('axios');

class googlemapsClient {
    constructor(apiKey) {
        if (!googlemapsClient.instance) {
            this.apiKey = apiKey;
            this.apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
            this.apiPicUrl = 'https://maps.googleapis.com/maps/api/place/photo?';
            googlemapsClient.instance = this;
        }
        return googlemapsClient.instance;
    }

    async generatePointOfInterest(coordinates, sensitivity = 50) {
        try {
            var requestBuilder = this.apiUrl + 'location=' + coordinates + '&radius=' + toString(sensitivity) + '&key=' + this.apiKey;
            const response = await axios.get(requestBuilder);
            print(response);
            return response;
        } catch (error) {
            print(error);
        }
    }

    async fetchPointOfInterestPicture(coordinates,sensitivity = 50, pointOfInterestData) {
        try {
            if (pointOfInterestData['status'] != 'OK') {
                return 'Invalid data';
            }

            var lng, lat = coordinates.split(',');

            pointOfInterestData['results'].forEach(element => {
                const location = element['geometry']['location'];
                const lng2 = location['lng']
                const lat2 = location['lat'];

                if(calculateDistanceInMeters(lng, lat, lng2, lat2) > sensitivity)
                    {

                    }
            });
            var requestBuilder = this.apiPicUrl + 'photoreference='
            const response = await axios.get(requestBuilder);
            print(response);
            return response;
        } catch (error) {
            print(error);
        }
    }

    calculateDistanceInMeters(latitude1, longitude1, latitude2, longitude2) {
        const earthRadius = 6371e3;
        const latitude1Rad = latitude1 * Math.PI / 180;
        const latitude2Rad = latitude2 * Math.PI / 180;
        const deltaLatitude = (latitude2 - latitude1) * Math.PI / 180;
        const deltaLongitude = (longitude2 - longitude1) * Math.PI / 180;

        const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
                  Math.cos(latitude1Rad) * Math.cos(latitude2Rad) *
                  Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;
        return distance;
    }


}