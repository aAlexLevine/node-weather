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

**Content example**

```json
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
```

## Error Responses

**Condition** : If location already removed.

**Code** : `200 OK`
