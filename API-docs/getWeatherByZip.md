# Get Weather By Zip Code

Get weather details retrieved from the [openweathermap API](https://openweathermap.org/current) based on submitted zip code.

**URL** : `/api/main/getWeatherByZip?zip={zip code}`

**URL Parameters** : `zip` where zip is a five character zip code

**Method** : `GET`

## Success Response

**Condition** : If zip is validated through openweather

**Code** : `200 OK`

**Content example**

```json
{
   "coord":{
      "lon":-73.9967,
      "lat":40.7484
   },
   "weather":[
      {
         "id":502,
         "main":"Rain",
         "description":"heavy intensity rain",
         "icon":"10n"
      },
      {
         "id":701,
         "main":"Mist",
         "description":"mist",
         "icon":"50n"
      }
   ],
   "base":"stations",
   "main":{
      "temp":43.21,
      "feels_like":35.73,
      "temp_min":41,
      "temp_max":46,
      "pressure":1009,
      "humidity":87
   },
   "visibility":3219,
   "wind":{
      "speed":9.22,
      "deg":50
   },
   "rain":{
      "1h":2.04
   },
   "clouds":{
      "all":90
   },
   "dt":1610767628,
   "sys":{
      "type":1,
      "id":5141,
      "country":"US",
      "sunrise":1610713067,
      "sunset":1610747568
   },
   "timezone":-18000,
   "id":0,
   "name":"New York",
   "cod":200,
   "zip":"10001"
}
```

## Error Responses

**Condition** : If city is not found through the openweathermap API

**Code** : `404 (city not found)`

**Content** : `Not Found`
