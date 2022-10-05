# Merchant-REST-API
Simple api allowing for adding, updating and deleting merchants in the area. The api also features distance sorting of merchants based on the input values, as well as simple user authentication and authorisation

# Api overview

DOES NOT REQUIRE AUTH

GET /auth - logs in the user in the list with input, requires body of format {"name": , "password":}
GET /merchants - get full list of merchants in a list
GET /merchants/#ID - get merchant with ID

REQUIRES AUTH (requires header x-auth-token with value from the response of successful GET /auth)

POST /auth - creates new user, requires body of format {"name": , "password":}
GET /merchants/#latitude/#longitude - get a list of merchants in order of how close they are to input coordinates
POST /merchants - add a new merchant to the list, requires body of format {"latitude": , "longitude": , "merchantName": }
PUT/PATCH /merchants/ID - update merchant with new input information or create a new one, requires body of format {"latitude": , "longitude": , "merchantName": }
DELETE /merchants/#ID - deletes merchant with ID
