# Get All Favorites

Get all favorite locations that have been previously saved

**URL** : `/api/main/getAllFavoriteZips`

**Method** : `GET`

## Success Response

**Condition** : Success

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 8,
        "name": "New York",
        "zip": "10001"
    },
    {
        "id": 20,
        "name": "East Springfield",
        "zip": "13333"
    },
    {
        "id": 22,
        "name": "Brooklyn",
        "zip": "11222"
    },
    {
        "id": 23,
        "name": "Miami",
        "zip": "33101"
    }
]
```

## Error Responses

**Condition** : Error

**Code** : `404 (Not Found)`

