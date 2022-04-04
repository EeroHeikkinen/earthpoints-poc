# Earth Points API

OpenAPI specification can be found at: https://epoints.savesoil.cc/api

For UAT environment you can test with: https://uat.epoints.hakanonal.com/api

# Example for creating point events

The Earth Points API uses the OAuth2 client credentials flow. 

To authenticate,
1) retrieve an access token using a client id and client secret 
2) supply that token in the Bearer authentication header to access restricted endpoints.

## 1. Obtain access token

To obtain an access token, use the [/oauth/token endpoint](https://epoints.savesoil.cc/api/#/default/AppController_loginWithClientCredentials)

Live endpoint:
```
https://epoints.savesoil.cc/oauth/token
```

UAT endpoint:
```
https://uat.epoints.hakanonal.com/oauth/token
```

Example:
```
curl -k --request POST \
  --url 'https://uat.epoints.hakanonal.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id=[clientID] \
  --data client_secret=[clientSecret] | json_pp
```

Alternatively you can also supply the credentials in the Authorization header.

```
curl -k --request POST \
  --url 'https://uat.epoints.hakanonal.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --header 'Authorization: Basic [base64 encoding of the string "clientId:clientSecret"]' \
  --data grant_type=client_credentials | json_pp
```

Response:

```
{
   "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcwOTcxNDAsImV4cCI6MTY0NzE4MzU0MH0.UX2M8NNhZ34sY1-Orvgavc0cZF-_brtWlezOk-mlyEc",
   "expires_in" : 86400,
   "token_type" : "Bearer"
}
```

## 2. Obtain userid

To obtain an user id, call the [/user/fromExternalPlatformData](https://uat.epoints.hakanonal.com/api/#/default/UserController_userFromExternalPlatformData) endpoint.

```
curl -X 'POST' \
  'https://uat.epoints.hakanonal.com/user/fromExternalPlatformData' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcwOTcxNDAsImV4cCI6MTY0NzE4MzU0MH0.UX2M8NNhZ34sY1-Orvgavc0cZF-_brtWlezOk-mlyEc' \
  -H 'Content-Type: application/json' \
  -d '{
  "profile_id": "[user id on pledge platform]",
  "platform": "pledge-page",
  "emails": [
    "eesahe@gmail.com"
  ],
  "timezone": "Europe/Istanbul",
  "countryCode": "TR",
}' -k
```

Example response:
```
{
   "connections" : [
      {
         "authExpiration" : null,
         "authToken" : null,
         "emails" : [
            "eesahe@gmail.com"
         ],
         "head" : null,
         "platform" : "pledge-page",
         "profileId" : "[user id on pledge platform]",
         "tail" : null,
         "tokenSecret" : null,
         "userid" : "82b07aae-ca02-40f4-a71f-2c564fc52764",
         "watchedResources" : null
      }
   ],
   "createdAt" : "2022-03-12T15:01:02.222Z",
   "email" : "eesahe@gmail.com",
   "emails" : [
      "eesahe@gmail.com"
   ],
   "events" : [],
   "firstName" : null,
   "points" : 0,
   "timezone": "Europe/Istanbul",
   "countryCode": "TR",
   "userid" : "82b07aae-ca02-40f4-a71f-2c564fc52764"
}
```



## 3. Award points to user

To create points for user now we can call the [Create Point Event endpoint](https://epoints.savesoil.cc/api/#/default/PointEventController_create) and supply the authentication token in the Authorization header.

```
curl --request POST \
  --url https://uat.epoints.hakanonal.com/point-event \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcwOTcxNDAsImV4cCI6MTY0NzE4MzU0MH0.UX2M8NNhZ34sY1-Orvgavc0cZF-_brtWlezOk-mlyEc' \
  --header 'content-type: application/json' --data '{ "hashString": "created-pledge-page-1234567", "userid": "82b07aae-ca02-40f4-a71f-2c564fc52764", "icon": "star", "verb": "created a", "platform": "pledge-page", "message": "You created a pledge page.", "isBurn": false, "points": 5, "timestamp": "2022-03-11T14:20:20.546Z"}' -k | json_pp
```

Example response:

```
{
   "event" : {
      "hash" : "+Bw0a3nhSjq20rfCFACgHbETeNaSM4ccrISMJkwmkV8=",
      "icon" : "star",
      "isBurn" : false,
      "message" : "You created a pledge page.",
      "metadata" : null,
      "platform" : "pledge-page",
      "points" : 5,
      "timestamp" : "2022-03-11T14:20:20.546Z",
      "userid" : "82b07aae-ca02-40f4-a71f-2c564fc52764",
      "verb" : "created a"
   },
   "msg" : "Successfully created point event",
   "userTotalPoints" : 5
}
```

## Alternative to 2 and 3: directly lookup and reward user

Alternatively, you can directly provide the externalPlatformUserData field in the call to the create point event endpoint.
This will lookup or create the appropriate user and reward the points in the same call.

```
curl -X 'POST' \
  'https://uat.epoints.hakanonal.com/point-event' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcyOTA0OTEsImV4cCI6MTY0NzM3Njg5MX0.60un7JLY4AVOc4OlVcX8rnDV-W6gZcks192SmE1mFHg' \
  -H 'Content-Type: application/json' \
  -d '{
  "hashString": "created-pledge-page-1234567",
  "externalPlatformUserData": [
    {
      "profile_id": "123",
      "platform": "pledge-page",
      "emails": [
        "my.user@gmail.com"
      ],
      "timezone": "Europe/Istanbul",
      "countryCode": "TR"
    }
  ],
  "icon": "star",
  "verb": "created a",
  "platform": "pledge-page",
  "message": "You created a pledge page.",
  "isBurn": false,
  "points": 5,
  "timestamp": "2022-03-11T14:20:20.546Z",
  "metadata": {}
}'
```


### Schema for creating point events

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| hashString | string | The hash string is used to make sure each event will only result in points awarded once. It should be unique for each event and user, in such a way the same hashString will predictably get generated if the same event was sent again. For example, it could be the string "created-pledge-page" followed by the user's id in another system. | Yes |
| userid | string | Already existing User UUID in the system. One of this or an email is required. | No |
| email | string | Email to associate the points with. If an user with this email is not found, a new user will be created. One of this or an User UUID is required. | No |
| icon | string | Icon to display in web interface (Font Awesome version 6.0.0) | No |
| verb | string | The verb to display along with the point event in user interfaces. For example: "You connected Facebook" | Yes |
| platform | string | Social platform (twitter, instagram, facebook) or other external platform where the event was awarded from | Yes |
| message | string | Message to display to the user. | Yes |
| isBurn | boolean | For awarding points, set this to false. Set to true if you want to consume points instead of awarding them | Yes |
| points | number | Number of points to award for this event. | Yes |
| timestamp | dateTime | For displaying to the user, the related time when the points were awarded. | Yes |
| metadata | object | Any custom metadata | Yes |
