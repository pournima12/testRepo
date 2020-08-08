var mongoose = require('mongoose');

var auditData = mongoose.model('auditData',{
    "coord": { "lon": Number, "lat": Number },
    "weather": [
      {
        "id": Number,
        "main": String,
        "description": String,
        "icon": String
      }
    ],
    "base": String,
    "main": {
      "temp": Number,
      "feels_like": Number,
      "temp_min": Number,
      "temp_max": Number,
      "pressure": Number,
      "humidity": Number
    },
    "visibility": Number,
    "wind": { "speed": Number, "deg": Number },
    "clouds": { "all": Number },
    "dt": Number,
    "sys": {

    },
    "timezone": Number,
    "id": Number,
    "name": String,
    "cod": Number
},'auditData');

module.exports = auditData;
