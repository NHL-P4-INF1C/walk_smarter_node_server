
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

    async fetchPointOfInterestPicture(pointOfInterestData) {
        try {
            if (pointOfInterestData['status'] != 'OK') {
                return 'Invalid data';
            }
            var requestBuilder = this.apiPicUrl + 'photoreference='
            const response = await axios.get(requestBuilder);
            print(response);
            return response;
        } catch (error) {
            print(error);
        }
    }

}