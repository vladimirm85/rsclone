# Ball-bouncer (Arkanoid) game
[RS School RS Clone task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md)

## Front-end part
#### React/ TypeScript/ Redux/ Redux Thunk/ Material UI/ Ant-Design/ React-router-dom/ React-transition-group/ Canvas/ Eslint 
#### [Link to deploy](https://ball-bouncer.herokuapp.com/game)
(wait a bit until the server wakes up)


### To start project locally you need:

1. Fork this repository
2. Checkout to develop branch
3. Navigate to the front folder
4. ```npm i```
5. ```npm run start```
6. you are in business!

## Back-end part
#### NodeJS/ TypeScript/ Express/ MongoDB/ Mongoose/ Bcryptjs/ Joi/ JsonWebToken/ Passport.js/
Swagger
#### [Link to deploy](https://arkanoid-rsclone-be.herokuapp.com)
#### [Swagger documentation for API](hhttps://arkanoid-rsclone-be.herokuapp.com/api-docs)

### To start back-end locally you need:

1. Fork this repository
2. Checkout to develop branch
3. Navigate to the back-end folder
4. ```npm i```
5. Add .env file to root directory
6. Set environment variables
```
MONGO_HOST=<MongoDB host>
// exemple - cluster0.xxxxx.mongodb.net
MONGO_PASSWORD=<Your MongoDB password>
MONGO_USERNAME=<Your MongoDB username>

NODEMAILER_HOST=<Nodemailer host>
// exemple - smtp.beget.com
NODEMAILER_USER=<Nodemailer user>
// exemple - test@test.ru
NODEMAILER_PASS=<Nodemailer password>

JWT_KEY=<JWT key string>

GOOGLE_CLIENT_SECRET=<Client secret from Google API Console>
GOOGLE_CLIENT_ID=<Client ID from Google API Console>

GITHUB_CLIENT_SECRET=<Github client secret>
GITHUB_CLIENT_ID=<Github client id>

FACEBOOK_CLIENT_ID=<Facebook client id>
FACEBOOK_CLIENT_SECRET=<Facebook client secret>
```
7. ```npm run start```
8. you are in business!

#### [Git authentication setup instructions](https://docs.github.com/en/rest/guides/basics-of-authentication)
#### [Google authentication setup instructions](https://developers.google.com/adwords/api/docs/guides/authentication)
#### [Facebook authentication setup instructions](https://developers.facebook.com/docs/)

You can set up just one of them for testing
