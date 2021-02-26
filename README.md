# REsell API
A web application API which primary function is to serve as a platform for selling and buying used items.

Public API: http://api.scheipe.rs/resell/v1/

Documentation available at: http://api.scheipe.rs/docs/

## Task

You are to implement a web application API which primary function is to serve as a platform for selling and buying used items. An example of this in Finland would be Tori.fi or globally ebay.com.

### Functional requirements for the web application
* User registration and login
* User should be able to create new items to sell – a posting. Posting should contain the following information
  * Title
  * Description
  * Category (clothing, cars etc.)
  * Location (city, county etc.)
  * Images (max 4)
  * Asking price
  * Date of posting
  * Delivery type:
    * Shipping
    * Pickup
  * Seller’s name and contact information
* User should be able to modify his postings
* User should be able to delete his posting
* All users (logged and non-logged) should be able to search and list postings based on
  * Category
  * Location
  * Date of posting

### Other Requirements
1. Design the API and implement the design as OpenAPI specification document.
2. Generate human readable HTML documentation from the Open API specification.
3. Using Node.js and Express Implement REST API
4. Use Mocha to implement tests for all the implemented routes.
5. Store all your work in github as a public repository
6. Host your API and the API documentation in public web server such as AWS

## Requirements

* NodeJS >= 14
* PostgreSQL

## Setup

Install Dependencies

```sh
npm install
```

Create Postgresql user

```
postgres=# CREATE ROLE resell WITH LOGIN PASSWORD 'resell';
postgres=# ALTER ROLE resell CREATEDB SUPERUSER;
```

If the user should not be a superuser create UUID extension on databases

```
resell_dev=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
resell_test=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
resell_prod=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Create an environment file (.env) in project root directory

```
# EXAMPLE VALUES:
DB_HOST=127.0.0.1
DB_USERNAME=resell
DB_PASSWORD=resell
HOST_NAME=localhost
HOST_PORT=8080
IMG_PATH=D:\semester8\web_interfaces\resell-api\resell-images
IMG_PATH_TEST=D:\semester8\web_interfaces\resell-api\resell-images-test
IMG_ROUTE=resell/images
JWT_SECRET=37ECB12E377028A29426C209E0D75BE462F1E88763052DB0D5E920908617D7E3
```

Create and migrate database

```sh
npm run db:create
npm run db:migrate
```

## Usage

Start Server

```sh
npm start
```
