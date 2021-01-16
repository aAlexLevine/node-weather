# Add to Favorites List

Add a new location to previously saved locations.

**URL** : `/api/main/addToFavorites`

**Method** : `POST`

**Data constraints**

Provide name and zip code of city to added.

```json
{
    "name": "New York", 
    "zip": "10001"
}
```

## Success Response

**Condition** : If location has been added without issue.

**Code** : `200 OK`

**Content example**

```json
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 24,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
```

## Error Responses

**Condition** : If zip code is already stored.

**Code** : `200 OK`

**Content example** : 

```json
{
    "code": "ER_DUP_ENTRY",
    "errno": 1062,
    "sqlMessage": "Duplicate entry '10001' for key 'zip'",
    "sqlState": "23000",
    "index": 0,
    "sql": "INSERT INTO favorites (name, zip) VALUES ('New York', '10001' )"
}
```

### Or

**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`
