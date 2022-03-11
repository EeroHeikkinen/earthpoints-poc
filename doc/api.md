# Earth Points API

OpenAPI specification can be found at: https://epoints.savesoil.cc/api

For UAT environment you can test with: https://uat.epoints.hakanonal.com/api

## Quickstart example for creating point events

The Earth Points API uses the OAuth2 client credentials flow. 

To authenticate,
1) retrieve an access token using a client id and client secret 
2) supply that token in the Bearer authentication header to access restricted endpoints.

### 1. Obtain access token

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
   "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcwMDQ5MjUsImV4cCI6MTY0NzA5MTMyNX0.ZFKNvG5H2nMoDnA-Sx8jF4nSkdIg908fatBJOOl7p-Y",
   "expires_in" : 86400,
   "token_type" : "Bearer"
}
```
## 2. Create point events for user

To create points for user now we can call the [Create Point Event endpoint](https://epoints.savesoil.cc/api/#/default/PointEventController_create) and supply the authentication token in the Authorization header.

```
curl --request POST \                        
  --url https://uat.epoints.hakanonal.com/oauth/token \  
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE2NDcwMDQ5MjUsImV4cCI6MTY0NzA5MTMyNX0.ZFKNvG5H2nMoDnA-Sx8jF4nSkdIg908fatBJOOl7p-Y' \
  --header 'content-type: application/json' --data '{ "hashString": "created-pledge-page-1234567", "email": "my.user@gmail.com", "icon": "star", "verb": "created a", "platform": "pledge-page", "message": "You created a pledge page.", "isBurn": false, "points": 5, "timestamp": "2022-03-11T14:20:20.546Z"}' -k | json_pp
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