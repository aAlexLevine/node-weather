# Remove From Favorites

Remove a previously stored location.

**URL** : `/api/main/removeFromFavorites`

**Method** : `POST`

**Data constraints**

Provide zip code of the location to be removed.

**Data example**

```json
{
    "zip": "10001"
}
```

## Success Response

**Condition** : If location is removed.

**Code** : `200 OK`

**Content** : Returns updated favorites

```json
[
    {
        "id": 22,
        "name": "Brooklyn",
        "zip": "11222"
    },
    {
        "id": 23,
        "name": "Miami",
        "zip": "33101"
    },
    {
        "id": 31,
        "name": "Albany",
        "zip": "12222"
    }
]
```

## Error Responses

**Condition** : If location already removed.

**Code** : `200 OK`
