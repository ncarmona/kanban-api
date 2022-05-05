# KANBAN API

API for kanban-client project.

## Technologies

Before you run kanban-api there are some technolgies needed in order to run the API:

- NodeJS
- MongoDB

## Setup

### environment configuration
Rename ___.env.example___ into ___.env___. Open the file and fill the variable with correct values.

### Private and public keys
For auth purposes this API needs a private and public keys. Both keys must be stored in ___private.key___ and ___public.key___.

You can generate your private and public keys in this website:
https://travistidwell.com/jsencrypt/demo/

___NOTE:___ Ensure your generate key size it is 512 bits.
### Dependencies

Some dependencies are needed for run this project, run the following command inside the root of the project and they will be installed automatically:

````
npm install
````

### Run project in development mode
In development mode the server will autorefresh if you save changes.

Just open the project in your console, go to the project root folder and type this command:

````
npm run dev
````

By default server will be accesible trough this url:
___http://localhost:5000___

### Build the project and upload it to production server
Build mode will generate all .js files. To do that run this command the root folder of the project:

````
npm run build
````
Once the process ended a folder called ___dist___ will appear. Upload the content of the folder to your server.
## Test
This project have two type of test, integration and unit test. You can run those test with the following commands:
### Unit test
````
npm run unit
````

### Integration test
````
npm run e2e
````
__NOTE:__ Some test will fail unless you set the correct environment variables for MongoDB and ENVIRONMENT variable. Use an empty MongoDB database and set ENVIRONMENT to test are a must.