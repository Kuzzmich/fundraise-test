### Fundraise test task
Both frontend and backend apps are hosted by the same koa app. Backend files - server.js,
routes.js, db.js. Frontend - "app" folder.
 
I decided not to use webpack and so on to not overengineer simple task. Vue is got from CDN,
styles and scripts are added to static page in regular browser way.

To start the app follow steps below.

1. Pull the project from git
2. Run `yarn intall`
3. Run `mongoConnectionString='***your mongo connection string***' yarn start` or set `mongoConnectionString` 
env variable and just run `yarn start`. You can ask proper string from the developer =)

That's it! App is running on address http://localhost:3003. 
