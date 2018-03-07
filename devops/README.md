# Devops

This component is a set of tools to ease setting up a new environment, which is a production-like set of resources, used to stage changes before deploying to production. It can also be used to spin up production, altough you would need to restore the database, and this is not handled at this time.

## Commands

If you have [direnv](direnv.net), you can use the following commands anywhere inside the project. If not you need to use relative path, e.g. `../../devops/deploy`. 


* `setup`: Creates a new set of resources for a production like environment, using the following providers : 
	* [Heroku](https://dashboard.heroku.com/login) for hosting the apps, the Postgres database and providing some pluggins.
	* [Aws](https://aws.amazon.com/) for buckets and any other services you desire.

